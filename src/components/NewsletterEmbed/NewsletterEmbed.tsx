export default function NewsletterEmbed() {
  return (
    <div className="rounded-xl overflow-hidden shadow ring-1 ring-black/10 bg-white p-4">
      <iframe
        src="https://embeds.beehiiv.com/1b1e2e2b-2e2e-4e2e-8e2e-2e2e2e2e2e2e?slim=true"
        style={{ width: "100%", minHeight: 320, border: "none", background: "transparent" }}
        title="Newsletter Signup"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
