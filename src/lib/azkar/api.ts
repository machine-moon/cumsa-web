import { Category, Zikr } from "./types";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch("https://www.hisnmuslim.com/api/en/husn_en.json");
    if (!res.ok) throw new Error("Bad response " + res.status);
    const data: { English?: Category[]; english?: Category[] } = await res.json();
    if (data && typeof data === "object") {
      if (Array.isArray(data.English)) return data.English;
      if (Array.isArray(data.english)) return data.english;
    }
    return [];
  } catch (e) {
    console.error("fetchCategories error", e);
    throw new Error("Categories fetch failed");
  }
}

export async function fetchAzkarByCategory(categoryId: number): Promise<Zikr[]> {
  try {
    const res = await fetch(`https://www.hisnmuslim.com/api/en/${categoryId}.json`);
    if (!res.ok) throw new Error("Bad response " + res.status);
    const raw: Record<string, Zikr[]> = await res.json();
    if (raw && typeof raw === "object") {
      const firstKey = Object.keys(raw)[0];
      const arr = firstKey ? raw[firstKey] : [];
      if (Array.isArray(arr)) return arr;
    }
    return [];
  } catch (e) {
    console.error("fetchAzkarByCategory error", e);
    throw new Error("Azkar fetch failed");
  }
}
