import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * LoginForm Component
 * 
 * Real authentication form that connects to Lovable Cloud.
 * 
 * How authentication works:
 * 1. User enters their identifier (matric no, staff ID, or email) + password
 * 2. The form calls the `resolve-login` edge function
 * 3. The edge function resolves non-email identifiers to emails using the profiles table
 * 4. It then authenticates via the auth system and returns a session
 * 5. The session is set in the client, triggering the AuthContext to update
 * 6. The login page detects the auth state change and redirects to the dashboard
 * 
 * Credentials are stored in the auth system with bcrypt-hashed passwords.
 * Profile data (matric_number, staff_id, etc.) is in the profiles table.
 * Roles are stored separately in the user_roles table.
 */

interface LoginFormProps {
  onSuccess?: () => void;
  userType?: "student" | "staff";
}

const LoginForm = ({ onSuccess, userType = "student" }: LoginFormProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call the resolve-login edge function
      const { data, error: fnError } = await supabase.functions.invoke("resolve-login", {
        body: { identifier: identifier.trim(), password },
      });

      if (fnError) {
        throw new Error(fnError.message || "Login failed");
      }

      if (data?.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        // Set the session in the Supabase client
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        onSuccess?.();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      // Try to parse error body from edge function
      if (err?.context?.body) {
        try {
          const body = JSON.parse(new TextDecoder().decode(
            await new Response(err.context.body).arrayBuffer()
          ));
          setError(body.error || "Login failed. Please try again.");
        } catch {
          setError("Login failed. Please try again.");
        }
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const placeholderText = userType === "student" 
    ? "Matric No. / JAMB Reg. No. / Email"
    : "Staff ID / Email Address";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive 
                        rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {/* Identifier Input */}
      <div>
        <label 
          htmlFor="identifier" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          {userType === "student" ? "Student Matric" : "Staff ID"}
        </label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder={placeholderText}
          className="input-academic"
          required
          disabled={isLoading}
        />
      </div>

      {/* Password Input */}
      <div>
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input-academic pr-12"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground 
                       hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 rounded border-border text-secondary 
                       focus:ring-secondary/20"
          />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>
        <Link 
          to="/forgot-password" 
          className="text-sm text-secondary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-secondary flex items-center justify-center gap-2 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <LogIn size={20} />
            <span>Login to Portal</span>
          </>
        )}
      </button>

      {/* Register Link (for students) */}
      {userType === "student" && (
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            New or returning student?
          </p>
          <Link 
            to="/register" 
            className="text-secondary font-medium hover:underline"
          >
            Register / Continue Registration
          </Link>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
