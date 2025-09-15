export const metadata = { title: "Contact Us | CUMSA" };
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ContactForm from "./contact-form";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen py-12 bg-[var(--background)]">
      <div className="container-base">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you! Reach out with any questions or just to say hello.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="card p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FaEnvelope className="mt-1 flex-shrink-0" style={{ color: "var(--blue)" }} />
                <div>
                  <a href="mailto:info@cumsa.ca" style={{ color: "var(--blue)" }}>
                    info@cumsa.ca
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" style={{ color: "var(--blue)" }} />
                <div>
                  <address className="text-gray-600 not-italic">
                    Muslim Students’ Association
                    <br />
                    Carleton University
                    <br />
                    426 University Centre
                    <br />
                    1125 Colonel By Drive
                    <br />
                    Ottawa, ON K1S 5B6
                  </address>
                </div>
              </div>
            </div>
          </section>

          <section className="card p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              Send us a Message
            </h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}
