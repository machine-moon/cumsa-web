export const metadata = { title: "About Us | CUMSA" };
export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] via-[var(--navy)] to-[var(--blue)]/80" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="relative container-base py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About the MSA</h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Welcome to Carleton University&apos;s Muslim Students&apos; Association. We&apos;re
              your on-campus resource for practicing your faith comfortably, building community, and
              serving others.
            </p>
          </div>
        </div>
      </section>

      <div className="container-base py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <section className="card p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--blue)] to-[var(--navy)] flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--navy)]">Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Driven by our religious foundation, our vision is to empower and inspire students to
                be a positive force for change.
              </p>
            </section>

            <section className="card p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--red)] to-[var(--navy)] flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--navy)]">Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to provide a welcoming, supportive, and enriching environment through
                our educational, spiritual, and social services and events. We also aim to represent
                the concerns of Carleton University&apos;s Muslim student body, encourage civic
                engagement, and raise awareness about Islam.
              </p>
            </section>
          </div>

          <section className="card p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in bg-gradient-to-br from-white to-blue-50/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--green)] to-[var(--blue)] flex items-center justify-center">
                <span className="text-2xl">💚</span>
              </div>
              <h2 className="text-2xl font-bold text-[var(--navy)]">Our Community</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Carleton University Muslim Students&apos; Association serves as a vibrant hub for
              Muslim students and allies to connect, grow, and make a difference. Through our
              diverse programming, we create spaces for spiritual development, academic support,
              social connection, and community service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
