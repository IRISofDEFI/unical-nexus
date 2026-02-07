import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * Seed Demo Users Edge Function
 * 
 * Creates demo student and staff accounts for presentation purposes.
 * Uses Supabase Admin API to create users with known passwords.
 * 
 * Demo Credentials:
 * 
 * STUDENT:
 *   Email: student@unical.demo
 *   Matric No: 22/071145217
 *   Password: Demo@1234
 * 
 * STAFF:
 *   Email: staff@unical.demo
 *   Staff ID: STF/2015/001234
 *   Password: Staff@1234
 * 
 * ADMIN:
 *   Email: admin@unical.demo
 *   Password: Admin@1234
 */
serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    const results: string[] = [];

    // Demo users to seed
    const demoUsers = [
      {
        email: "student@unical.demo",
        password: "Demo@1234",
        role: "student" as const,
        profile: {
          display_name: "Ms Ubi Blessing George",
          matric_number: "22/071145217",
          department: "Computer Science",
          faculty: "Faculty of Science",
          level: "300 Level",
          phone: "07030641052",
        },
      },
      {
        email: "staff@unical.demo",
        password: "Staff@1234",
        role: "staff" as const,
        profile: {
          display_name: "Dr. Amaka Okonkwo",
          staff_id: "STF/2015/001234",
          department: "Computer Science",
          faculty: "Faculty of Science",
          phone: "08012345679",
        },
      },
      {
        email: "admin@unical.demo",
        password: "Admin@1234",
        role: "admin" as const,
        profile: {
          display_name: "System Administrator",
          staff_id: "ADM/2010/000001",
          department: "ICT Directorate",
          faculty: "Administration",
        },
      },
    ];

    for (const demoUser of demoUsers) {
      // Check if user already exists
      const { data: existingUsers } = await adminClient.auth.admin.listUsers();
      const existing = existingUsers?.users?.find(
        (u) => u.email === demoUser.email
      );

      let userId: string;

      if (existing) {
        userId = existing.id;
        results.push(`${demoUser.role}: already exists (${demoUser.email})`);
      } else {
        // Create auth user
        const { data: newUser, error: createError } =
          await adminClient.auth.admin.createUser({
            email: demoUser.email,
            password: demoUser.password,
            email_confirm: true,
          });

        if (createError) {
          results.push(`${demoUser.role}: FAILED - ${createError.message}`);
          continue;
        }

        userId = newUser.user.id;
        results.push(`${demoUser.role}: created (${demoUser.email})`);
      }

      // Upsert profile (use service role which bypasses RLS)
      const { error: profileError } = await adminClient
        .from("profiles")
        .upsert(
          {
            user_id: userId,
            email: demoUser.email,
            display_name: demoUser.profile.display_name,
            matric_number: demoUser.profile.matric_number || null,
            staff_id: demoUser.profile.staff_id || null,
            department: demoUser.profile.department || null,
            faculty: demoUser.profile.faculty || null,
            level: demoUser.profile.level || null,
            phone: demoUser.profile.phone || null,
          },
          { onConflict: "user_id" }
        );

      if (profileError) {
        results.push(`  profile: FAILED - ${profileError.message}`);
      }

      // Upsert role
      const { error: roleError } = await adminClient
        .from("user_roles")
        .upsert(
          { user_id: userId, role: demoUser.role },
          { onConflict: "user_id,role" }
        );

      if (roleError) {
        results.push(`  role: FAILED - ${roleError.message}`);
      }
    }

    console.log("Seed results:", results);

    return new Response(
      JSON.stringify({
        message: "Demo users seeded successfully",
        results,
        credentials: {
          student: {
            email: "student@unical.demo",
            matric_number: "22/071145217",
            password: "Demo@1234",
          },
          staff: {
            email: "staff@unical.demo",
            staff_id: "STF/2015/001234",
            password: "Staff@1234",
          },
          admin: {
            email: "admin@unical.demo",
            password: "Admin@1234",
          },
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err) {
    console.error("Seed error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to seed demo users" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
