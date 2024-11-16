"use client";
import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="relative">
      {/* Eye icon button positioned on the left */}
      {isPasswordField && (
        <button
          type="button"
          className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeIcon className="h-4 w-4 transition-all duration-300" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4 transition-all duration-300" aria-hidden="true" />
          )}
        </button>
      )}
      <input
        type={isPasswordField && showPassword ? "text" : type}
        className={cn(
          "transition-all duration-300 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />

      {/* Hide browser's default password toggles */}
      <style>{`
  
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  );
});
Input.displayName = "Input";

export { Input };
