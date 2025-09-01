export const metadata = { title: "Equity Services | CUMSA" };
export default function EquityServicesPage() {
  return (
    <div className="container-base py-12">
      <h1 className="text-3xl font-bold">About Equity Services</h1>
      <p className="mt-4 text-gray-700">
        All students have the right to equal treatment and religious accommodation. Carleton’s
        Equity Services promotes the Human Rights Code and supports students in exercising their
        rights.
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">How to Contact Equity Services</h2>
        <p className="mt-2 text-gray-700">
          If you have questions or believe you’ve been discriminated against, reach out to Equity
          Services for assistance.
        </p>
        <div className="mt-3 text-gray-700">
          <p>
            <strong>Phone:</strong> (613) 520‑5622
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a className="text-[var(--blue)]" href="mailto:equity@carleton.ca">
              equity@carleton.ca
            </a>
          </p>
          <p className="mt-2">
            <strong>Office:</strong> Room 503 Robertson Hall, Carleton University
          </p>
        </div>
      </div>
    </div>
  );
}
