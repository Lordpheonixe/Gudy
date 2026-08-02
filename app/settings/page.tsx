"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Settings,
  Mail,
  Bot,
  Bell,
  Moon,
  Lock,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Profile = {
  email: string | null;
  telegram_id: number | null;
};

export default function SettingsPage() {
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
  .select("email, telegram_id")
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
      <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
    </main>
  );
}

if (!user) {
  return null;
}

return (
  <main className="min-h-screen bg-[#050816] text-white px-6 py-10">

    <div className="max-w-4xl mx-auto">

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>

      <div className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-8">

        <div className="text-center">

          <Settings
            size={70}
            className="mx-auto text-cyan-400"
          />

          <h1 className="text-4xl font-black mt-5">
            Settings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your GUDY account preferences
          </p>

        </div>

        <div className="grid gap-5 mt-10">

          {/* Email */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center gap-4">

            <Mail className="text-cyan-400" size={28} />

            <div>

              <p className="text-gray-400 text-sm">
                Email
              </p>

              <h2 className="font-bold">
                {user.email
  ? "✅ Verified"
  : "❌ No Email"}
              </h2>

            </div>

          </div>

          {/* Telegram */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center gap-4">

            <Bot className="text-cyan-400" size={28} />

            <div>

              <p className="text-gray-400 text-sm">
                Telegram
              </p>

              <h2 className="font-bold">
                {user.telegram_id
  ? "✅ Linked"
  : "❌ Not Linked"}
              </h2>

            </div>

          </div>

          {/* Notifications */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center gap-4">

            <Bell className="text-cyan-400" size={28} />

            <div>

              <p className="text-gray-400 text-sm">
                Notifications
              </p>

              <h2 className="font-bold text-green-400">
                Enabled
              </h2>

            </div>

          </div>

          {/* Theme */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center gap-4">

            <Moon className="text-cyan-400" size={28} />

            <div>

              <p className="text-gray-400 text-sm">
                Theme
              </p>

              <h2 className="font-bold">
                Dark Mode
              </h2>

            </div>

          </div>

          {/* Password */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center gap-4">

            <Lock className="text-cyan-400" size={28} />

            <div>

              <p className="text-gray-400 text-sm">
                Password
              </p>

              <h2 className="font-bold text-yellow-400">
                Coming Soon
              </h2>

            </div>

          </div>

          <button
            onClick={logout}
            className="mt-5 rounded-2xl bg-red-500 hover:bg-red-600 transition-all duration-300 p-4 font-bold flex items-center justify-center gap-3"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </div>

    </div>

  </main>
);
}