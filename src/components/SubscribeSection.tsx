"use client";
import NewsletterEmbed from "./NewsletterEmbed";

export default function SubscribeSection() {
  return (
    <div className="container-base py-16">
      <NewsletterEmbed
        title="Subscribe to the MSA Newsletter"
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSee1bKuvIEzoPqEX-Ne4oCB1auQmqftLRoejCzKkuonvA5BPQ/viewform?embedded=true"
      />
      <NewsletterEmbed
        title="Subscribe to the MSA Alumni/Community Newsletter"
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSee1bKuvIEzoPqEX-Ne4oCB1auQmqftLRoejCzKkuonvA5BPQ/viewform?embedded=true"
      />
    </div>
  );
}
