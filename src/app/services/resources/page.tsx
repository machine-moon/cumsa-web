"use client";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function ResourcesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="container-base py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        <motion.h1 variants={itemVariants} className="text-4xl font-bold text-[var(--navy)] mb-4">
          Resources & Support
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-10">
          Access to support services, emergency contacts, and resources for students at Carleton
          University and beyond.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border-2 border-blue-200"
        >
          <h2 className="text-2xl font-semibold text-[var(--navy)] mb-4">
            Key Questions to Consider
          </h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <strong>
                What should students do if they experience harassment or discrimination on campus?
              </strong>
              <p className="mt-1">
                Contact Campus Safety Services immediately or reach out to Equity and Inclusive
                Communities for support and guidance.
              </p>
            </div>
            <div>
              <strong>
                What legal or reporting options are there for students who experience threats off
                campus?
              </strong>
              <p className="mt-1">
                File a report with Ottawa Police (non-emergency: 613-236-1222) or contact NCCM for
                legal aid and incident reporting.
              </p>
            </div>
            <div>
              <strong>{"How can we as a community look out for each other's safety?"}</strong>
              <p className="mt-1">
                {
                  "Stay connected, use resources like Foot Patrol for safe walks, report incidents promptly, and support each other's mental and physical wellbeing."
                }
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-6 flex items-center gap-2">
            🏫 On-Campus Resources
          </h2>

          <div className="space-y-6">
            <ResourceCard
              title="Campus Safety Services (CSS)"
              icon={<FaPhone className="text-red-600" />}
            >
              <div className="space-y-2">
                <div>
                  <strong className="text-red-600">Emergencies:</strong>{" "}
                  <a
                    href="tel:6135204444"
                    className="text-[var(--blue)] hover:underline font-semibold"
                  >
                    613-520-4444
                  </a>
                  <span className="text-gray-600 ml-2">(ext. 4444 from campus phone)</span>
                </div>
                <div>
                  <strong>General Inquiries/Patrol Services (24/7):</strong>{" "}
                  <a href="tel:6135203612" className="text-[var(--blue)] hover:underline">
                    613-520-3612
                  </a>
                  <span className="text-gray-600 ml-2">(ext. 3612 from campus phone)</span>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <FaMapMarkerAlt className="text-gray-500 mt-1 flex-shrink-0" />
                  <span>203 Pigiarvik (ᐱᒋᐊᕐᕕᒃ) (formerly Robertson Hall)</span>
                </div>
                <div>
                  <strong>Assistance Phones:</strong> Located throughout campus and in elevators
                </div>
                <a
                  href="https://carleton.ca/safety/contact/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline mt-2"
                >
                  Visit Website <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>

            <ResourceCard
              title="Equity and Inclusive Communities"
              icon={<FaPhone className="text-[var(--blue)]" />}
            >
              <div className="space-y-2">
                <p className="text-gray-700 mb-3">
                  All students have the right to equal treatment and religious accommodation. EIC
                  promotes the Human Rights Code and supports students in exercising their rights.
                </p>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-gray-500" />
                  <a href="tel:6135205622" className="text-[var(--blue)] hover:underline">
                    613-520-5622
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" />
                  <a
                    href="mailto:equity@carleton.ca"
                    className="text-[var(--blue)] hover:underline"
                  >
                    equity@carleton.ca
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-gray-500 mt-1 flex-shrink-0" />
                  <span>Carleton Technology and Training Centre, Room 3800</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Hours:</strong> Monday to Friday, 8:30 a.m. - 4:30 p.m.
                </p>
                <a
                  href="http://carleton.ca/equity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline mt-2"
                >
                  Visit Website <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>

            <ResourceCard
              title="Health and Counselling Services"
              icon={<FaPhone className="text-green-600" />}
            >
              <div className="space-y-2">
                <div>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:6135206674" className="text-[var(--blue)] hover:underline">
                    613-520-6674
                  </a>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Hours:</strong> Monday to Friday, 8:30 a.m. - 4:30 p.m.
                </p>
                <a
                  href="http://carleton.ca/health/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline"
                >
                  Visit Website <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>

            <ResourceCard title="USC Foot Patrol" icon={<FaPhone className="text-purple-600" />}>
              <div className="space-y-2">
                <p className="text-gray-700">Safe walking service on campus</p>
                <div>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:6135204066" className="text-[var(--blue)] hover:underline">
                    613-520-4066
                  </a>
                </div>
                <a
                  href="http://www.cusaonline.ca/services/servicecentres/footpatrol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline"
                >
                  Visit Website <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>

            <ResourceCard title="Carleton MSA" icon={<FaEnvelope className="text-[var(--blue)]" />}>
              <div className="space-y-2">
                <div>
                  <strong>VP External:</strong>{" "}
                  <a
                    href="mailto:vpecumsa@gmail.com"
                    className="text-[var(--blue)] hover:underline"
                  >
                    vpecumsa@gmail.com
                  </a>
                </div>
                <a
                  href="https://tr.ee/vUuJ53MEve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline"
                >
                  Reporting Form <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>

            <ResourceCard
              title="Carleton University Student Association (CUSA)"
              icon={<FaEnvelope className="text-orange-600" />}
            >
              <div>
                <strong>VP Student Issues:</strong>{" "}
                <a href="mailto:vpsi@cusaonline.ca" className="text-[var(--blue)] hover:underline">
                  vpsi@cusaonline.ca
                </a>
              </div>
            </ResourceCard>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-6 flex items-center gap-2">
            🕌 Muslim & Community Support
          </h2>

          <div className="space-y-6">
            <ResourceCard
              title="National Council of Canadian Muslims (NCCM)"
              icon={<FaPhone className="text-green-700" />}
            >
              <div className="space-y-2">
                <p className="text-gray-700">
                  Hotline for Islamophobia, legal aid, and incident reporting
                </p>
                <div>
                  <strong>Hotline:</strong>{" "}
                  <a
                    href="tel:+18665240004"
                    className="text-[var(--blue)] hover:underline font-semibold"
                  >
                    1-866-524-0004
                  </a>
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@nccm.ca" className="text-[var(--blue)] hover:underline">
                    info@nccm.ca
                  </a>
                </div>
                <a
                  href="https://nccm.ca/report-an-incident/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline"
                >
                  Report an Incident <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>

            <ResourceCard title="Ruh Care" icon={<FaPhone className="text-teal-600" />}>
              <div className="space-y-2">
                <p className="text-gray-700">Mental health & counselling services</p>
                <div>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+14166395993" className="text-[var(--blue)] hover:underline">
                    1-416-639-5993
                  </a>
                </div>
                <a
                  href="https://www.ruhcare.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline"
                >
                  Visit Website <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>

            <ResourceCard
              title="Muslim Family Services Ottawa"
              icon={<FaPhone className="text-indigo-600" />}
            >
              <div className="space-y-2">
                <div>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:6135622273" className="text-[var(--blue)] hover:underline">
                    613-562-2273
                  </a>
                </div>
                <a
                  href="https://mfso.ca/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline"
                >
                  Visit Website <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-6 flex items-center gap-2">
            🚨 Off-Campus / External Emergency Services
          </h2>

          <div className="space-y-6">
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300">
              <p className="text-xl font-bold text-red-900 mb-2">
                For life-threatening emergencies or crimes in progress, call 911
              </p>
            </div>

            <ResourceCard title="Ottawa Police" icon={<FaPhone className="text-blue-800" />}>
              <div className="space-y-2">
                <div>
                  <strong>Non-Emergency:</strong>{" "}
                  <a href="tel:6132361222" className="text-[var(--blue)] hover:underline">
                    613-236-1222 ext. 7300
                  </a>
                  <p className="text-sm text-gray-600 ml-2">(7 days a week, 10 a.m. - 8:30 p.m.)</p>
                </div>
                <div>
                  <strong>Victim Crisis Unit:</strong>{" "}
                  <a href="tel:6132361222" className="text-[var(--blue)] hover:underline">
                    613-236-1222 ext. 5822
                  </a>
                </div>
                <div>
                  <strong>TTY (Deaf/Hard of Hearing):</strong>{" "}
                  <a href="tel:6137608100" className="text-[var(--blue)] hover:underline">
                    613-760-8100
                  </a>
                </div>
                <div className="mt-3 space-y-1">
                  <a
                    href="https://www.ottawapolice.ca/en/reports-and-requests/file-a-report.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline block"
                  >
                    File a Report Online <FaExternalLinkAlt className="text-sm" />
                  </a>
                  <a
                    href="https://www.ottawapolice.ca/modules/news/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline block"
                  >
                    Visit Website <FaExternalLinkAlt className="text-sm" />
                  </a>
                </div>
              </div>
            </ResourceCard>

            <ResourceCard
              title="Ottawa Distress Centre"
              icon={<FaPhone className="text-purple-700" />}
            >
              <div className="space-y-2">
                <p className="text-gray-700">24/7 crisis support</p>
                <div>
                  <strong>Crisis Line:</strong>{" "}
                  <a
                    href="tel:6132383311"
                    className="text-[var(--blue)] hover:underline font-semibold"
                  >
                    613-238-3311
                  </a>
                </div>
              </div>
            </ResourceCard>

            <ResourceCard title="Good2Talk Ontario" icon={<FaPhone className="text-green-600" />}>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Free confidential mental health support for post-secondary students
                </p>
                <div>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+18669255454"
                    className="text-[var(--blue)] hover:underline font-semibold"
                  >
                    1-866-925-5454
                  </a>
                </div>
                <a
                  href="https://good2talk.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline"
                >
                  Visit Website <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </ResourceCard>

            <ResourceCard
              title="Sexual Assault Support Centre of Ottawa"
              icon={<FaPhone className="text-pink-600" />}
            >
              <div>
                <strong>24/7 Crisis Line:</strong>{" "}
                <a
                  href="tel:6132342266"
                  className="text-[var(--blue)] hover:underline font-semibold"
                >
                  613-234-2266
                </a>
              </div>
            </ResourceCard>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-6 flex items-center gap-2">
            📱 Apps & Practical Tools
          </h2>

          <div className="space-y-6">
            <ResourceCard
              title="CHR Connect"
              icon={<FaExternalLinkAlt className="text-[var(--blue)]" />}
            >
              <div className="space-y-2">
                <p className="text-gray-700">Book appointments at Carleton Health Clinic</p>
                <div className="space-y-1">
                  <a
                    href="https://www.telus.com/en/health/health-professionals/clinics/collaborative-health-record/chr-connect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline block"
                  >
                    Download App <FaExternalLinkAlt className="text-sm" />
                  </a>
                  <a
                    href="https://chrconnect.telushealth.com/login/landing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--blue)] hover:underline block"
                  >
                    Web Login <FaExternalLinkAlt className="text-sm" />
                  </a>
                </div>
              </div>
            </ResourceCard>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ResourceCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-[var(--navy)] mb-3 flex items-center gap-3">
        {icon}
        {title}
      </h3>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
