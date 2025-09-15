"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"show" | "disperse" | "exit">("show");
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const introPlayed = sessionStorage.getItem("cumsa-intro-played");

    if (introPlayed) {
      setShow(false);
      setHasPlayed(true);
      return;
    }

    sessionStorage.setItem("cumsa-intro-played", "true");

    const disperseTimer = setTimeout(() => setPhase("disperse"), 2000);
    const exitTimer = setTimeout(() => {
      setPhase("exit");
      setTimeout(() => {
        setShow(false);
        setHasPlayed(true);
      }, 100);
    }, 1500);

    return () => {
      clearTimeout(disperseTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  if (hasPlayed || !show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-400 ease-in-out
        ${phase === "exit" ? "opacity-0" : "opacity-100"}
      `}
      style={{
        background: `linear-gradient(135deg, 
          rgba(90, 206, 216, 0.1) 0%, 
          rgba(255, 255, 255, 0.95) 40%, 
          rgba(255, 255, 255, 0.95) 60%, 
          rgba(42, 116, 135, 0.1) 100%)`,
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-[var(--blue)] rounded-full opacity-20
              ${phase === "show" ? "animate-pulse" : ""}
              ${phase === "disperse" ? "animate-ping" : ""}
            `}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8">
        <div className="relative flex flex-col items-center">
          <div
            className={`relative transition-all duration-700 ease-out mb-6 sm:mb-8
              ${phase === "show" ? "scale-100 opacity-100 translate-y-0" : ""}
              ${phase === "disperse" ? "scale-150 opacity-0" : ""}
              ${phase === "exit" ? "scale-125 opacity-0" : ""}
            `}
            style={{
              filter: phase === "disperse" ? "blur(2px)" : "none",
            }}
          >
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000
                ${phase === "show" ? "bg-[var(--blue)] opacity-20 scale-110 blur-xl" : "opacity-0 scale-100"}
                ${phase === "disperse" ? "scale-200 opacity-0" : ""}
              `}
            />

            <Image
              src="/CU-MSA-LOGO.png"
              alt="CUMSA Logo"
              width={160}
              height={160}
              className={`relative z-10 
                ${phase === "show" ? "animate-bounce" : ""}
                sm:w-48 sm:h-48
              `}
              style={{
                animationDuration: phase === "show" ? "2s" : "0s",
                animationIterationCount: "infinite",
              }}
              priority
            />

            {phase === "disperse" && (
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-[var(--blue)] rounded-full animate-ping"
                    style={{
                      left: `${50 + Math.cos((i * Math.PI) / 4) * 100}%`,
                      top: `${50 + Math.sin((i * Math.PI) / 4) * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "0.8s",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div
            className={`text-center transition-all duration-700 ease-out
              ${phase === "show" ? "opacity-100 translate-y-0" : ""}
              ${phase === "disperse" ? "opacity-70 scale-105" : ""}
              ${phase === "exit" ? "opacity-0 translate-y-2" : ""}
            `}
          >
            <h1 className="text-2xl sm:text-4xl font-bold text-[var(--navy)] mb-2 sm:mb-3 tracking-wide">
              CUMSA
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-light px-4 leading-relaxed">
              Carleton University Muslim Students&apos; Association
            </p>

            <div
              className={`w-16 sm:w-24 h-0.5 bg-gradient-to-r from-[var(--navy)] to-[var(--blue)] 
                mx-auto mt-3 sm:mt-4 transition-all duration-500
                ${phase === "show" ? "opacity-60 scale-100" : "opacity-0 scale-75"}
              `}
            />
          </div>

          <p
            className={`text-xs sm:text-sm text-slate-500 mt-4 sm:mt-6 transition-all duration-500
              ${phase === "show" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              ${phase === "disperse" ? "opacity-30" : ""}
            `}
          >
            ✨ Welcome ✨
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </div>
  );
}
