import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/10">
      <div className="bg-white">
        <div className="container-base py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="logo-mask-blue rounded-sm"
              style={{ width: 28, height: 28 }}
            />
            <div className="text-sm text-gray-700">
              <div>
                <a className="hover:underline" href="mailto:info@cumsa.ca">
                  info@cumsa.ca
                </a>
              </div>
              <div>© {new Date().getFullYear()} CUMSA</div>
            </div>
          </div>
          <SocialLinks className="text-[var(--navy)]" />
        </div>
      </div>
    </footer>
  );
}
