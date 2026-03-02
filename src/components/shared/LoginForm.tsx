import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * LoginForm – Frontend-only mock login.
 * Any email + password succeeds. No API calls.
 */

interface LoginFormProps {
  onSuccess?: (role: string) => void;
  userType?: "student" | "staff" | "admin";
}

const LoginForm = ({ onSuccess, userType = "student" }: LoginFormProps) => {
  const { signIn, signOut } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const role = userType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await signIn(identifier.trim(), password, role as any);

      if (user.role !== role) {
        signOut();
        throw new Error(`Access restricted: You cannot log in to the ${userType} portal with ${user.role} credentials.`);
      }

      onSuccess?.(user.role);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const placeholderText =
    userType === "student"
      ? "Matric No. / JAMB Reg. No. / Email"
      : "Staff ID / Email Address";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="identifier" className="block text-sm font-medium text-foreground mb-2">
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

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary/20"
          />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>
        <Link to="/forgot-password" className="text-sm text-secondary hover:underline">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {userType === "student" && (
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">New or returning student?</p>
          <Link to="/register" className="text-secondary font-medium hover:underline">
            Register / Continue Registration
          </Link>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
