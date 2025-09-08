import Image from "next/image";
import MotionCard from "@/components/MotionCard";
import HomeHeroClient from "@/components/HomeHeroClient";
import JoinUs from "@/components/JoinUsSection/page";
export default function Home() {
  return (
    <div>
      <HomeHeroClient />

      <section className="bg-white">
        <div className="container-base py-8 flex justify-center">
          <Image
            src="/salam-1.png"
            alt="Bismillah banner"
            width={900}
            height={200}
            className="w-full max-w-4xl h-auto rounded-lg border border-black/10"
          />
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="container-base py-12">
          <h2 className="text-2xl font-bold text-center title">Our Services</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <MotionCard>
              <a href="/services/prayer" className="no-underline">
                <h3 className="font-semibold text-lg">Prayers</h3>
                <p className="mt-2 text-gray-600">
                  Find prayer spaces on campus and Jummah updates.
                </p>
                <span className="mt-3 inline-block link-cta">Click Here →</span>
              </a>
            </MotionCard>
            <MotionCard>
              <a href="/services/equity" className="no-underline">
                <h3 className="font-semibold text-lg">Equity Services</h3>
                <p className="mt-2 text-gray-600">
                  Know your rights and how to request religious accommodations.
                </p>
                <span className="mt-3 inline-block link-cta">Click Here →</span>
              </a>
            </MotionCard>
            <MotionCard>
              <a href="/services/roommate" className="no-underline">
                <h3 className="font-semibold text-lg">Roommate Services</h3>
                <p className="mt-2 text-gray-600">
                  Need a place to stay? Search community listings.
                </p>
                <span className="mt-3 inline-block link-cta">Click Here →</span>
              </a>
            </MotionCard>
          </div>
        </div>
      </section>

      <section>
        <div className="container-base py-12">
          <h2 className="text-2xl font-bold text-center title">Our Purpose</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div className="card p-6">
              <h3 className="font-semibold">Who We Are</h3>
              <p className="mt-2 text-gray-700">
                We’re the campus hub for practicing and growing in faith, building an inclusive
                community for students.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold">What We Do</h3>
              <p className="mt-2 text-gray-700">
                We represent Muslim students, organize services and events, and encourage civic
                engagement and learning.
              </p>
            </div>
            <div className="card p-6">
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
