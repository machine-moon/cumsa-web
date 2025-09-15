import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export const metadata = { title: "Release Notes | CUMSA" };

function parseReleaseNotes(text: string) {
  const templateIdx = text.indexOf("\nvX.Y.Z");
  const mainText = templateIdx !== -1 ? text.slice(0, templateIdx) : text;
  const sections = mainText.split(/\nv(\d+\.\d+\.\d+) \((\d{4}-\d{2}-\d{2})\)\n[-]+\n/);
  const notes = [];
  for (let i = 1; i < sections.length; i += 3) {
    const version = sections[i];
    const date = sections[i + 1];
    const body = sections[i + 2];
    if (version && date && body) {
      const lines = body.split("\n").map((l) => l.trim());
      const author = lines.find((l) => l && !l.startsWith("-")) || "";
      notes.push({ version, date, author, body });
    }
  }
  return notes;
}

export default function ReleaseNotesPage() {
  let content = "";
  try {
    const filePath = path.join(process.cwd(), "Release_Notes.txt");
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    return notFound();
  }
  const notes = parseReleaseNotes(content);
  return (
    <div className="container-base py-10 max-w-3xl min-h-[80vh] bg-[var(--background)]">
      <h1 className="text-4xl font-extrabold mb-10 tracking-tight text-[var(--navy)]">
        Release Notes
      </h1>
      <div className="space-y-8">
        {notes.map((n) => (
          <section
            key={n.version}
            className="group transition-all duration-200 mb-0 rounded-2xl border border-black/10 bg-white/90 p-6 shadow hover:shadow-lg hover:border-[var(--blue)] hover:bg-white/100"
          >
            <div className="flex items-center mb-3 justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl font-bold text-[var(--blue)]">v{n.version}</span>
                {n.author && (
                  <span className="text-xs text-gray-700 font-semibold truncate">{n.author}</span>
                )}
              </div>
              <span className="text-xs text-gray-500 font-mono whitespace-nowrap">{n.date}</span>
            </div>
            <ul className="list-disc pl-6 text-gray-800 space-y-1 text-base">
              {n.body
                .split("\n")
                .filter((l) => l.trim().startsWith("-"))
                .map((l, i) => (
                  <li key={i}>{l.replace(/^\-\s*/, "")}</li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
