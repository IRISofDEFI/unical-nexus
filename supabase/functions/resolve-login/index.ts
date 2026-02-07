import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * Resolve Login Edge Function
 * 
 * Takes an identifier (matric number, staff ID, or email) + password,
 * resolves the identifier to an email, then authenticates via Supabase Auth.
 * 
 * This allows students to log in with their matric number and staff
 * to log in with their staff ID, without exposing the lookup publicly.
 */
serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return new Response(
        JSON.stringify({ error: "Identifier and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Use service role to look up the email from profiles
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    let email = identifier.trim();

    // If it doesn't look like an email, resolve it from profiles
    if (!email.includes("@")) {
      console.log("Resolving identifier to email:", identifier);

      // Try matric number first
      const { data: matricProfile } = await adminClient
        .from("profiles")
        .select("email")
        .eq("matric_number", identifier.trim())
        .maybeSingle();

      if (matricProfile) {
        email = matricProfile.email;
        console.log("Found via matric number");
      } else {
        // Try staff ID
        const { data: staffProfile } = await adminClient
          .from("profiles")
          .select("email")
          .eq("staff_id", identifier.trim())
          .maybeSingle();

        if (staffProfile) {
          email = staffProfile.email;
          console.log("Found via staff ID");
        } else {
          console.log("No profile found for identifier:", identifier);
          return new Response(
            JSON.stringify({ error: "Invalid credentials. Please check your identifier and password." }),
            { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
      }
    }

    // Now sign in with the resolved email
    const anonClient = createClient(supabaseUrl, anonKey);
    const { data: authData, error: authError } = await anonClient.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("Auth error:", authError.message);
      return new Response(
        JSON.stringify({ error: "Invalid credentials. Please check your identifier and password." }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch user role
    const { data: roles } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id);

    console.log("Login successful for:", email, "roles:", roles);

    return new Response(
      JSON.stringify({
        session: authData.session,
        user: authData.user,
        roles: roles?.map((r) => r.role) || [],
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
