export const LINKS = {
  linktree:
    "https://linktr.ee/Carletonmsa?utm_source=linktree_profile_share&ltsid=86b6ac54-9966-4522-981f-6babdf7b9681",
  facebook: "https://www.facebook.com/CarletonMSA/",
  twitter: "https://twitter.com/carletonmsa?lang=en",
  instagram: "https://www.instagram.com/carletonmsa/?hl=en",
  discord: "https://discord.gg/GyV5tjQ5yw",
  youtube: "https://www.youtube.com/@carletonmsa",
  website: "/",
  donate: "/donate",
};

export const LOGOS = {
  main: "/CU-MSA-LOGO.png",
  fallback: "/CU-MSA-LOGO-blank.png",
  mask: "/CU-MSA-LOGO-blank.png",
} as const;

export const MOSQUES = [
  {
    name: "Ottawa Mosque (OMA)",
    address: "251 Northwestern Ave, Ottawa, ON",
    lat: 45.4039,
    lng: -75.7287,
    phone: "(613) 722-8763",
    website: "https://www.omaottawa.org/",
  },
  {
    name: "Masjid ar-Rahmah (AMA)",
    address: "1216 Hunt Club Rd, Ottawa, ON",
    lat: 45.3454,
    lng: -75.6457,
    phone: "(613) 523-9977",
    website: "https://www.amacanada.org/",
  },
  {
    name: "South Nepean Muslim Community (SNMC)",
    address: "3020 Woodroffe Ave, Nepean, ON",
    lat: 45.2883,
    lng: -75.7396,
    phone: "(613) 440-6300",
    website: "https://snmc.ca/",
  },
  {
    name: "Kanata Muslim Association (KMA)",
    address: "351 Sandhill Rd, Kanata, ON",
    lat: 45.3023,
    lng: -75.9167,
    phone: "(613) 973-5000",
    website: "https://kanatamuslims.ca/",
  },
  {
    name: "Centre Islamique de l’Outaouais (CIO)",
    address: "4 Rue Lois, Gatineau, QC",
    lat: 45.4286,
    lng: -75.7101,
    phone: "(819) 777-0114",
    website: "https://www.cio-qc.ca/",
  },
];

// Forms and submissions
export const FORMS = {
  newsletter:
    "https://docs.google.com/forms/d/e/1FAIpQLSee5KLKC4gycv5aJBtdSpTr8hQVNT5oVY3Jpo_M2dG9-QCOjQ/viewform",
  alumniNewsletter:
    "https://docs.google.com/forms/d/e/1FAIpQLSee1bKuvIEzoPqEX-Ne4oCB1auQmqftLRoejCzKkuonvA5BPQ/viewform?embedded=true",
  volunteerApplication:
    "https://docs.google.com/forms/d/e/1FAIpQLSelz_Ag6-8c5Fz5r0MqIC9urPbZrk5DLmHr_J8-ut0Cc3uJgw/viewform",
  revertsSignup:
    "https://docs.google.com/forms/d/1jAvnNH8jkEQgQM8B_mNBGPyhmyyQlyfjEwvneV7roBg/viewform?edit_requested=true",
};

// External API endpoints and headers
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const USER_AGENT = "Mozilla/5.0 CUMSA-Site/1.0";

// Chaplain contact (by appointment)
export const CHAPLAIN_EMAILS = {
  ahmed: "akhalil@macnet.ca",
  aisha: "aisha.sherazi@gmail.com",
};
