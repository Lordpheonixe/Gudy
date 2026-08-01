"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError) throw authError;

      if (data.user) {
        const { error: dbError } =
          await supabase
            .from("users")
            .insert({
              id: data.user.id,
              email,
              username,
              full_name: fullName,
            });

        if (dbError) throw dbError;

        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="card w-full max-w-md p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account 🚀
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Join GUDY today
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500 p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

      </div>
    </main>
  );
}