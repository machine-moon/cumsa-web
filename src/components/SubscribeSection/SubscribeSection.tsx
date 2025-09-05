import NewsletterEmbed from "../NewsletterEmbed/NewsletterEmbed";

export default function SubscribeSection() {
  return (
    <section className="py-16 bg-[var(--surface)]">
      <div className="container-base max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Subscribe to our Newsletter</h2>
        <NewsletterEmbed />
      </div>
    </section>
  );
}
