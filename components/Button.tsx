"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        px-6
        py-3
        rounded-xl
        bg-cyan-500
        hover:bg-cyan-400
        active:scale-95
        transition-all
        duration-200
        font-semibold
        text-white
        shadow-lg
        shadow-cyan-500/30
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}