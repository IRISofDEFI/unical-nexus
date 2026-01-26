import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";

/**
 * LoginForm Component
 * Portal login form with email/matric/JAMB input
 * Features: Password visibility toggle, remember me, forgot password
 */

interface LoginFormProps {
  onSubmit?: (data: { identifier: string; password: string; remember: boolean }) => void;
  userType?: "student" | "staff";
}

const LoginForm = ({ onSubmit, userType = "student" }: LoginFormProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ identifier, password, remember });
  };

  const placeholderText = userType === "student" 
    ? "Matric No. / JAMB Reg. No. / Email"
    : "Staff ID / Email Address";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Identifier Input */}
      <div>
        <label 
          htmlFor="identifier" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          {userType === "student" ? "Student Identifier" : "Staff Identifier"}
        </label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder={placeholderText}
          className="input-academic"
          required
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
        className="w-full btn-secondary flex items-center justify-center gap-2"
      >
        <LogIn size={20} />
        <span>Login to Portal</span>
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
