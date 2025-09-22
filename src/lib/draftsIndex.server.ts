import fs from "fs/promises";
import path from "path";

export type DraftEntry = { href: string; label: string; group: string };

function toTitleCase(segment: string) {
  return segment
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function getDraftEntries(): Promise<DraftEntry[]> {
  const baseDir = path.join(process.cwd(), "src", "app", "drafts");
  const entries: DraftEntry[] = [];

  async function exists(p: string) {
    try {
      await fs.stat(p);
      return true;
    } catch {
      return false;
    }
  }

  try {
    const groups = await fs.readdir(baseDir, { withFileTypes: true });
    for (const g of groups) {
      if (!g.isDirectory()) continue;
      const group = g.name;
      const groupDir = path.join(baseDir, group);

      // Support direct index at /drafts/<group>
      const groupIndex = path.join(groupDir, "page.tsx");
      if (await exists(groupIndex)) {
        entries.push({
          href: `/drafts/${group}`,
          group: toTitleCase(group),
          label: `${toTitleCase(group)} · Index`,
        });
      }

      // Leaf pages: /drafts/<group>/<leaf>/page.tsx
      const leaves = await fs.readdir(groupDir, { withFileTypes: true });
      for (const leaf of leaves) {
        if (!leaf.isDirectory()) continue;
        const leafDir = path.join(groupDir, leaf.name);
        const pageFile = path.join(leafDir, "page.tsx");
        if (await exists(pageFile)) {
          entries.push({
            href: `/drafts/${group}/${leaf.name}`,
            group: toTitleCase(group),
            label: `${toTitleCase(group)} · ${toTitleCase(leaf.name)}`,
          });
        }
      }
    }
  } catch {
    // If directory does not exist, return empty list
  }

  // Sort for stable UI
  entries.sort((a, b) => a.label.localeCompare(b.label));
  return entries;
}
