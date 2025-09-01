import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import ChatBubble from "@/components/ChatBubble";

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
    icon: "/CU-MSA-LOGO-blank-2.png",
    shortcut: "/CU-MSA-LOGO-blank-2.png",
    apple: "/CU-MSA-LOGO-blank-2.png",
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
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <ChatBubble />
        <footer className="mt-12 border-t border-black/10">
          <div className="bg-white">
            <div className="container-base py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="logo-mask-blue rounded-sm"
                  style={{ width: 28, height: 28 }}
                />
                <div className="text-sm text-gray-700">
                  <div>
                    <a className="hover:underline" href="mailto:info@cumsa.ca">
                      info@cumsa.ca
                    </a>
                  </div>
                  <div>© {new Date().getFullYear()} CUMSA</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[var(--navy)]">
                <a
                  aria-label="Facebook"
                  href="https://www.facebook.com/CarletonMSA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--blue)] transition-base"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  aria-label="Twitter"
                  href="https://twitter.com/carletonmsa?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--blue)] transition-base"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  aria-label="Instagram"
                  href="https://www.instagram.com/carletonmsa/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--blue)] transition-base"
                >
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </div>
          {}
        </footer>
      </body>
    </html>
  );
}
