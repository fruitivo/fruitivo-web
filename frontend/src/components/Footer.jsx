import { FOOTER } from "../data/catalog";

export const Footer = () => (
  <footer id="kontakt" data-testid="footer-section" className="grain relative overflow-hidden bg-ink px-5 pb-10 pt-24 text-stone sm:px-10 sm:pt-32">
    <div className="relative z-10 mx-auto max-w-6xl">
      <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-stone/50">05 · Kontakt</p>

      <h2 className="mb-20 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        {FOOTER.statement.split("živé zemi.")[0]}
        <em className="font-light">živé zemi.</em>
      </h2>

      <div className="mb-20 grid grid-cols-1 gap-12 border-t border-stone/15 pt-12 sm:grid-cols-3">
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-stone/40">Napište nám</p>
          <a
            data-testid="footer-email-link"
            href={`mailto:${FOOTER.email}`}
            className="font-serif text-xl underline-offset-4 transition-all hover:italic hover:underline sm:text-2xl"
          >
            {FOOTER.email}
          </a>
          <p className="mt-3 text-sm text-stone/60">{FOOTER.phone}</p>
        </div>
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-stone/40">Sídlo</p>
          <p className="text-sm leading-relaxed text-stone/70">{FOOTER.address}</p>
        </div>
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-stone/40">Sledujte nás</p>
          {/* TODO(SOCIAL): doplnit reálné odkazy na sociální sítě */}
          <ul className="space-y-2">
            {FOOTER.socials.map((s) => (
              <li key={s}>
                <a
                  data-testid={`footer-social-${s.toLowerCase()}`}
                  href="#kontakt"
                  className="text-sm text-stone/70 transition-all hover:italic hover:text-stone"
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
        className="text-outline-stone pointer-events-none -mb-4 select-none text-center font-display uppercase leading-[0.8] text-[26vw]"
      >
        XXX
      </p>
      <div className="flex flex-col justify-between gap-3 border-t border-stone/15 pt-6 text-[11px] uppercase tracking-[0.15em] text-stone/40 sm:flex-row">
        <span>{FOOTER.copyright}</span>
        <span>Obnovená půda · Čisté ovoce</span>
      </div>
    </div>
  </footer>
);
