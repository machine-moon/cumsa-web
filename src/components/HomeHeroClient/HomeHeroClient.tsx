"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function HomeHeroClient() {
  return (
    <section className="relative overflow-hidden min-h-[65vh] md:min-h-[75vh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/UC.jpeg"
          alt="CUMSA banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
      </div>
      <div className="container-base py-16 md:py-28 text-white">
        <div className="max-w-3xl">
          <div className="frost-card p-6 md:p-8 animate-fade-in">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl md:text-6xl font-extrabold leading-tight"
            >
              Carleton University Muslim Students’ Association
            </motion.h1>
            <motion.div className="mt-3 md:mt-4 max-w-2xl text-white/90 text-lg">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 34,
                  deleteSpeed: 20,
                  cursor: '<span class="typewriter-cursor">|</span>',
                  strings: [
                    "Assalamu alaykum — a welcoming space on campus.",
                    "Find prayer times, events, and friendly faces.",
                    "Family in Faith. You belong here.",
                  ],
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 md:mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/services/prayer"
                className="btn-cozy border-2 border-[color-mix(in_oklab,var(--blue)_40%,transparent)] bg-[color-mix(in_oklab,var(--blue)_10%,transparent)] text-white/90 hover:bg-[var(--blue)] hover:text-white transition-base"
              >
                Prayers
              </Link>
              <Link
                href="/events"
                className="btn-cozy border-2 border-[color-mix(in_oklab,var(--blue)_40%,transparent)] bg-[color-mix(in_oklab,var(--blue)_10%,transparent)] text-white/90 hover:bg-[var(--blue)] hover:text-white transition-base"
              >
                Events
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
