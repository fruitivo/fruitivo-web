import { FOOTER } from "../data/catalog";

export const Footer = () => (
  <footer id="kontakt" data-testid="footer-section" className="relative bg-ink text-stone grain px-5 sm:px-10 pt-24 sm:pt-32 pb-10 overflow-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <p className="text-[11px] tracking-[0.35em] uppercase font-semibold text-stone/50 mb-6">05 · Kontakt</p>

      <h2 className="font-serif tracking-tight leading-[1.05] text-4xl sm:text-6xl lg:text-7xl max-w-3xl mb-20">
        {FOOTER.statement.split("živé zemi.")[0]}
        <em className="font-light">živé zemi.</em>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-stone/15 pt-12 mb-20">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone/40 mb-4">Napište nám</p>
          <a
            data-testid="footer-email-link"
            href={`mailto:${FOOTER.email}`}
            className="font-serif text-xl sm:text-2xl underline-offset-4 hover:italic hover:underline transition-all"
          >
            {FOOTER.email}
          </a>
          <p className="mt-3 text-sm text-stone/60">{FOOTER.phone}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone/40 mb-4">Sídlo</p>
          <p className="text-sm leading-relaxed text-stone/70">{FOOTER.address}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone/40 mb-4">Sledujte nás</p>
          {/* TODO(SOCIAL): doplnit reálné odkazy na sociální sítě */}
          <ul className="space-y-2">
            {FOOTER.socials.map((s) => (
              <li key={s}>
                <a
                  data-testid={`footer-social-${s.toLowerCase()}`}
                  href="#kontakt"
                  className="text-sm text-stone/70 hover:text-stone hover:italic transition-all"
                >
                  {s} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="font-serif text-outline-stone text-[18vw] leading-[0.8] text-center select-none pointer-events-none -mb-4"
      >
        KOŘENY
      </p>

      <div className="border-t border-stone/15 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[11px] tracking-[0.15em] uppercase text-stone/40">
        <span>{FOOTER.copyright}</span>
        <span>Obnovená půda · Čisté ovoce</span>
      </div>
    </div>
  </footer>
);
