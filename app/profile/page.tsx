"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Mail,
  Bot,
  Calendar,
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

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState<Profile | null>(null);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

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
    setFullName(data.full_name || "");
    setUsername(data.username || "");
    setAvatarUrl(data.avatar_url || "");

    setLoading(false);
  }

  async function saveProfile() {
    if (!user) return;

    setSaving(true);

    const { error } = await supabase
      .from("users")
      .update({
        full_name: fullName,
        username,
        avatar_url: avatarUrl,
      })
      .eq("id", user.id);

    if (!error) {
      await loadUser();
      alert("✅ Profile updated successfully!");
    }

    setSaving(false);
  }
if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050816]">
      <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
    </main>
  );
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

        <div className="flex flex-col items-center">

          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={120}
              height={120}
              className="rounded-full border-4 border-cyan-400 object-cover"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-5xl font-black">
              {(fullName || "U").charAt(0).toUpperCase()}
            </div>
          )}

          <h1 className="text-4xl font-black mt-6">
            Profile
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your account information
          </p>

        </div>

        <div className="grid gap-6 mt-10">

          {/* Full Name */}

          <div>

            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 outline-none focus:border-cyan-400"
            />

          </div>

          {/* Username */}

          <div>

            <label className="block mb-2 font-semibold">
              Username
            </label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 outline-none focus:border-cyan-400"
            />

          </div>

          {/* Avatar */}

          <div>

            <label className="block mb-2 font-semibold">
              Avatar URL
            </label>

            <input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 outline-none focus:border-cyan-400"
            />

          </div>

          {/* Email */}

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10">

            <div className="flex items-center gap-3">

              <Mail className="text-cyan-400" />

              <div>

                <p className="text-gray-400 text-sm">
                  Email
                </p>

                <p className="font-bold">
                  {user?.email || "No email"}
                </p>

              </div>

            </div>

          </div>

          {/* Telegram */}

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10">

            <div className="flex items-center gap-3">

              <Bot className="text-cyan-400" />

              <div>

                <p className="text-gray-400 text-sm">
                  Telegram
                </p>

                <p className="font-bold">
                  {user?.telegram_id
                    ? "✅ Linked"
                    : "❌ Not Linked"}
                </p>

              </div>

            </div>

          </div>

          {/* Joined */}

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10">

            <div className="flex items-center gap-3">

              <Calendar className="text-cyan-400" />

              <div>

                <p className="text-gray-400 text-sm">
                  Joined
                </p>

                <p className="font-bold">
                  {user
  ? new Date(user.created_at).toLocaleDateString()
  : "-"}
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="mt-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 p-4 font-bold flex items-center justify-center gap-3"
          >
            <Save size={20} />

            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>

  </main>
);
}