import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ORCHARDS } from "../data/catalog";

const EASE = [0.65, 0, 0.35, 1];

const OrchardPhoto = ({ loc, className }) => (  <div className={`relative overflow-hidden ${className}`}>
    <img src={loc.image} alt={`Fotografie — ${loc.name}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    {loc.photoPending && (
      <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-[10px] uppercase tracking-[0.25em] text-ink/50">
        Fotografie bude doplněna
      </span>
    )}
  </div>
);

export const Orchards = () => {
  const [activeId, setActiveId] = useState(ORCHARDS.locations[0].id);
  const active = ORCHARDS.locations.find((l) => l.id === activeId);

  return (
    <section id="sady" data-testid="orchards-section" className="border-t border-ink/10 bg-sand px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/50"
        >
          02 · Sady
        </motion.p>

        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {ORCHARDS.title}
          </h2>
          <p className="max-w-sm font-serif text-lg font-light italic text-ink/60 sm:text-xl">{ORCHARDS.subtitle}</p>
        </div>

        {/* Desktop: mapa světa + boční panel */}
        <div className="hidden gap-10 lg:grid lg:grid-cols-5">
          <motion.div
            data-testid="orchard-map"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative aspect-[2/1] self-start overflow-hidden rounded-2xl border border-ink/15 bg-stone lg:col-span-3"
          >
            <img
              src="/assets/world-map.svg"
              alt="Mapa světa se sady Fruitiva"
              className="block h-auto w-full"
              draggable="false"
            />
            {ORCHARDS.locations.map((loc) => {
              const isActive = loc.id === activeId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  data-testid={`orchard-pin-${loc.id}`}
                  aria-label={loc.name}
                  onClick={() => setActiveId(loc.id)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${loc.pin.x}%`, top: `${loc.pin.y}%` }}
                >
                  <span
                    className={`map-pin block rounded-full bg-ink transition-all duration-300 group-hover:scale-125 ${
                      isActive ? "h-4 w-4" : "h-3 w-3 opacity-80"
                    }`}
                  />
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-stone transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {loc.name}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Boční panel s detailem vybraného sadu */}
          <div data-testid="orchard-detail" className="relative min-h-[420px] lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex h-full flex-col"
              >
                <OrchardPhoto loc={active} className="h-56 w-full rounded-2xl border border-ink/15" />
                <p data-testid="orchard-detail-place" className="mt-6 text-[11px] uppercase tracking-[0.3em] text-ink/45">
                  {active.place}
                </p>
                <h3 data-testid="orchard-detail-name" className="mt-2 font-serif text-3xl leading-tight tracking-tight">
                  {active.name}
                </h3>
                <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-ink/45">
                  Plodiny: <span data-testid="orchard-detail-crops" className="text-ink/80">{active.crops}</span>
                </p>
                <p data-testid="orchard-detail-text" className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
                  {active.text}
                </p>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobil: svislý seznam sadů se stejným obsahem */}
        <ul data-testid="orchard-list" className="space-y-14 lg:hidden">
          {ORCHARDS.locations.map((loc, i) => (
            <motion.li
              key={loc.id}
              data-testid={`orchard-card-${loc.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: EASE, delay: Math.min(i * 0.05, 0.2) }}
            >
              <OrchardPhoto loc={loc} className="h-52 w-full rounded-2xl border border-ink/15" />
              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-ink/45">{loc.place}</p>
              <h3 className="mt-1.5 font-serif text-2xl leading-tight tracking-tight">{loc.name}</h3>
              <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-ink/45">
                Plodiny: <span className="text-ink/80">{loc.crops}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{loc.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
