export const metadata = { title: "Prayer Services | CUMSA" };

type AlAdhanData = {
  timings: Record<string, string>;
  date: { readable: string; hijri: { date: string } };
  meta: { timezone: string; method?: { name?: string } };
};

async function getOttawaTimings(): Promise<AlAdhanData | null> {
  const url = new URL("https://api.aladhan.com/v1/timingsByCity");
  url.searchParams.set("city", "Ottawa");
  url.searchParams.set("country", "Canada");
  url.searchParams.set("method", "2"); // ISNA
  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    const json = (await res.json()) as { code: number; data: AlAdhanData };
    if (json.code !== 200 || !json.data) return null;
    return json.data;
  } catch {
    return null;
  }
}

export default async function PrayerServicesPage() {
  const data = await getOttawaTimings();
  const timings = data?.timings ?? null;
  const tz = data?.meta.timezone ?? "America/Toronto";
  const readable = data?.date.readable ?? "";
  const hijri = data?.date.hijri.date ?? "";
  const methodName = data?.meta.method?.name ?? "ISNA";
  const order = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

  return (
    <div>
      <div className="relative h-40 md:h-52 flex items-center justify-center overflow-hidden bg-white">
        <span aria-hidden className="logo-mask-blue" style={{ width: 260, height: 100 }} />
      </div>
      <div className="container-base py-10">
        <h1 className="text-3xl font-bold">Stay Up To Date</h1>
        <p className="mt-2 text-gray-700">
          Follow our socials or subscribe for Jummah location and timing updates.
        </p>

        <section className="mt-8 rounded-lg border border-black/10 bg-white p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-[var(--red)]">Prayer Times — Ottawa</h2>
              <p className="text-sm text-gray-600">
                {readable}
                {hijri ? ` • ${hijri} AH` : ""} • {tz}
              </p>
            </div>
            <div className="text-sm text-gray-600">Method: {methodName}</div>
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
                {order.map((k) => (
                  <tr key={k} className="hover:bg-black/5 transition-base">
                    <td className="p-3 border-b border-black/10 font-medium">{k}</td>
                    <td className="p-3 border-b border-black/10">{timings ? timings[k] : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!timings && (
            <p className="mt-3 text-sm text-red-600">
              Unable to load prayer times right now. Please try again later.
            </p>
          )}
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-lg border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">Jummuah</h2>
            <p className="mt-2 text-gray-700">
              Jummuah is offered at the Fieldhouse or Norm Fenn Gym. Weekly updates are posted on
              social media and via newsletter.
            </p>
          </section>
          <section className="rounded-lg border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">Musala</h2>
            <p className="mt-2 text-gray-700">
              Open daily for all Muslim students with wudhu facilities for brothers and sisters.
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Hours:</strong> Always open
              <br />
              <strong>Location:</strong> 225A University Centre (2nd Floor)
            </p>
          </section>
          <section className="rounded-lg border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">Multi‑Faith Centre</h2>
            <p className="mt-2 text-gray-700">
              Available during prayer times and bookable for various groups on campus.
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Location:</strong> 226C University Centre (2nd Floor)
            </p>
            <a
              href="https://www.cusaonline.ca/services/servicecentres/multi-faith/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-cta"
            >
              Learn more →
            </a>
          </section>
          <section className="rounded-lg border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">Combatives Room</h2>
            <p className="mt-2 text-gray-700">Another option for prayer on campus.</p>
            <p className="mt-2 text-gray-700">
              <strong>Location:</strong> 2406 Athletics (2nd Floor of Ice House)
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
