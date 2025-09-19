import fs from "fs";
import path from "path";

interface QuranQuote {
  quranQuote: string;
  reference: string;
}

const CACHE_DIR = path.resolve(process.cwd(), process.env.CACHE_DIR || ".cache");
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
const QUOTES_FILE = path.join(CACHE_DIR, "quran-quotes.json");
const QUOTES_TTL = 1000 * 60 * 60 * 12; // 12 hours
const QUOTES_URL = "https://quranquotes.vercel.app/api/getAll";

function loadQuotes(): { timestamp: number; data: QuranQuote[] } | undefined {
  try {
    if (!fs.existsSync(QUOTES_FILE)) return;
    return JSON.parse(fs.readFileSync(QUOTES_FILE, "utf-8"));
  } catch {
    return;
  }
}

function saveQuotes(obj: { timestamp: number; data: QuranQuote[] }) {
  try {
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(obj));
  } catch {}
}

async function fetchQuotes(): Promise<QuranQuote[] | undefined> {
  try {
    const res = await fetch(QUOTES_URL);
    if (!res.ok) return;
    return await res.json();
  } catch {
    return;
  }
}

export async function GET() {
  const entry = loadQuotes();
  let quotes: QuranQuote[] | undefined = entry?.data;

  if (!quotes || !entry || Date.now() - entry.timestamp > QUOTES_TTL) {
    quotes = await fetchQuotes();
    if (quotes) {
      saveQuotes({ timestamp: Date.now(), data: quotes });
    } else {
      quotes = [
        {
          quranQuote: "And We have certainly created man in the best of stature.",
          reference: "Quran 95:4",
        },
      ];
    }
  }

  const singleQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return new Response(JSON.stringify(singleQuote), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
