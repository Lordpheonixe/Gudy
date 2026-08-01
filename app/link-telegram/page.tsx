"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LinkTelegramPage() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createCode();
  }, []);

  async function createCode() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const randomCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

    const { error: deleteError } = await supabase
      .from("link_codes")
      .delete()
      .eq("user_id", user.id);

    if (deleteError) {
      console.error(deleteError);
    }

    const { error: insertError } = await supabase
      .from("link_codes")
      .insert({
        user_id: user.id,
        code: randomCode,
      });

    if (insertError) {
      console.error(insertError);
      alert("Failed to generate verification code.");
      setLoading(false);
      return;
    }

    setCode(randomCode);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#050816]">
        <h1 className="text-2xl font-bold text-white">
          Generating verification code...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050816] px-6">

      <div className="card max-w-lg w-full p-8 text-center">

        <h1 className="text-4xl font-bold mb-4">
          🤖 Link Telegram
        </h1>

        <p className="text-gray-400 mb-8">
          Tap the button below to verify your Telegram account.
        </p>

        <div className="bg-[#0f172a] border border-cyan-500 rounded-2xl p-8">

          <h2 className="text-5xl font-extrabold tracking-[0.3em] text-cyan-400">
            {code}
          </h2>

        </div>

        <div className="flex flex-col gap-4 mt-8">

          <a
            href={`https://t.me/Mr_phoenixe_aibot?start=verify_${code}`}
            className="primary-btn text-center"
          >
            🤖 Verify on Telegram
          </a>

          <button
            onClick={createCode}
            className="px-6 py-3 rounded-xl border border-cyan-500 text-white hover:bg-cyan-500/20 transition"
          >
            🔄 Generate New Code
          </button>

        </div>

        <p className="text-gray-500 mt-6 text-sm">
          This verification code can only be used once.
        </p>

      </div>

    </main>
  );
}