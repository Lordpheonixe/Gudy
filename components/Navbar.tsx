"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-cyan-400"
      : "text-gray-300 hover:text-white";

  return (
    <nav className="w-full border-b border-slate-800 bg-[#050816]/90 backdrop-blur-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="GUDY Logo"
            width={42}
            height={42}
            priority
          />

          <span className="text-2xl font-bold text-white">
            GUDY
          </span>

        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link href="/" className={isActive("/")}>
            Home
          </Link>

          <Link
            href="/dashboard"
            className={isActive("/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            href="/link-telegram"
            className={isActive("/link-telegram")}
          >
            Link Telegram
          </Link>

          <Link
            href="/login"
            className={isActive("/login")}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={isActive("/register")}
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}