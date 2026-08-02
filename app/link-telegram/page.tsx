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

        <div className="bg-[#0f172a] border border-cyan-500 rounded-2xl p-6 sm:p-8">

  <h2 className="font-mono text-3xl sm:text-5xl font-bold text-cyan-400 text-center break-all tracking-widest">
    {code}
  </h2>

</div>

<div className="mt-8 rounded-2xl border border-cyan-500/20 bg-white/5 p-6 text-left">

  <h3 className="text-xl font-bold text-cyan-400 mb-4">
    📋 How to Verify
  </h3>

  <div className="space-y-4">

    <div>
      <p className="font-semibold text-white">
        ✅ Step 1
      </p>
      <p className="text-gray-400">
        Tap <span className="text-cyan-400 font-semibold">"Verify on Telegram"</span>.
      </p>
    </div>

    <div>
      <p className="font-semibold text-white">
        ✅ Step 2
      </p>
      <p className="text-gray-400">
        The Telegram bot will open automatically.
      </p>
    </div>

    <div>
      <p className="font-semibold text-white">
        ✅ Step 3
      </p>
      <p className="text-gray-400">
        Press <span className="text-cyan-400 font-semibold">Start</span> and your account will be linked instantly.
      </p>
    </div>

    <div>
      <p className="font-semibold text-white">
        ✅ Step 4
      </p>
      <p className="text-gray-400">
        All GUDY features will be unlocked and ready for you to use.
      </p>
    </div>

  </div>

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