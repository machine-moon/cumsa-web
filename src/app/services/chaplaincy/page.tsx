export const metadata = { title: "Chaplaincy Services | CUMSA" };
import Image from "next/image";
import { CHAPLAIN_EMAILS } from "@/lib/constants";
import { CHAPLAINCY_GOOGLE_FORM_URL } from "@/lib/constants";

type Chaplain = {
  name: string;
  photo: string;
  bio: string;
};

const CHAPLAINS: Chaplain[] = [
  {
    name: "Imam Ahmed Khalil",
    photo: "/ahmed_khalil.jpg",
    bio: "Ahmed Khalil is a second generation Canadian Muslim, inspirational speaker, imam, and da'wah coordinator. He serves as imam and khateeb of the MAC Islamic Centre in Ottawa, ON. He has more than 20 years of experience in da'wah and Islamic activism. He has a B.Eng. in Computer Engineering from Carleton University, where he served with the MSA. He also has a diploma in Film Production from Vancouver, integrating da'wah through media. He has a diploma in Shariah and Islamic Studies from Samaha Academy under Sheikh Jasim Muhalhal Al-Yaseen and another from Zad Academy under Sheikh Muhammad Saleh Al-Munajjid. Currently pursuing a diploma in Shafi'i Fiqh. He is an avid reader, student of knowledge, and father of three.",
  },
  {
    name: "Dr. Aisha Sherazi",
    photo: "/aisha_sherazi.jpg",
    bio: "Originally a biologist, Dr. Aisha Sherazi was born and raised in the UK and migrated to Ottawa in 2000. She is the former Principal of MAC's Abraar School and helped pioneer the Al-Furqan middle school Qur'an memorization program. She is a Spiritual Care Worker at Merivale High School and works with a Muslim Leaders Working Group liaising with the Ottawa Carleton District School Board. She sits on the Board of Directors for the Ottawa Boys and Girls Club and chairs the Joint Committee for the Ottawa Muslim Association. She writes editorials and presents workshops, including youth bias and stereotypes sessions with Rabbi Mendel Blum. She lives in a four generation home in Ottawa and is married with two children.",
  },
];

export default function ChaplaincyServicesPage() {
  return (
    <div className="container-base py-12">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">Chaplaincy Services</h1>
        <p className="mt-4 text-gray-700 max-w-3xl">
          We aim to provide a safe, inclusive environment to seek mentorship, counselling, and
          guidance. Our chaplains combine lived experience with formal training to support Muslim
          students spiritually, emotionally, and intellectually.
        </p>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {CHAPLAINS.map((c, index) => (
          <article
            key={c.name}
            className={`rounded-lg border border-black/10 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 ${
              index === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="relative w-28 h-28 rounded-md overflow-hidden ring-1 ring-black/10 flex-shrink-0 hover:ring-blue-300 transition-colors">
                <Image src={c.photo} alt={c.name} fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{c.name}</h2>
                {c.name.includes("Ahmed") && (
                  <p className="text-sm mt-1">
                    <a className="link-cta" href={`mailto:${CHAPLAIN_EMAILS.ahmed}`}>
                      {CHAPLAIN_EMAILS.ahmed}
                    </a>
                  </p>
                )}
                {c.name.includes("Aisha") && (
                  <p className="text-sm mt-1">
                    <a className="link-cta" href={`mailto:${CHAPLAIN_EMAILS.aisha}`}>
                      {CHAPLAIN_EMAILS.aisha}
                    </a>
                  </p>
                )}
              </div>
            </div>
            <p className="mt-4 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {c.bio}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-10 text-sm text-gray-600 animate-fade-in">
        By appointment only — email directly to request a meeting.
      </div>

      <a href={CHAPLAINCY_GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
          Fill out the Chaplaincy Request Form
      </a>

    </div>
  );
}
