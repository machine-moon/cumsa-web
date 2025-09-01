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
          <h2 className="text-xl font-semibold">Who We Are</h2>
          <p className="mt-3 text-gray-700">
            Our vision is to empower and inspire students to be a positive force for
            change—beginning with our campus and extending to the wider community. With a diverse
            and growing membership, we’re one of the biggest clubs at Carleton. With God’s help, we
            aim to be your Family in Faith.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">What We Do</h2>
          <p className="mt-3 text-gray-700">
            We organize services and events, provide spaces and support for prayer and learning, and
            encourage civic engagement and representation for Muslim students.
          </p>
        </section>
      </div>
    </div>
  );
}
