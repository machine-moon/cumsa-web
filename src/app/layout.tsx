import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
import { LOGOS } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CUMSA",
  description: "Carleton Muslim Student Association",
  icons: {
    icon: LOGOS.main,
    shortcut: LOGOS.main,
    apple: LOGOS.main,
  },
};

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <IntroAnimation />
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        {/*<ChatBubble />*/}
        <Footer />
      </body>
    </html>
  );
}
