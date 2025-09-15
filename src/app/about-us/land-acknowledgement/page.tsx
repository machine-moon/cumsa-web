export const metadata = { title: "Land Acknowledgment | CUMSA" };
export default function LandAcknowledgementPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen py-12">
      <div className="container-base">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Land Acknowledgement
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 animate-slide-in-left">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              As Muslims committed to justice, we recognize that we live, learn, and worship on the
              unceded, unsurrendered territory of the Algonquin nation. We affirm our responsibility
              to support Indigenous self-determination and to work toward justice in word and deed.
            </p>
            <div className="space-y-6 text-lg text-gray-700 animate-slide-in-right">
              <p>
                We remember the Qur’anic call to stand firm for justice (
                <a
                  href="https://quran.com/an-nisa/135"
                  className="link-cta no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  4:135
                </a>
                ) and the Prophetic teachings against oppression. We ask God to help us uphold these
                commitments and to work in solidarity with the Algonquin people.
              </p>
              <p className="text-2xl font-semibold text-[var(--blue)]">Ameen.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
