export const metadata = { title: "Chaplaincy Services | CUMSA" };
import Image from "next/image";

type Chaplain = {
  name: string;
  photo: string;
  bio: string;
  title: string;
};

const CHAPLAINS: Chaplain[] = [
  {
    name: "Imam Ahmed Khalil",
    title: "Imam & Da'wah Coordinator",
    photo: "/ahmed_khalil.jpg",
    bio: "Ahmed Khalil is a second generation Canadian Muslim, inspirational speaker, imam, and da'wah coordinator. He serves as imam and khateeb of the MAC Islamic Centre in Ottawa, ON. He has more than 20 years of experience in da'wah and Islamic activism. He has a B.Eng. in Computer Engineering from Carleton University, where he served with the MSA. He also has a diploma in Film Production from Vancouver, integrating da'wah through media. He has a diploma in Shariah and Islamic Studies from Samaha Academy under Sheikh Jasim Muhalhal Al-Yaseen and another from Zad Academy under Sheikh Muhammad Saleh Al-Munajjid. Currently pursuing a diploma in Shafi'i Fiqh. He is an avid reader, student of knowledge, and father of three.",
  },
  {
    name: "Dr. Aisha Sherazi",
    title: "Spiritual Care Worker & Educator",
    photo: "/aisha_sherazi.jpg",
    bio: "Originally a biologist, Dr. Aisha Sherazi was born and raised in the UK and migrated to Ottawa in 2000. She is the former Principal of MAC's Abraar School and helped pioneer the Al-Furqan middle school Qur'an memorization program. She is a Spiritual Care Worker at Merivale High School and works with a Muslim Leaders Working Group liaising with the Ottawa Carleton District School Board. She sits on the Board of Directors for the Ottawa Boys and Girls Club and chairs the Joint Committee for the Ottawa Muslim Association. She writes editorials and presents workshops, including youth bias and stereotypes sessions with Rabbi Mendel Blum. She lives in a four generation home in Ottawa and is married with two children.",
  },
];

export default function ChaplaincyServicesPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50/30 to-white min-h-screen py-16">
      <div className="container-base">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--navy)] mb-4">
              Chaplaincy Services
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We provide a safe, inclusive environment for mentorship, counselling, and spiritual
              guidance. Our chaplains combine lived experience with formal training to support
              Muslim students spiritually, emotionally, and intellectually.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {CHAPLAINS.map((c, index) => (
              <article
                key={c.name}
                className={`rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                  index === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100 mb-4 hover:ring-[var(--blue)] transition-all">
                    <Image src={c.photo} alt={c.name} fill className="object-cover" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--navy)]">{c.name}</h2>
                  <p className="text-sm text-[var(--blue)] font-medium mt-1 mb-4">{c.title}</p>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{c.bio}</p>
              </article>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center shadow-md border border-blue-100 animate-fade-in">
            <p className="text-lg text-gray-800 mb-4">By appointment only</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc-AxOb8ThFcEOVQFe8B4x_G3riq6jv_cMLhJvIyxsGt3mlcA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--blue)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--navy)] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Request an Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
