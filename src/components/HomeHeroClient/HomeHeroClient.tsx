"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HomeHeroClient() {
  const heroImages = [
    "/hero/MUSULLAH.png",
    "/hero/UC.jpeg",
    "/hero/zahid-lilani-unsplash-scaled.jpg",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const sectionRef = useRef<HTMLDivElement>(null);

  type SlideControlsProps = {
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
    heroImages: string[];
  };
  function SlideControls({ current, setCurrent, heroImages }: SlideControlsProps) {
    const total = heroImages.length;
    const prev = () => setCurrent((i) => (i - 1 + total) % total);
    const next = () => setCurrent((i) => (i + 1) % total);
    return (
      <div className="w-full flex justify-center items-center gap-6 mt-8 md:mt-10 z-20">
        <button
          aria-label="Previous image"
          onClick={prev}
          className="rounded-full border border-[var(--navy)] bg-white/70 text-[var(--navy)] w-8 h-8 flex items-center justify-center transition hover:bg-[var(--blue)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        >
          <FaChevronLeft size={14} />
        </button>
        <div className="flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to image ${idx + 1}`}
              onClick={() => setCurrent(idx)}
              className={`rounded-full w-4 h-4 flex items-center justify-center border border-transparent bg-white/60 transition ${current === idx ? "border-[var(--blue)]" : ""}`}
            >
              <span
                className={`block w-2 h-2 rounded-full ${current === idx ? "bg-[var(--blue)]" : "bg-[var(--navy)] opacity-30"}`}
              />
            </button>
          ))}
        </div>
        <button
          aria-label="Next image"
          onClick={next}
          className="rounded-full border border-[var(--navy)] bg-white/70 text-[var(--navy)] w-8 h-8 flex items-center justify-center transition hover:bg-[var(--blue)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        >
          <FaChevronRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <section>
      <section ref={sectionRef} className="relative overflow-hidden min-h-[65vh] md:min-h-[75vh]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImages[current]}
            alt="CUMSA banner"
            fill
            priority
            className="object-cover object-center transition-all duration-700"
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
                    delay: 40,
                    deleteSpeed: 25,
                    cursor: '<span class="typewriter-cursor">|</span>',
                  }}
                  onInit={(tw) => {
                    tw.typeString("Assalamu alaykum! Welcome to CUMSA.")
                      .pauseFor(4000)
                      .deleteAll()
                      .typeString("Find prayer times, events, and friendly faces.")
                      .pauseFor(4000)
                      .deleteAll()
                      .typeString("Family in Faith. You belong here.")
                      .pauseFor(4000)
                      .deleteAll()
                      .start();
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
      <SlideControls current={current} setCurrent={setCurrent} heroImages={heroImages} />
    </section>
  );
}
