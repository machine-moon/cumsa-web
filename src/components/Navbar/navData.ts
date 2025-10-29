export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  //{ label: "Home", href: "/" },
  { label: "Donate", href: "/donate" },
  {
    label: "About Us",
    children: [
      { label: "About Us", href: "/about-us/about" },
      { label: "Land Acknowledgment", href: "/about-us/land-acknowledgement" },
      { label: "Documents", href: "/about-us/documents" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Prayer Services", href: "/services/prayer" },
      { label: "Chaplaincy Services", href: "/services/chaplaincy" },
      { label: "Resources", href: "/services/resources" },
    ],
  },
  {
    label: "Community",
    children: [{ label: "Local Mosques", href: "/community/local-mosques" }],
  },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact-us" },
];
