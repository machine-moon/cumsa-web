import { FaBinoculars } from "react-icons/fa";

export const metadata = { title: "Links | CUMSA" };
export const dynamic = "force-dynamic";

const LINKTREE_URL =
  "https://linktr.ee/Carletonmsa?utm_source=linktree_profile_share&ltsid=86b6ac54-9966-4522-981f-6babdf7b9681";

const fallbackLinks: Array<{ name: string; url: string }> = [
  { name: "Discord", url: "https://discord.gg/GugaNUV" },
  { name: "Instagram", url: "https://www.instagram.com/carletonmsa/?hl=en" },
  { name: "Facebook", url: "https://www.facebook.com/CarletonMSA/" },
  { name: "YouTube", url: "https://www.youtube.com/@carletonmsa" },
  { name: "Website", url: "/" },
  { name: "Donate", url: "/donate" },
];

function stripTags(s: string) {
  return s
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function filterNoise(name: string, href: string) {
  const lower = name.toLowerCase();
  if (!href) return false;
  if (
    lower.includes("privacy") ||
    lower.includes("report") ||
    lower.includes("view on mobile") ||
    lower.includes("join carletonmsa")
  )
    return false;
  return true;
}

async function getLinks(): Promise<Array<{ name: string; url: string }>> {
  try {
    const res = await fetch(LINKTREE_URL, {
      cache: "no-store",
      headers: { "user-agent": "Mozilla/5.0 CUMSA-Site/1.0" },
    });
    if (!res.ok) throw new Error("bad status");
    const html = await res.text();
    const matches = Array.from(
      html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gim),
    );
    const raw = matches
      .map((m) => ({ url: m[1], name: stripTags(m[2]) }))
      .filter((x) => filterNoise(x.name, x.url))
      .filter((x) => /^(https?:)?\//.test(x.url) || x.url.startsWith("mailto:"));
    const dedup = Array.from(new Map(raw.map((x) => [x.url, x])).values());
    const prioritized = [
      "discord",
      "instagram",
      "facebook",
      "youtube",
      "donate",
      "website",
      "event",
      "whatsapp",
    ];
    dedup.sort((a, b) => {
      const pa = prioritized.findIndex((k) => a.name.toLowerCase().includes(k));
      const pb = prioritized.findIndex((k) => b.name.toLowerCase().includes(k));
      const ai = pa === -1 ? 999 : pa;
      const bi = pb === -1 ? 999 : pb;
      return ai - bi || a.name.localeCompare(b.name);
    });
    return dedup.length ? dedup : fallbackLinks;
  } catch {
    return fallbackLinks;
  }
}

export default async function LinksPage() {
  const links = await getLinks();
  return (
    <div className="container-base py-10">
      <div className="flex items-center gap-2">
        <FaBinoculars className="text-[var(--red)]" size={22} />
        <h1 className="text-3xl font-bold title">CU‑MSA Links</h1>
      </div>
      <p className="mt-3 text-gray-700">
        Explore our active links, socials, and forms. If any item is missing, open the Linktree
        directly.
      </p>

      <div className="mt-6 flex gap-3">
        <a
          href={LINKTREE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cozy btn-primary"
        >
          Open on Linktree
        </a>
        <a href="/contact-us" className="btn-cozy btn-outline">
          Questions? Contact us
        </a>
      </div>

      <section className="mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-black/10 rounded-lg overflow-hidden bg-white">
            <thead>
              <tr className="bg-black/5">
                <th className="p-3 border-b border-black/10">Name</th>
                <th className="p-3 border-b border-black/10">Link</th>
              </tr>
            </thead>
            <tbody>
              {links.map((l) => (
                <tr key={`${l.name}-${l.url}`} className="hover:bg-black/5 transition-base">
                  <td className="p-3 border-b border-black/10 font-medium">{l.name}</td>
                  <td className="p-3 border-b border-black/10">
                    <a
                      className="link-cta"
                      href={l.url.startsWith("/") ? l.url : l.url}
                      target={l.url.startsWith("/") ? undefined : "_blank"}
                      rel={l.url.startsWith("/") ? undefined : "noopener noreferrer"}
                    >
                      Visit →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Note: The Linktree embed is blocked by their site; we fetch links server-side instead.
        </p>
      </section>
    </div>
  );
}
