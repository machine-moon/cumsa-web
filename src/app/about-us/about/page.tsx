export const metadata = { title: "About Us | CUMSA" };
export default function AboutPage() {
  return (
    <div>
      <section className="bg-[var(--navy)] text-white">
        <div className="container-base py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold">About the MSA</h1>
          <p className="mt-3 text-white/85 max-w-3xl">
            Welcome to Carleton University’s Muslim Students’ Association. We’re your on-campus
            resource for practicing your faith comfortably, building community, and serving others.
          </p>
        </div>
      </section>
      <div className="container-base py-12 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold">Vision</h2>
          <p className="mt-3 text-gray-700">
            Driven by our religious foundation, our vision is to empower and inspire students to be
            a positive force for change.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Mission</h2>
          <p className="mt-3 text-gray-700">
            Our mission is to provide a welcoming, supportive, and enriching environment through our
            educational, spiritual, and social services and events. We also aim to represent the
            concerns of Carleton University’s Muslim student body, encourage civic engagement, and
            raise awareness about Islam.
          </p>
        </section>
      </div>
    </div>
  );
}
