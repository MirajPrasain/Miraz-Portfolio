"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export function LiquidGlassButton({
  children,
  className,
  variant = "dark",
  showThemeToggle = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "dark" | "light";
  showThemeToggle?: boolean;
}) {
  const [currentVariant, setCurrentVariant] = useState(variant);

  const toggleTheme = () => {
    setCurrentVariant(prev => prev === "dark" ? "light" : "dark");
  };
  return (
    <div className="relative inline-flex items-center gap-2">
      <button
        className={cn(
          "relative group inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium overflow-hidden",
          "backdrop-blur-2xl transition-all duration-300",
          // Dark mode (default)
          currentVariant === "dark" && [
            "bg-white/30 border border-white/80",
            "shadow-lg hover:shadow-[0_0_48px_rgba(255,255,255,0.6)]"
          ],
          // Light mode
          currentVariant === "light" && [
            "bg-black/30 border border-black/80",
            "shadow-lg hover:shadow-[0_0_48px_rgba(0,0,0,0.6)]"
          ],
          className
        )}
        {...props}
      >
        {/* Edge highlight */}
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300",
          currentVariant === "dark" 
            ? "bg-gradient-to-tr from-white/60 via-white/20 to-transparent"
            : "bg-gradient-to-tr from-black/60 via-black/20 to-transparent"
        )}></div>

        {/* Liquid glass center gradient */}
        <div className={cn(
          "absolute inset-1 rounded-lg opacity-60 group-hover:opacity-85 transition-opacity duration-300",
          currentVariant === "dark"
            ? "bg-gradient-to-br from-white/80 via-white/40 to-white/10"
            : "bg-gradient-to-br from-black/80 via-black/40 to-black/10"
        )}></div>

        {/* Inner glow */}
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-70 group-hover:opacity-90 transition-opacity duration-300",
          currentVariant === "dark"
            ? "bg-gradient-to-b from-white/30 via-white/10 to-transparent"
            : "bg-gradient-to-b from-black/30 via-black/10 to-transparent"
        )}></div>

        {/* Label */}
        <span className={cn(
          "relative z-10 font-semibold",
          currentVariant === "dark"
            ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            : "text-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]"
        )}>
          {children}
        </span>
      </button>

      {/* Theme Toggle Switch */}
      {showThemeToggle && (
        <button
          onClick={toggleTheme}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-xl transition-all duration-300",
            currentVariant === "dark"
              ? "bg-white/10 border border-white/20 hover:bg-white/20 text-white"
              : "bg-black/10 border border-black/20 hover:bg-black/20 text-black"
          )}
          title={`Switch to ${currentVariant === "dark" ? "light" : "dark"} mode`}
        >
          {currentVariant === "dark" ? (
            // Sun icon for switching to light mode
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            // Moon icon for switching to dark mode
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
