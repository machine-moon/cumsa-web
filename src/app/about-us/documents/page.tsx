import { LINKS } from "@/lib/constants";

export const metadata = { title: "Documents | CUMSA" };
export default function DocumentsPage() {
  return (
    <div className="container-base py-12">
      <h1 className="text-3xl font-bold">Documents</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <a
          href={LINKS.constitution}
          target="_blank"
          rel="noopener noreferrer"
          className="border rounded-xl p-6 hover:shadow-md transition-base no-underline"
        >
          <h2 className="text-xl font-semibold">Constitution</h2>
          <p className="mt-2 text-gray-700">
            Foundational document outlining our purpose, structure, responsibilities, and elections.
          </p>
          <span className="mt-3 inline-block link-cta">Read More →</span>
        </a>
        <a
          href="https://docs.google.com/document/d/1nEDXwGm3eeO0vd2eKmP1idH8PeEZnXlo2HpWb06vF0w/edit?tab=t.0"
          target="_blank"
          rel="noopener noreferrer"
          className="border rounded-xl p-6 hover:shadow-md transition-base no-underline"
        >
          <h2 className="text-xl font-semibold">Coordinators & Committee Guidebook</h2>
          <p className="mt-2 text-gray-700">
            Comprehensive guide for coordinators and committee members of the Carleton University
            MSA.
          </p>
          <span className="mt-3 inline-block link-cta">Read More →</span>
        </a>
      </div>
    </div>
  );
}
