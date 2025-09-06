import NewsletterEmbed from "../NewsletterEmbed/NewsletterEmbed";
import { FORMS } from "@/lib/constants";

export default function SubscribeSection() {
  return (
    <div className="container-base py-16">
      <NewsletterEmbed title="Subscribe to the MSA Newsletter" formUrl={FORMS.newsletter} />
    </div>
  );
}
