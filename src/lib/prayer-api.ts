type AlAdhanData = {
  timings: Record<string, string>;
  date: { readable: string; hijri: { date: string } };
  meta: { timezone: string; method?: { name?: string } };
};

export async function getOttawaTimings(): Promise<AlAdhanData | null> {
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
