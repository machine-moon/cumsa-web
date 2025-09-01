export const metadata = { title: "Documents | CUMSA" };
export default function DocumentsPage() {
  return (
    <div className="container-base py-12">
      <h1 className="text-3xl font-bold">Documents</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <a
          href="https://cumsa.ca/wp-content/uploads/2014/12/CU-MSA-Constituton-May-2017.pdf"
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
          href="https://cumsa.ca/wp-content/uploads/2014/12/Director-Positions-2017-2018.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border rounded-xl p-6 hover:shadow-md transition-base no-underline"
        >
          <h2 className="text-xl font-semibold">Directors Guidebook</h2>
          <p className="mt-2 text-gray-700">
            In-depth overview of directors’ duties and CU‑MSA committees.
          </p>
          <span className="mt-3 inline-block link-cta">Read More →</span>
        </a>
      </div>
    </div>
  );
}
