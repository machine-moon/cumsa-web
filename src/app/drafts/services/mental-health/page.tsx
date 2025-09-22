import React from "react";
import Link from "next/link";
import { MENTAL_HEALTH_LINKS } from "@/lib/constants";

export const metadata = { title: "Mental Health Support | CUMSA" };

const cardBase =
  "rounded-xl border border-neutral-200/60 bg-white/70 backdrop-blur shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3";

function ExternalLink(props: React.PropsWithChildren<{ href: string; label?: string }>) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-700 underline decoration-dotted underline-offset-2"
    >
      {props.children || props.label}
    </a>
  );
}

export default function MentalHealthPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 flex flex-col gap-10">
      <header className="text-center flex flex-col gap-3 animate-fade-in">
        <h1 className="text-4xl font-semibold tracking-tight">Mental Health & Well‑Being</h1>
        <p className="text-neutral-600 text-sm max-w-2xl mx-auto">
          Gentle, faith-informed pointers. This page curates quick help, calm steps, and trusted
          places to learn & reach out.
        </p>
      </header>

      <section aria-labelledby="mh-emergency" className="grid md:grid-cols-2 gap-6">
        <div
          className={`${cardBase} bg-rose-50/70 border-rose-200 animate-slide-in-left hover:scale-[1.02] transition-transform`}
        >
          <h2 id="mh-emergency" className="text-xl font-bold flex items-center gap-2 text-rose-700">
            <span aria-hidden>❗</span> Immediate Help
          </h2>
          <p className="text-sm text-rose-800 leading-snug">
            If you or someone is in danger or at risk of harming themselves: call local emergency
            services right now. On campus, contact security or the counselling centre urgent line.
          </p>
          <ul className="text-sm flex flex-col gap-1 mt-1">
            <li>
              Emergency: <span className="font-medium">911</span>
            </li>
            <li>Campus Security: 613‑520‑4444</li>
          </ul>
          <p className="text-[11px] text-rose-600 mt-auto">
            You are not alone. Help now is better than silence.
          </p>
        </div>
        <div
          className={`${cardBase} animate-slide-in-right hover:scale-[1.02] transition-transform`}
        >
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span aria-hidden>🧭</span> Quick Calm
          </h2>
          <ul className="text-sm leading-relaxed grid grid-cols-2 gap-x-4 gap-y-1">
            <li>3 deep belly breaths</li>
            <li>Cold water on wrists</li>
            <li>Stand + stretch spine</li>
            <li>Look for 5 colors</li>
            <li>Make wudu mindfully</li>
            <li>Recite Ayat al-Kursi</li>
            <li>Message a friend</li>
            <li>Step outside light</li>
          </ul>
          <p className="text-xs text-neutral-500">Tiny resets stack into relief.</p>
        </div>
      </section>

      <section
        aria-labelledby="mh-hotlines"
        className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 animate-fade-in"
      >
        <div className={`${cardBase} hover:scale-[1.02] transition-transform`}>
          <h2 id="mh-hotlines" className="text-xl font-bold flex items-center gap-2">
            <span aria-hidden>📞</span> Hotlines
          </h2>
          <ul className="text-sm flex flex-col gap-1">
            <li>
              Nisa (women) Helpline: <span className="font-medium">1‑888‑456‑8043</span>
            </li>
            <li>
              Naseeha Youth: <span className="font-medium">1‑866‑627‑3342</span>
            </li>
            <li>Talk Suicide Canada: 9-8-8 </li>
            <li>National Child Abuse: 1‑800‑422‑4453</li>
          </ul>
          <p className="text-[11px] text-neutral-500 mt-1">
            Availability may change; check before calling.
          </p>
        </div>
        <div className={cardBase}>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span aria-hidden>📚</span> Learn & Reflect
          </h2>
          <ul className="text-sm flex flex-col gap-1">
            <li>
              <ExternalLink href={MENTAL_HEALTH_LINKS.yaqeenLibrary}>
                Yaqeen: Psychology & Mental Health
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={MENTAL_HEALTH_LINKS.seekersAnswers}>
                SeekersGuidance: Answers (search mental health)
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={MENTAL_HEALTH_LINKS.muslimMentalHealthDirectory}>
                Muslim Mental Health (directory)
              </ExternalLink>
            </li>
          </ul>
          <p className="text-[11px] text-neutral-500 mt-auto">Knowledge can soften stigma.</p>
        </div>
        <div className={cardBase}>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span aria-hidden>🧠</span> Professional & Community
          </h2>
          <ul className="text-sm flex flex-col gap-1">
            <li>
              <ExternalLink href={MENTAL_HEALTH_LINKS.carletonHealth}>
                Campus Health & Counselling (Carleton)
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={MENTAL_HEALTH_LINKS.mfso}>
                Muslim Family Services (MFSO)
              </ExternalLink>
            </li>
          </ul>
          <p className="text-[11px] text-neutral-500 mt-auto">
            Getting help is strength, not failure.
          </p>
        </div>
      </section>

      <section aria-labelledby="mh-reverts" className="grid md:grid-cols-2 gap-6">
        <div className={cardBase}>
          <h2 id="mh-reverts" className="text-xl font-bold flex items-center gap-2">
            <span aria-hidden>🌱</span> Revert Support
          </h2>
          <p className="text-sm leading-snug">
            New to Islam? Identity shifts can feel tender. You&apos;re allowed time, questions, and
            boundaries. Small, consistent acts over intensity.
          </p>
          <ul className="text-sm flex flex-col gap-1">
            <li>Pair with a gentle mentor (reach out to us)</li>
            <li>
              <ExternalLink href={MENTAL_HEALTH_LINKS.yaqeenLibrary}>
                Foundational articles (Mental Health)
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={MENTAL_HEALTH_LINKS.newMuslimAcademy}>
                New Muslim Academy
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={MENTAL_HEALTH_LINKS.seekersGuidance}>
                SeekersGuidance classes
              </ExternalLink>
            </li>
          </ul>
          <p className="text-[11px] text-neutral-500">Faith grows in kindness to self.</p>
        </div>
        <div className={cardBase}>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span aria-hidden>🪴</span> Gentle Reminders
          </h2>
          <ul className="text-sm flex flex-col gap-1">
            <li>Du&apos;a is heard, even if your words are few</li>
            <li>Rest, sunlight, and gentle meals help more than you think</li>
            <li>Your feelings are real, but not every thought is true</li>
            <li>Set small goals and notice your progress</li>
            <li>Faith and therapy can work together</li>
          </ul>
          <p className="text-[11px] text-neutral-500 mt-auto">Mercy over perfection.</p>
        </div>
      </section>

      <section aria-labelledby="mh-disclaimer" className="text-center flex flex-col gap-2">
        <p
          id="mh-disclaimer"
          className="text-xs text-neutral-500 max-w-2xl mx-auto leading-relaxed"
        >
          This page is an evolving draft, not medical or clinical advice. Consult qualified
          professionals for diagnosis or treatment. Suggest edits or additions by contacting us.
        </p>
        <Link
          href="/contact-us"
          className="text-xs text-blue-600 hover:text-blue-700 underline decoration-dotted"
        >
          Share a resource / feedback
        </Link>
      </section>
    </main>
  );
}
