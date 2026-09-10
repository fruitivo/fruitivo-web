import { motion } from "framer-motion";
import { ORCHARDS } from "../data/catalog";

const EASE = [0.65, 0, 0.35, 1];

export const Orchards = () => (
  <section id="sady" data-testid="orchards-section" className="bg-sand px-5 sm:px-10 py-28 sm:py-40 border-t border-ink/10">
    <div className="max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-[11px] tracking-[0.35em] uppercase font-semibold text-ink/50 mb-6"
      >
        02 · Sady
      </motion.p>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
        <h2 className="font-serif tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl">
          {ORCHARDS.title}
        </h2>
        <p className="font-serif italic font-light text-ink/60 text-lg sm:text-xl max-w-sm">{ORCHARDS.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* TODO(MAP): zástupný blok — zde bude interaktivní mapa obnovených území */}
        <motion.div
          data-testid="orchard-map-placeholder"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-dashed border-ink/30 min-h-[380px]"
        >
          <img
            src={ORCHARDS.image}
            alt="Dočasná fotografie sadu — placeholder pro budoucí interaktivní mapu"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-60 saturate-[0.75]"
          />
          <div className="absolute inset-0 bg-stone/35" />
          {ORCHARDS.locations.map((loc) => (
            <span
              key={loc.id}
              data-testid={`orchard-map-pin-${loc.id}`}
              title={loc.name}
              className="map-pin absolute h-3 w-3 rounded-full bg-ink cursor-pointer"
              style={{ left: `${loc.pin.x}%`, top: `${loc.pin.y}%` }}
            />
          ))}
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/85 text-stone text-[10px] tracking-[0.25em] uppercase px-4 py-2">
            TODO · Interaktivní mapa ve výrobě
          </span>
        </motion.div>

        <ul className="lg:col-span-2 divide-y divide-ink/10">
          {ORCHARDS.locations.map((loc, i) => (
            <motion.li
              key={loc.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="py-5 flex items-start justify-between gap-6"
            >
              <div>
                <h3 className="font-serif text-xl leading-snug">{loc.name}</h3>
                <p className="text-sm text-ink/60 mt-1">{loc.type}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-ink/40 mt-2">{loc.coords}</p>
              </div>
              <span className="shrink-0 text-[10px] tracking-[0.2em] uppercase border border-ink/25 rounded-full px-3 py-1.5 text-ink/70">
                {loc.status}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
