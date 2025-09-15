import { LINKS } from "@/lib/constants";

export const metadata = { title: "Documents | CUMSA" };
export default function DocumentsPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen py-12">
      <div className="container-base">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Documents</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access our foundational documents and resources
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <a
            href={LINKS.constitution}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 animate-slide-in-left hover:scale-[1.02]"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-[var(--blue)] transition-colors">
              Constitution
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Foundational document outlining our purpose, structure, responsibilities, and
              elections.
            </p>
            <span className="inline-flex items-center gap-2 text-[var(--blue)] font-semibold group-hover:gap-3 transition-all">
              Read More →
            </span>
          </a>
          <a
            href="https://docs.google.com/document/d/1nEDXwGm3eeO0vd2eKmP1idH8PeEZnXlo2HpWb06vF0w/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 animate-slide-in-right hover:scale-[1.02]"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-[var(--blue)] transition-colors">
              Coordinators & Committee Guidebook
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Comprehensive guide for coordinators and committee members of the Carleton University
              MSA.
            </p>
            <span className="inline-flex items-center gap-2 text-[var(--blue)] font-semibold group-hover:gap-3 transition-all">
              Read More →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
