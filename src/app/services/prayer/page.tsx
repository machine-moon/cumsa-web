import { LINKS } from "@/lib/constants";
import { getOttawaTimings } from "@/lib/prayer-api";
import { PrayerCountdown } from "@/components/PrayerCountdown";
import { to12Hour } from "@/lib/to12Hour";
import { FaMoon, FaSun, FaCloudSun, FaStar } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";

export const metadata = { title: "Prayer Services | CUMSA" };

export default async function PrayerServicesPage() {
  const data = await getOttawaTimings();
  const timings = data?.timings ?? null;
  const tz = data?.meta.timezone ?? "America/Toronto";
  const readable = data?.date.readable ?? "";
  const hijri = data?.date.hijri.date ?? "";
  const order = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

  return (
    <div>
      <div className="relative h-40 md:h-52 flex items-center justify-center overflow-hidden bg-white">
        <span aria-hidden className="logo-mask-blue" style={{ width: 260, height: 100 }} />
      </div>
      <div className="container-base py-10">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold">Stay Up To Date</h1>
          <p className="mt-2 text-gray-700">
            Follow our socials or subscribe for Jummah location and timing updates.
          </p>
        </div>

        <section className="mt-8 rounded-lg border border-black/10 bg-white p-5 animate-slide-in-left">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-[var(--red)]">Prayer Times</h2>
              <p className="text-sm text-gray-600">
                {readable}
                {hijri ? ` • ${hijri} AH` : ""} • {tz}
              </p>
            </div>
            <PrayerCountdown timings={timings} />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border border-black/10 rounded-lg overflow-hidden bg-white">
              <thead>
                <tr className="bg-black/5">
                  <th className="p-3 border-b border-black/10">Prayer</th>
                  <th className="p-3 border-b border-black/10">Time</th>
                </tr>
              </thead>
              <tbody>
                {order.map((k) => {
                  const time = timings ? timings[k] : null;
                  const iconConfig: Record<string, { icon: React.ReactNode; color: string }> = {
                    Fajr: { icon: <FaMoon className="text-base" />, color: "var(--navy)" },
                    Sunrise: { icon: <WiSunrise className="text-2xl" />, color: "#f59e0b" },
                    Dhuhr: { icon: <FaSun className="text-base" />, color: "#eab308" },
                    Asr: { icon: <FaCloudSun className="text-base" />, color: "var(--blue)" },
                    Maghrib: { icon: <WiSunset className="text-2xl" />, color: "var(--red)" },
                    Isha: { icon: <FaStar className="text-base" />, color: "var(--navy)" },
                  };
                  const { icon, color } = iconConfig[k] || { icon: null, color: "inherit" };
                  return (
                    <tr key={k} className="hover:bg-black/5 transition-base">
                      <td className="p-3 border-b border-black/10 font-medium">
                        <span className="flex items-center gap-3">
                          <span className="w-6 flex items-center justify-center" style={{ color }}>
                            {icon}
                          </span>
                          <span>{k}</span>
                        </span>
                      </td>
                      <td className="p-3 border-b border-black/10">
                        {time ? to12Hour(time) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!timings && (
            <p className="mt-3 text-sm text-red-600">
              Unable to load prayer times right now. Please try again later.
            </p>
          )}
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 gap-x-0 md:gap-x-6">
          <div className="flex flex-col gap-10 md:border-r md:border-black/10 md:pr-6">
            <section className="rounded-lg border border-black/10 bg-white p-6 md:p-4 animate-slide-in-left hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold">Main Prayer Room (Musalla).</h2>
              <p className="mt-2 text-gray-700">
                Open daily for all Muslim students with wudhu facilities for brothers and sisters.
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Hours:</strong> Always open
                <br />
                <strong>Location:</strong> 225A University Centre (2nd Floor)
              </p>
              <div className="mt-4 bg-gray-50/50 rounded-lg p-4 border border-black/5">
                <p className="text-sm font-medium text-gray-900 mb-3">How to get there:</p>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-[var(--red)] font-semibold min-w-[1.5rem]">1.</span>
                    <span>Enter University Centre from the main entrance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--red)] font-semibold min-w-[1.5rem]">2.</span>
                    <span>Take the stairs or elevator to the 2nd floor</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--red)] font-semibold min-w-[1.5rem]">3.</span>
                    <span>Turn right after exiting</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--red)] font-semibold min-w-[1.5rem]">4.</span>
                    <span>Walk straight to the end of the hallway, then turn left</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--red)] font-semibold min-w-[1.5rem]">5.</span>
                    <span>Room 225A will be on your right</span>
                  </li>
                </ol>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={LINKS.musallaDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-cta"
                >
                  View Directions
                </a>
                <a
                  href={LINKS.musallaDirectionsVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-cta"
                >
                  Watch Directions
                </a>
              </div>
            </section>
            <section className="rounded-lg border border-black/10 bg-white p-6 md:p-4 mt-10 md:mt-0 animate-slide-in-right hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold">Paterson Hall</h2>
              <p className="mt-2 text-gray-700">Another option for prayer on campus.</p>
              <p className="mt-2 text-gray-700">
                <strong>Location:</strong> 218 Paterson Hall
              </p>
              <a
                href={LINKS.patersonDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="link-cta"
              >
                View Directions
              </a>
            </section>
          </div>
          <section className="rounded-lg border border-black/10 bg-white p-6 md:p-4 mt-12 md:mt-0 animate-slide-in-right hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-[var(--red)]">Jummuah</h2>
            <p className="mt-2 text-gray-700">
              Weekly Jummuah prayers at the Combatives Room or Norm Fenn Gym.
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">This Week&apos;s Schedule</h3>
              <div className="mt-3 space-y-3">
                <div className="flex justify-between items-center py-2 px-3 bg-white rounded border">
                  <span className="font-medium">First Prayer: 12:15 PM</span>
                  <span className="text-gray-700">Khateeb: First Last</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-white rounded border">
                  <span className="font-medium">Second Prayer: 1:15 PM</span>
                  <span className="text-gray-700">Khateeb: First Last</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-white rounded border">
                  <span className="font-medium">Third Prayer: 2:30 PM</span>
                  <span className="text-gray-700">Khateeb: First Last</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 font-medium">
                Location: Fieldhouse or Norm Fenn Gym
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Schedule updated weekly. Follow our socials for latest updates.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
