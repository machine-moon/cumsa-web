import Image from "next/image";
import MotionCard from "@/components/MotionCard";
import HomeHeroClient from "@/components/HomeHeroClient";
import JoinUs from "@/components/JoinUsSection/page";
export default function Home() {
  return (
    <div>
      <HomeHeroClient />

      <section>
        <div className="container-base py-10 flex justify-center">
          <div className="portal-glow overflow-hidden animate-fade-in">
            <Image
              src="/salam-1.png"
              alt="Bismillah banner"
              width={1200}
              height={300}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container-base py-12">
          <h2 className="text-2xl font-bold text-center title animate-fade-in">Our Services</h2>
          <p className="mt-2 text-center text-gray-600 animate-fade-in">
            Support, spaces, and events designed for you.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="animate-slide-in-left">
              <MotionCard>
                <h3 className="mt-3 font-semibold text-lg">Prayers</h3>
                <p className="mt-2 text-gray-600">
                  Find prayer spaces on campus and get Jummah updates.
                </p>
                <a href="/services/prayer" className="mt-4 btn-cozy btn-outline no-underline">
                  Explore
                </a>
              </MotionCard>
            </div>
            <div className="animate-fade-in">
              <MotionCard>
                <h3 className="mt-3 font-semibold text-lg">Chaplaincy</h3>
                <p className="mt-2 text-gray-600">
                  1:1 support, mentorship, and spiritual care for students.
                </p>
                <a href="/services/chaplaincy" className="mt-4 btn-cozy btn-primary no-underline">
                  Get Support
                </a>
              </MotionCard>
            </div>
            <div className="animate-slide-in-right">
              <MotionCard>
                <h3 className="mt-3 font-semibold text-lg">Events</h3>
                <p className="mt-2 text-gray-600">
                  See upcoming events, socials, workshops, and opportunities.
                </p>
                <a href="/events" className="mt-4 btn-cozy btn-outline no-underline">
                  See Events
                </a>
              </MotionCard>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-base py-12">
          <h2 className="text-2xl font-bold text-center title animate-fade-in">Our Purpose</h2>
          <p className="mt-2 text-center text-gray-600 animate-fade-in">
            What guides our work and community every day.
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div className="card p-6 border-t-4 border-[var(--blue)]/40 transition-base hover:shadow-md hover:-translate-y-0.5 animate-slide-in-left">
              <h3 className="font-semibold">Who We Are</h3>
              <p className="mt-2 text-gray-700">
                We’re the campus hub for practicing and growing in faith, building an inclusive
                community for students.
              </p>
            </div>
            <div className="card p-6 border-t-4 border-[var(--blue)]/40 transition-base hover:shadow-md hover:-translate-y-0.5 animate-fade-in">
              <h3 className="font-semibold">What We Do</h3>
              <p className="mt-2 text-gray-700">
                We represent Muslim students, organize services and events, and encourage civic
                engagement and learning.
              </p>
            </div>
            <div className="card p-6 border-t-4 border-[var(--blue)]/40 transition-base hover:shadow-md hover:-translate-y-0.5 animate-slide-in-right">
              <h3 className="font-semibold">Who We Serve</h3>
              <p className="mt-2 text-gray-700">
                We support the Muslim student body at Carleton—our diverse family keeps growing
                every year.
              </p>
            </div>
          </div>
        </div>
      </section>
      <JoinUs />
    </div>
  );
}
