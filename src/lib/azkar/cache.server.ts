import fs from "fs";
import path from "path";
import { Category, Zikr } from "./types";
const CACHE_DIR = path.resolve(process.cwd(), process.env.CACHE_DIR || ".cache");
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

const CATEGORY_FILE = path.join(CACHE_DIR, "azkar-categories.json");
const ZIKR_FILE = path.join(CACHE_DIR, "azkar-zikr.json");
const CATEGORY_TTL = 1000 * 60 * 60 * 24;
const ZIKR_TTL = 1000 * 60 * 60 * 6;

interface Wrapper<T> {
  [key: string]: { timestamp: number; data: T };
}

function loadFile<T>(file: string): Wrapper<T> {
  try {
    if (!fs.existsSync(file)) return {};
    return JSON.parse(fs.readFileSync(file, "utf-8")) as Wrapper<T>;
  } catch {
    return {};
  }
}

function saveFile<T>(file: string, obj: Wrapper<T>) {
  try {
    fs.writeFileSync(file, JSON.stringify(obj));
  } catch {}
}

export function getCategoryCache() {
  return {
    get(): Category[] | undefined {
      const store = loadFile<Category[]>(CATEGORY_FILE);
      const entry = store["data"];
      if (!entry) return;
      if (Date.now() - entry.timestamp > CATEGORY_TTL) return;
      return entry.data;
    },
    set(data: Category[]) {
      const store = loadFile<Category[]>(CATEGORY_FILE);
      store["data"] = { timestamp: Date.now(), data };
      saveFile(CATEGORY_FILE, store);
    },
  };
}

export function getZikrCache() {
  return {
    get(id: number): Zikr[] | undefined {
      const store = loadFile<Zikr[]>(ZIKR_FILE);
      const entry = store[`cat-${id}`];
      if (!entry) return;
      if (Date.now() - entry.timestamp > ZIKR_TTL) return;
      return entry.data;
    },
    set(id: number, data: Zikr[]) {
      const store = loadFile<Zikr[]>(ZIKR_FILE);
      store[`cat-${id}`] = { timestamp: Date.now(), data };
      saveFile(ZIKR_FILE, store);
    },
  };
}
