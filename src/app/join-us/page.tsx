export const metadata = { title: "Join Us | CUMSA" };
export default function JoinUsPage() {
  return (
    <div className="container-base py-12">
      <h1 className="text-3xl font-bold title">Become a Council Member</h1>
      <p className="mt-4 text-gray-700">
        Lead committees, plan events, and build valuable skills while serving the community. Teams
        include Finance, Communications, Student Life, Internal, External, Services, and
        Administration.
      </p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSf26RDn8I2t_pcQBoF72GLIwUllaG8kF5KPd1OAekPC-oaY9A/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block px-5 py-2.5 rounded-md bg-[var(--blue)] text-white transition-base hover:opacity-90"
      >
        Click Here to Apply
      </a>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold text-[var(--red)]">Stay in the Loop</h2>
          <p className="mt-2 text-gray-700">
            Subscribe to our weekly newsletter for updates on events, prayer locations and times,
            and reminders.
          </p>
        </section>
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-[var(--red)]">Join Our Discord</h2>
          <p className="mt-2 text-gray-700">Our primary channel for announcements and community.</p>
          <a
            href="https://discord.gg/GugaNUV"
            target="_blank"
            rel="noopener noreferrer"
            className="link-cta"
          >
            Join our Discord →
          </a>
        </section>
      </div>
    </div>
  );
}
