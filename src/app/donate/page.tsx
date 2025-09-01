export const metadata = { title: "Donate | CUMSA" };

export default function DonatePage() {
  return (
    <div className="container-base py-12">
      <h1 className="text-3xl font-bold">Donate</h1>
      <p className="mt-3 text-gray-700 max-w-2xl">
        Your support sustains student-led programs, prayer services, and community initiatives.
        JazakumAllahu khairan for contributing.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#" className="btn-cozy btn-primary">
          Donate Monthly
        </a>
        <a href="#" className="btn-cozy btn-outline">
          One-time Donation
        </a>
      </div>
      <p className="mt-6 text-sm text-gray-600">TODO.</p>
    </div>
  );
}
