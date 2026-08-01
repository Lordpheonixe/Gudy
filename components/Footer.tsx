"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#050816]">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>

            <div className="flex items-center gap-3">

              <Image
                src="/logo.png"
                alt="GUDY Logo"
                width={42}
                height={42}
              />

              <h2 className="text-2xl font-bold text-white">
                GUDY
              </h2>

            </div>

            <p className="mt-4 text-gray-400 leading-7">
              The modern platform for managing Telegram bots,
              groups and communities with speed, security and
              simplicity.
            </p>

          </div>

          {/* Navigation */}
          <div>

            <h3 className="text-white font-semibold mb-4">
              Navigation
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/link-telegram"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  Link Telegram
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  Register
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-white font-semibold mb-4">
              Community
            </h3>

            <div className="space-y-3">

              <a
                href="https://t.me/phoenixmd4"
                target="_blank"
                className="block text-gray-400 hover:text-cyan-400"
              >
                📢 Telegram Channel
              </a>

              <a
                href="https://t.me/Mr_phoenixe_aibot"
                target="_blank"
                className="block text-gray-400 hover:text-cyan-400"
              >
                🤖 Telegram Bot
              </a>

              <a
                href="https://t.me/owner_of_pheonix_teach"
                target="_blank"
                className="block text-gray-400 hover:text-cyan-400"
              >
                💬 Support
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GUDY. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}