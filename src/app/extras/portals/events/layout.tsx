export const metadata = { title: "Events Portal | CUMSA" };

export default function EventsPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-start py-14 px-4">
      <div className="portal-glow w-full max-w-4xl">
        <div className="p-8 md:p-12">{children}</div>
      </div>
    </div>
  );
}
