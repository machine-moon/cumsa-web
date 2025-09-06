import React from "react";

interface NewsletterEmbedProps {
  title: string;
  formUrl: string;
}

export default function NewsletterEmbed({ title, formUrl }: NewsletterEmbedProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-2 flex flex-col justify-center lg:pl-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-[var(--navy)]">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-3 flex justify-center lg:justify-end">
          <iframe
            src={formUrl}
            title={title}
            className="w-full max-w-md lg:max-w-lg"
            height="520"
            style={{ border: 0, borderRadius: 12 }}
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
