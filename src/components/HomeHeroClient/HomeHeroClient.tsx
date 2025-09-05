"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function HomeHeroClient() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/zahid-lilani-unsplash-scaled.jpg"
          alt="CUMSA banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/55" />
      </div>
      <div className="container-base py-24 md:py-32 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Carleton University Muslim Students’ Association
        </motion.h1>
        <motion.div className="mt-4 max-w-2xl text-white/85 text-lg">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 38,
              deleteSpeed: 22,
              cursor: '<span class="typewriter-cursor">|</span>',
              strings: [
                "Join us for prayer, support, and vibrant community!",
                "Family in Faith on campus.",
                "la ilaha illallah muhammadur rasulullah.",
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="/services/prayer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[var(--blue)] text-white hover:opacity-90 focus-visible:ring-[var(--blue)] ring-offset-[var(--surface)] px-4 py-2"
          >
            Prayers
          </Link>
          <Link
            href="/join-us"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-black/10 bg-[var(--surface)] text-[var(--foreground)] hover:bg-black/5 focus-visible:ring-[var(--blue)] ring-offset-[var(--surface)] px-4 py-2"
          >
            Join Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
