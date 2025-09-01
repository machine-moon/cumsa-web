import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string }[];
  image?: { src: string; alt: string };
  overlay?: boolean;
};

export default function Hero({ title, subtitle, cta, image, overlay = true }: Props) {
  return (
    <section className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image src={image.src} alt={image.alt} fill priority className="object-cover" />
          {overlay && <div className="absolute inset-0 bg-[var(--navy)]/60" />}
        </div>
      )}
      <div className={`container-base ${image ? "py-24 md:py-32" : "py-12 md:py-16"} text-white`}>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-white/85 text-lg">{subtitle}</p>}
        {cta && cta.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {cta.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="px-5 py-2.5 rounded-md bg-[var(--blue)] text-white transition-base hover:opacity-90"
              >
                {c.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
