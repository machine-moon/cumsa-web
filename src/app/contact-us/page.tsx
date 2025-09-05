export const metadata = { title: "Contact Us | CUMSA" };
import ContactForm from "./contact-form";
import SocialLinks from "@/components/SocialLinks";

export default function ContactUsPage() {
  return (
    <div className="container-base py-12">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold">General Inquiries</h2>
          <p className="mt-2">
            <a className="text-[var(--blue)]" href="mailto:info@cumsa.ca">
              info@cumsa.ca
            </a>
          </p>
          <div className="mt-4 text-gray-700">
            <p>Muslim Students’ Association</p>
            <p>Carleton University</p>
            <p>426 University Centre</p>
            <p>1125 Colonel By Drive</p>
            <p>Ottawa, ON K1S 5B6</p>
          </div>
          <SocialLinks className="mt-6 text-[var(--blue)]" />
        </section>
        <section>
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
