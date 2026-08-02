"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  Calendar,
  Bot,
  Settings,
  LogOut,
  ArrowRight,
  Bell,
  LayoutDashboard,
  Rocket,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  telegram_id: number | null;
  email: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (error || !data) {
      router.push("/login");
      return;
    }

    setUser(data);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#050816]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto"></div>

          <p className="mt-5 text-gray-400">
            Loading Dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">
      
{/* ================= NAVBAR ================= */}

<nav className="sticky top-6 z-50 mb-8 rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl px-6 py-4 shadow-[0_0_40px_rgba(6,182,212,.12)]">

  <div className="flex items-center justify-between">

    {/* Left */}

    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">

        <Rocket size={24} />

      </div>

      <div>

        <h1 className="text-xl font-black">
          GUDY
        </h1>

        <p className="text-sm text-gray-400 flex items-center gap-2">

          <LayoutDashboard size={15} />

          Dashboard

        </p>

      </div>

    </div>

    {/* Right */}

    <div className="flex items-center gap-5">

      <button
  className="rounded-xl bg-white/5 p-3 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
>
  <Bell size={20} />
</button>

      <div className="flex items-center gap-3">

        {user?.avatar_url ? (

          <Image
            src={user.avatar_url}
            alt="Avatar"
            width={44}
            height={44}
            className="rounded-full border border-cyan-400"
          />

        ) : (

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">

            {(user?.full_name || "U").charAt(0).toUpperCase()}

          </div>

        )}

        <div className="hidden sm:block">

          <p className="font-semibold">

            {user?.full_name?.split(" ")[0] || "User"}

          </p>

          <p className="text-xs text-gray-400">

            {user?.email || "No email"}

          </p>

        </div>

      </div>

      <button
        onClick={logout}
        className="rounded-xl bg-red-500 px-5 py-3 font-semibold transition-all duration-300 hover:bg-red-600 hover:-translate-y-1"
      >

        Logout

      </button>

    </div>

  </div>

</nav>

        <div className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(6,182,212,.15)]">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h1 className="text-5xl font-black">
                Welcome back 👋
              </h1>

              <p className="text-cyan-400 text-2xl mt-2">
                {user?.full_name || "User"}
              </p>

              <p className="text-gray-400 mt-4 max-w-xl">
                Manage your GUDY account, connect Telegram,
                update your profile and access all platform
                features from one beautiful dashboard.
              </p>

            </div>

<Image
  src="/dashboard.png"
  alt="Dashboard"
  width={420}
  height={420}
  priority
  className="w-full max-w-[420px] h-auto drop-shadow-[0_0_40px_rgba(6,182,212,.4)]"
/>

          </div>
        </div>
        {/* Info Cards */}

        <div className="grid lg:grid-cols-2 gap-6 mt-10">

{/* ================= PROFILE CARD ================= */}

<div className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(6,182,212,.12)] transition-all duration-300 hover:-translate-y-1">

  <div className="flex flex-col items-center text-center">

    {user?.avatar_url ? (

      <Image
        src={user.avatar_url}
        alt="Avatar"
        width={110}
        height={110}
        className="rounded-full border-4 border-cyan-400 object-cover"
      />

    ) : (

      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-5xl font-black shadow-lg">

        {(user?.full_name || "U")
          .charAt(0)
          .toUpperCase()}

      </div>

    )}

    <h2 className="mt-6 text-3xl font-black">

      {user?.full_name || "Unknown User"}

    </h2>

    <p className="mt-2 text-cyan-400 text-lg">

      {user?.username
  ? `@${user.username}`
  : "No username"}

    </p>

    <p className="mt-2 text-gray-400 break-all">

      {user?.email || "No email"}

    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-3">

      <span className="rounded-full bg-green-500/20 border border-green-500/30 px-4 py-2 text-sm font-semibold text-green-400">

        🟢 Active

      </span>

      <span className="rounded-full bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 text-sm font-semibold text-cyan-400">

        {user?.telegram_id
          ? "🤖 Telegram Linked"
          : "⚪ Telegram Not Linked"}

      </span>

      <span className="rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300">

        📅 {user
          ? new Date(user.created_at).toLocaleDateString()
          : "-"}

      </span>

    </div>

  </div>

</div>

{/* ================= STATUS ================= */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

  {/* Telegram */}

  <div className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1">

    <div className="flex items-center gap-4">

      <Bot className="text-cyan-400" size={30} />

      <div>

        <p className="text-gray-400 text-sm">
          Telegram
        </p>

        <h2 className="text-xl font-bold">
          {user?.telegram_id
            ? "✅ Linked"
            : "❌ Not Linked"}
        </h2>

      </div>

    </div>

  </div>

  {/* Joined */}

  <div className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1">

    <div className="flex items-center gap-4">

      <Calendar className="text-cyan-400" size={30} />

      <div>

        <p className="text-gray-400 text-sm">
          Joined
        </p>

        <h2 className="text-xl font-bold">
          {user
            ? new Date(user.created_at).toLocaleDateString()
            : "-"}
        </h2>

      </div>

    </div>

  </div>

  {/* Email */}

  <div className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1">

    <div className="flex items-center gap-4">

      <Mail className="text-cyan-400" size={30} />

      <div>

        <p className="text-gray-400 text-sm">
          Email
        </p>

        <h2 className="text-xl font-bold">
  {user?.email ? (
    <span className="text-green-400">✅ Verified</span>
  ) : (
    <span className="text-red-400">❌ No Email</span>
  )}
</h2>

      </div>

    </div>

  </div>

  {/* Username */}

  <div className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1">

    <div className="flex items-center gap-4">

      <User className="text-cyan-400" size={30} />

      <div>

        <p className="text-gray-400 text-sm">
          Username
        </p>

        <h2 className="text-xl font-bold">
          {user?.username
            ? `@${user.username}`
            : "No username"}
        </h2>

      </div>

    </div>

  </div>

</div>

        </div>

       <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            🚀 Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            <Link
              href="/link-telegram"
              className="rounded-3xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 hover:-translate-y-1 p-6 text-center font-bold"
            >
              🤖 Link Telegram
              <ArrowRight
                className="mx-auto mt-4"
                size={24}
              />
            </Link>

            <Link
              href="/profile"
              className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 p-6 text-center font-bold"
            >
              👤 Profile
            </Link>

            <Link
              href="/settings"
              className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 p-6 text-center font-bold"
            >
              <Settings
                className="mx-auto mb-3"
                size={24}
              />

              Settings
            </Link>

                        <button
              onClick={logout}
              className="rounded-3xl bg-red-500 hover:bg-red-600 transition-all duration-300 hover:-translate-y-1 p-6 font-bold"
            >
              <LogOut
                className="mx-auto mb-3"
                size={24}
              />

              Logout
            </button>

          </div> {/* End Quick Actions Grid */}

        </div> {/* End Quick Actions */}

      </div> {/* End max-w-7xl */}

    </main>

  );
}