export const metadata = { title: "Join Us | CUMSA" };
import NewsletterEmbed from "../NewsletterEmbed/NewsletterEmbed";
import { FORMS, LINKS } from "@/lib/constants";

export default function JoinUs() {
  return (
    <div className="container-base py-12 flex flex-col gap-12 items-center">
      <div
        className="w-full max-w-6xl rounded-xl shadow p-10 flex flex-col gap-8 items-center md:px-20 sm:px-6"
        style={{ background: "#E6F5F8", boxShadow: "0 2px 24px 0 #2fbcd9ff" }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-[var(--blue)] mb-2">
          Want to be part of our MSA family?
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl">
          Whether you want to{" "}
          <span className="font-semibold text-[var(--red)]">
            lead, help out, or just stay in the loop
          </span>
          , we would love to have you.
          <br />
          Join our council, subscribe to our newsletter, or join our Discord. Choose what feels
          right for you.
        </p>
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
          <a
            href={FORMS.volunteerApplication}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full bg-[var(--blue)] text-white font-semibold text-lg shadow transition hover:opacity-90 min-w-[220px] text-center"
          >
            Become a Council Member
          </a>
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full bg-[var(--red)] text-white font-semibold text-lg shadow transition hover:opacity-90 min-w-[220px] text-center"
          >
            Join our Discord
          </a>
        </div>
        <div className="w-full flex flex-col items-center mt-6">
          <h2 className="text-2xl font-bold text-[var(--blue)] mb-2">Stay in the Loop</h2>
          <p className="text-center text-gray-700 mb-4 max-w-lg">
            Get the latest on events, prayer times, and more. No spam, just good vibes sent to your
            inbox every week.
          </p>
          <div className="w-full max-w-2xl">
            <NewsletterEmbed title="Subscribe to the MSA Newsletter" formUrl={FORMS.newsletter} />
          </div>
        </div>
      </div>
    </div>
  );
}
