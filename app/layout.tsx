import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GUDY",
  description: "Power. Control. Grow.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GUDY",
    description: "Power. Control. Grow.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className="bg-[#050816] text-white min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </body>

    </html>
  );
}