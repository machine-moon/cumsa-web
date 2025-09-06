export const metadata = { title: "New Muslims | CUMSA" };

const resources = [
  { label: "New Muslim Academy", href: "https://newmuslimacademy.org" },
  { label: "WhyIslam", href: "https://www.whyislam.org" },
  { label: "Yaqeen Institute (Beginner Series)", href: "https://yaqeeninstitute.org" },
  { label: "Learn Quran (Tajweed Basics)", href: "https://quran.com" },
  { label: "Hadith Collection", href: "https://sunnah.com" },
];

export default function NewMuslimsPage() {
  return (
    <div>
      <div className="relative h-40 md:h-52 flex items-center justify-center overflow-hidden bg-white">
        <span aria-hidden className="logo-mask-blue" style={{ width: 260, height: 100 }} />
      </div>
      <div className="container-base py-10 space-y-10">
        <header>
          <h1 className="text-3xl font-bold">Welcome / Ahlan wa Sahlan</h1>
          <p className="mt-2 text-gray-700 max-w-2xl">
            This page is for those who have recently embraced Islam or are sincerely exploring it.
            We want to make your first steps simple, supported, and rooted in authentic sources.
          </p>
        </header>

        <section className="rounded-lg border border-black/10 bg-white p-5 space-y-4">
          <h2 className="text-xl font-semibold">Core Pillars To Start With</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Shahada:</strong> The testimony of faith. This is the entry into Islam and the
              anchor of everything else.
            </li>
            <li>
              <strong>Prayer (Salah):</strong> Aim first to learn the form. Consistency matters more
              than perfection.
            </li>
            <li>
              <strong>Qur&apos;an:</strong> Begin with short chapters (Surah Al-Fatihah, the last 10
              surahs). Focus on meaning and pronunciation gradually.
            </li>
            <li>
              <strong>Community:</strong> Stay connected. Growth is healthier with support and good
              company.
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 space-y-4">
          <h2 className="text-xl font-semibold">Practical First Steps</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Set a daily routine for the five prayers (even if you are still memorizing).</li>
            <li>Memorize Surah Al-Fatihah with correct pronunciation over time.</li>
            <li>Learn basic purification (wudhu) properly.</li>
            <li>
              Read a short beginner-friendly booklet or watch a structured series—avoid random
              social media noise.
            </li>
            <li>Schedule check-ins with a knowledgeable mentor or chaplain when possible.</li>
          </ol>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 space-y-3">
          <h2 className="text-xl font-semibold">Local Support</h2>
          <p className="text-gray-700">
            Connect with us in person for guidance, companionship, or to verify resources.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              <strong>Campus Musala:</strong> Daily presence of students who can assist.
            </li>
            <li>
              <strong>Chaplaincy:</strong> Reach out via our Chaplaincy page for 1:1 support.
            </li>
            <li>
              <strong>Events:</strong> Look for &quot;Intro&quot; or &quot;Foundations&quot; themed
              gatherings.
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 space-y-4">
          <h2 className="text-xl font-semibold">Recommended Online Resources</h2>
          <ul className="space-y-2">
            {resources.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="link-cta">
                  {r.label} →
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600">
            Always verify religious information with trusted scholars or established institutes.
          </p>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 space-y-3">
          <h2 className="text-xl font-semibold">Common Reminders</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Growth is gradual. Consistency beats intensity.</li>
            <li>Questions are normal—ask them early instead of guessing.</li>
            <li>Your worth is not measured by how much you know right now.</li>
            <li>Avoid overload—focus on prayer, clean creed, and character first.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
