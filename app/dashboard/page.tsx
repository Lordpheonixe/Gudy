"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

async function loadUser() {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    router.push("/login");
    return;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    router.push("/login");
    return;
  }

  setUser(profile);
  setLoading(false);

}

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-white">
          Loading Dashboard...
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Left */}

        <div>

          <h1 className="text-5xl font-bold text-white">
            Welcome Back 👋
          </h1>

<div className="mt-6 space-y-3">

  <p className="text-gray-300">
    👤 <strong>Name:</strong> {user.full_name}
  </p>

  <p className="text-gray-300">
    📧 <strong>Email:</strong> {user.email}
  </p>

  <p className="text-gray-300">
    🤖 <strong>Telegram:</strong>{" "}
    {user.telegram_id ? "✅ Linked" : "❌ Not Linked"}
  </p>

  <p className="text-gray-300">
    📅 <strong>Joined:</strong>{" "}
    {new Date(user.created_at).toLocaleDateString()}
  </p>

</div>

          <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="card p-6">
              <h2 className="text-cyan-400 text-lg font-bold">
                Telegram
              </h2>

              <p className="text-gray-300 mt-2">
                Connect your Telegram account.
              </p>

              <Link
                href="/link-telegram"
                className="inline-block mt-5 text-cyan-400"
              >
                Link →
              </Link>
            </div>

            <div className="card p-6">
              <h2 className="text-cyan-400 text-lg font-bold">
                Premium
              </h2>

              <p className="text-gray-300 mt-2">
                Coming Soon
              </p>
            </div>

            <div className="card p-6">
              <h2 className="text-cyan-400 text-lg font-bold">
                Statistics
              </h2>

              <p className="text-gray-300 mt-2">
                Coming Soon
              </p>
            </div>

            <div className="card p-6">
              <h2 className="text-cyan-400 text-lg font-bold">
                Settings
              </h2>

              <p className="text-gray-300 mt-2">
                Coming Soon
              </p>
            </div>

          </div>

          <button
            onClick={logout}
            className="primary-btn mt-10"
          >
            Logout
          </button>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <Image
            src="/dashboard.png"
            alt="Dashboard"
            width={700}
            height={700}
            priority
          />

        </div>

      </div>

    </main>
  );
}