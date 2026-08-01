import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-white">
            Why Choose GUDY?
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage Telegram bots,
            groups and communities from one powerful platform.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="card p-8">

            <h3 className="text-2xl font-bold text-cyan-400">
              🤖 Telegram Bots
            </h3>

            <p className="mt-4 text-gray-400">
              Connect and manage your Telegram bot with a
              modern dashboard.
            </p>

          </div>

          <div className="card p-8">

            <h3 className="text-2xl font-bold text-cyan-400">
              🔒 Secure
            </h3>

            <p className="mt-4 text-gray-400">
              Built with Supabase authentication and secure
              account linking.
            </p>

          </div>

          <div className="card p-8">

            <h3 className="text-2xl font-bold text-cyan-400">
              📈 Grow Faster
            </h3>

            <p className="mt-4 text-gray-400">
              Manage your community, premium features and
              future analytics in one place.
            </p>

          </div>

        </div>

      </section>
    </>
  );
}