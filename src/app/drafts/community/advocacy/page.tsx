"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaExternalLinkAlt, FaHandsHelping, FaTimes } from "react-icons/fa";

type Crisis = {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  history: string;
  learnMoreLinks: { label: string; url: string }[];
  stayUpdatedLinks: { label: string; url: string }[];
  whatYouCanDo: {
    dua: string;
    actions: string[];
    donationLinks?: { label: string; url: string }[];
  };
};

const crises: Crisis[] = [
  {
    id: "palestine",
    title: "Palestine",
    emoji: "🇵🇸",
    summary:
      "Palestinians face ongoing occupation, displacement, and humanitarian crisis in Gaza and the West Bank.",
    history:
      "Since 1948, Palestinians have experienced displacement and occupation. The situation intensified with the blockade of Gaza beginning in 2007, creating one of the world's most densely populated areas with severe restrictions on movement, trade, and access to basic necessities. Recent escalations have resulted in thousands of civilian casualties and widespread destruction of homes, schools, and hospitals.",
    learnMoreLinks: [
      {
        label: "Al Jazeera Palestine Coverage",
        url: "https://www.aljazeera.com/where/palestine/",
      },
      { label: "UN OCHA Palestine", url: "https://www.ochaopt.org/" },
      {
        label: "Human Rights Watch - Palestine",
        url: "https://www.hrw.org/middle-east/north-africa/israel/palestine",
      },
    ],
    stayUpdatedLinks: [
      { label: "Middle East Eye", url: "https://www.middleeasteye.net/countries/palestine" },
      { label: "The Electronic Intifada", url: "https://electronicintifada.net/" },
    ],
    whatYouCanDo: {
      dua: "Make dua for the oppressed and for justice to prevail.",
      actions: [
        "Educate yourself and others about the historical context",
        "Amplify Palestinian voices and stories on social media",
        "Support BDS (Boycott, Divestment, Sanctions) initiatives",
        "Contact your local representatives to advocate for policy changes",
        "Attend solidarity events and peaceful protests",
      ],
      donationLinks: [
        { label: "Islamic Relief - Palestine Emergency", url: "https://www.islamicrelief.ca/" },
        { label: "UNRWA - Palestine Refugees", url: "https://www.unrwa.org/" },
        { label: "Medical Aid for Palestinians", url: "https://www.map.org.uk/" },
      ],
    },
  },
  {
    id: "sudan",
    title: "Sudan",
    emoji: "🇸🇩",
    summary:
      "Sudan faces a devastating civil war causing mass displacement, famine, and humanitarian catastrophe.",
    history:
      "Since April 2023, Sudan has been engulfed in a brutal civil war between the Sudanese Armed Forces and the Rapid Support Forces. The conflict has resulted in tens of thousands of deaths, millions displaced, and widespread reports of atrocities including ethnic cleansing, sexual violence, and attacks on civilians. The humanitarian crisis has left over 25 million people in need of assistance, with famine conditions in multiple regions.",
    learnMoreLinks: [
      { label: "Al Jazeera Sudan Coverage", url: "https://www.aljazeera.com/where/sudan/" },
      { label: "UN OCHA Sudan", url: "https://www.unocha.org/sudan" },
      {
        label: "Human Rights Watch - Sudan",
        url: "https://www.hrw.org/africa/sudan",
      },
    ],
    stayUpdatedLinks: [
      { label: "Sudan Tribune", url: "https://sudantribune.com/" },
      { label: "Radio Dabanga", url: "https://www.dabangasudan.org/en" },
    ],
    whatYouCanDo: {
      dua: "Make dua for peace, safety, and relief for the Sudanese people.",
      actions: [
        "Raise awareness about the crisis through social media",
        "Support Sudanese-led organizations and initiatives",
        "Contact government representatives to advocate for humanitarian aid",
        "Host or attend fundraising events for Sudan relief",
        "Share verified information to combat misinformation",
      ],
      donationLinks: [
        { label: "Islamic Relief - Sudan Emergency", url: "https://www.islamicrelief.ca/" },
        { label: "UNICEF Sudan", url: "https://www.unicef.org/sudan" },
        { label: "Doctors Without Borders - Sudan", url: "https://www.msf.org/sudan" },
      ],
    },
  },
  {
    id: "China",
    title: "China",
    emoji: "🇨🇳",
    summary:
      "Uyghur Muslims face systematic persecution, mass detention, and cultural genocide in Xinjiang.",
    history:
      "Since 2017, an estimated 1-3 million Uyghurs and other Muslim minorities have been detained in what China calls 're-education camps' in the Xinjiang region. Reports from survivors, leaked documents, and investigations reveal forced labor, torture, forced sterilization, separation of families, destruction of mosques, and systematic attempts to erase Uyghur culture and Islamic practices. Multiple governments and organizations have labeled these actions as crimes against humanity and genocide.",
    learnMoreLinks: [
      {
        label: "Uyghur Human Rights Project",
        url: "https://uhrp.org/",
      },
      {
        label: "Amnesty International - Uyghurs",
        url: "https://www.amnesty.org/en/latest/news/2021/06/china-draconian-repression-of-muslims-in-xinjiang-amounts-to-crimes-against-humanity/",
      },
      {
        label: "BBC Uyghur Investigation",
        url: "https://www.bbc.com/news/world-asia-china-22278037",
      },
    ],
    stayUpdatedLinks: [
      { label: "Uyghur Human Rights Project News", url: "https://uhrp.org/news/" },
      { label: "World Uyghur Congress", url: "https://www.uyghurcongress.org/en/" },
    ],
    whatYouCanDo: {
      dua: "Make dua for the Uyghur Muslims facing persecution and for their freedom.",
      actions: [
        "Educate others about the Uyghur crisis",
        "Avoid products linked to forced labor in Xinjiang",
        "Support Uyghur advocacy organizations",
        "Pressure companies and governments to take action",
        "Amplify Uyghur voices and testimonies",
      ],
      donationLinks: [
        { label: "PlaceHolder", url: "https://cumsa.ca/donate/" },
        { label: "PlaceHolder", url: "https://cumsa.ca/donate/" },
      ],
    },
  },
  {
    id: "egypt",
    title: "Egypt",
    emoji: "🇪🇬",
    summary:
      "Egyptians face authoritarian rule, mass political imprisonment, and severe restrictions on freedoms.",
    history:
      "Since the 2013 military coup, Egypt has experienced severe crackdowns on dissent under President Abdel Fattah el-Sisi's government. Tens of thousands of political prisoners, including students, journalists, human rights defenders, and peaceful protesters, have been detained. Many face torture, enforced disappearances, and unfair trials. The government has enacted repressive laws severely restricting freedom of expression, assembly, and association. Human rights organizations document systematic violations including extrajudicial killings and inhumane prison conditions.",
    learnMoreLinks: [
      {
        label: "Human Rights Watch - Egypt",
        url: "https://www.hrw.org/middle-east/n-africa/egypt",
      },
      {
        label: "Amnesty International - Egypt",
        url: "https://www.amnesty.org/en/location/middle-east-and-north-africa/egypt/",
      },
      { label: "Freedom House - Egypt", url: "https://freedomhouse.org/country/egypt" },
    ],
    stayUpdatedLinks: [
      { label: "Mada Masr", url: "https://www.madamasr.com/en" },
      { label: "Egyptian Initiative for Personal Rights", url: "https://eipr.org/en" },
    ],
    whatYouCanDo: {
      dua: "Make dua for those imprisoned unjustly and for justice to prevail in Egypt.",
      actions: [
        "Raise awareness about human rights violations in Egypt",
        "Support Egyptian human rights organizations",
        "Advocate for political prisoners through campaigns",
        "Contact representatives about human rights concerns in Egypt",
        "Share stories of those affected by repression",
      ],
      donationLinks: [
        {
          label: "Placeholder",
          url: "https://cumsa.ca/donate/",
        },
        { label: "Placeholder", url: "https://cumsa.ca/donate/" },
      ],
    },
  },
];

export default function AdvocacyPage() {
  const [selectedCrisis, setSelectedCrisis] = useState<Crisis | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] via-[var(--navy)] to-[var(--blue)]/80" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="relative container-base py-16 md:py-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Standing in Solidarity
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
              As the Muslim Student Association, we stand in unwavering solidarity with our brothers
              and sisters who face oppression and injustice around the world.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-white/95 text-base md:text-lg italic leading-relaxed">
                &ldquo;And what is [the matter] with you that you fight not in the cause of Allāh
                and [for] the oppressed among men, women and children who say, &ldquo;Our Lord, take
                us out of this city of oppressive people and appoint for us from Yourself a
                protector and appoint for us from Yourself a helper&rdquo;
              </p>
              <p className="text-white/80 mt-3 text-sm">— Quran 4:75 (Saheeh International)</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-base py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={cardVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Current Crises</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn about ongoing situations affecting Muslim communities worldwide and discover how
              you can make a difference.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-16">
            {crises.map((crisis) => (
              <motion.div key={crisis.id} variants={cardVariants}>
                <CrisisCard crisis={crisis} onClick={() => setSelectedCrisis(crisis)} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedCrisis && (
        <CrisisModal crisis={selectedCrisis} onClose={() => setSelectedCrisis(null)} />
      )}
    </div>
  );
}

function CrisisCard({ crisis, onClick }: { crisis: Crisis; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[var(--blue)] hover:scale-[1.02] group"
    >
      <div className="flex items-start gap-4">
        <div className="text-5xl flex-shrink-0">{crisis.emoji}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-[var(--navy)] mb-2 group-hover:text-[var(--blue)] transition-colors">
            {crisis.title}
          </h3>
          <p className="text-gray-600 mb-4">{crisis.summary}</p>
          <div className="flex items-center text-[var(--blue)] font-medium group-hover:gap-2 transition-all">
            Learn more <FaExternalLinkAlt className="ml-2 text-sm" />
          </div>
        </div>
      </div>
    </button>
  );
}

function CrisisModal({ crisis, onClose }: { crisis: Crisis; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[var(--navy)] to-[var(--blue)] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{crisis.emoji}</span>
            <h2 className="text-3xl font-bold">{crisis.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <section>
            <h3 className="text-2xl font-bold text-[var(--navy)] mb-3 flex items-center gap-2">
              📖 Background & History
            </h3>
            <p className="text-gray-700 leading-relaxed">{crisis.history}</p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
              🔗 Learn More
            </h3>
            <div className="space-y-3">
              {crisis.learnMoreLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--blue)] hover:underline hover:gap-3 transition-all p-3 rounded-lg hover:bg-blue-50"
                >
                  <FaExternalLinkAlt className="flex-shrink-0" />
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
              📰 Stay Updated
            </h3>
            <div className="space-y-3">
              {crisis.stayUpdatedLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--blue)] hover:underline hover:gap-3 transition-all p-3 rounded-lg hover:bg-blue-50"
                >
                  <FaExternalLinkAlt className="flex-shrink-0" />
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
              <FaHandsHelping className="text-green-600" />
              What You Can Do
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg text-[var(--navy)] mb-2">🤲 Make Dua</h4>
                <p className="text-gray-700 italic">{crisis.whatYouCanDo.dua}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-[var(--navy)] mb-3">✊ Take Action</h4>
                <ul className="space-y-2">
                  {crisis.whatYouCanDo.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {crisis.whatYouCanDo.donationLinks && (
                <div>
                  <h4 className="font-semibold text-lg text-[var(--navy)] mb-3">💚 Donate</h4>
                  <div className="space-y-2">
                    {crisis.whatYouCanDo.donationLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[var(--blue)] hover:underline hover:gap-3 transition-all p-3 rounded-lg hover:bg-white font-medium"
                      >
                        <FaExternalLinkAlt className="flex-shrink-0" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
