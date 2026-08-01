"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 font-medium mb-6">
            🚀 #1 Telegram Management Platform
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-white">
            Power Your
            <span className="block text-cyan-400">
              Telegram Experience
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            GUDY helps you manage Telegram groups, channels,
            communities and automation from one powerful dashboard.
            Secure, fast and built for creators.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <Link href="/register">
              <Button>
                🚀 Get Started
              </Button>
            </Link>

            <Link href="/login">
              <Button className="bg-transparent border border-cyan-500 hover:bg-cyan-500/20">
                🔑 Login
              </Button>
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-14">

            <div>
              <h3 className="text-cyan-400 font-bold text-lg">
                ⚡ Fast
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Lightning-fast Telegram management tools.
              </p>
            </div>

            <div>
              <h3 className="text-cyan-400 font-bold text-lg">
                🔒 Secure
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Powered by Supabase authentication.
              </p>
            </div>

            <div>
              <h3 className="text-cyan-400 font-bold text-lg">
                📈 Analytics
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Monitor your communities with ease.
              </p>
            </div>

            <div>
              <h3 className="text-cyan-400 font-bold text-lg">
                🤖 Automation
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Connect your Phoenix Telegram bot in seconds.
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex justify-center">

          <Image
            src="/hero.png"
            alt="GUDY Hero"
            width={700}
            height={700}
            priority
            className="drop-shadow-[0_0_60px_rgba(34,211,238,0.4)]"
          />

        </div>

      </div>

    </section>
  );
}