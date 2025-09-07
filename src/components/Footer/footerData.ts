export type SecretLink = { label: string; href: string; external?: boolean };
export type SecretGroup = { label: string; links: SecretLink[] };
export type SecretSection = {
  title: string;
  links?: SecretLink[];
  groups?: SecretGroup[];
};

export const SECRET_SECTIONS: SecretSection[] = [
  {
    title: "",
    links: [{ label: "Release Notes", href: "/extras/release-notes" }],
  },
  {
    title: "Pages Drafts",
    groups: [
      {
        label: "About Us",
        links: [{ label: "Gallery", href: "/about-us/gallery" }],
      },
      {
        label: "Services",
        links: [
          { label: "New Muslims", href: "/services/new-muslims" },
          { label: "Roommate Services", href: "/services/roommate" },
          { label: "Mental Health", href: "/services/mental-health" },
        ],
      },
    ],
  },
];
