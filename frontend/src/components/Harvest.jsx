import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HARVEST, MONTHS, SCENES, ORCHARDS } from "../data/catalog";
import { EN } from "../data/en";
import { useLang, pick } from "../langContext";

const EASE = [0.65, 0, 0.35, 1];

const productOf = (id) => SCENES.find((p) => p.id === id);
const orchardOf = (product) => ORCHARDS.locations.find((l) => product?.orchard?.startsWith(l.name));

const entriesForMonth = (m) => HARVEST.items.filter((it) => it.months.includes(m));

export const Harvest = ({ onOpenOrchard }) => {
  const [active, setActive] = useState(() => new Date().getMonth());
  const { lang } = useLang();
  const monthNames = lang === "en" ? EN.months : MONTHS;
  const entries = entriesForMonth(active);

  return (
    <section id="sklizen" data-testid="harvest-section" className="border-t border-ink/10 bg-stone px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/50"
        >
          {pick(lang, "05 · Sklizeň", EN.sectionLabels.harvest)}
        </motion.p>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {pick(lang, HARVEST.title, EN.harvest.title)}
          </h2>
          <p className="max-w-sm font-serif text-lg font-light italic text-ink/60 sm:text-xl">{pick(lang, HARVEST.subtitle, EN.harvest.subtitle)}</p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 max-w-2xl text-sm leading-relaxed text-ink/70 sm:text-base"
        >
          {pick(lang, HARVEST.intro, EN.harvest.intro)}
        </motion.p>

        {/* roční osa — 12 měsíců, tečky ve barvách produktů; na mobilu horizontálně scrollovatelná */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
        >
          <div className="grid min-w-[760px] grid-cols-12 gap-0">
            {MONTHS.map((month, m) => {
              const entries = entriesForMonth(m);
              const isActive = m === active;
              const isCurrent = m === new Date().getMonth();
              return (
                <button
                  key={month}
                  type="button"
                  data-testid={`harvest-month-${m}`}
                  onClick={() => setActive(m)}
                  className={`group relative flex flex-col items-center gap-4 border-l border-ink/10 px-1 pb-6 pt-4 transition-colors duration-300 ${
                    isActive ? "bg-ink/[0.06]" : "hover:bg-ink/[0.03]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 sm:text-[11px] ${
                      isActive ? "text-ink" : "text-ink/45 group-hover:text-ink/70"
                    }`}
                  >
                    {monthNames[m]}
                  </span>
                  <span className="relative flex min-h-[86px] flex-col-reverse flex-wrap content-center items-center justify-start gap-1.5">
                    {entries.map((it) => (
                      <span
                        key={it.productId}
                        className="block h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: productOf(it.productId)?.accent }}
                        title={productOf(it.productId)?.displayName}
                      />
                    ))}
                  </span>
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 h-[3px] transition-colors duration-300 ${
                      isActive ? "bg-ink" : isCurrent ? "bg-ink/25" : "bg-ink/10 group-hover:bg-ink/20"
                    }`}
                  />
                  {isCurrent && !isActive && (
                    <span className="absolute -bottom-5 text-[9px] uppercase tracking-[0.2em] text-ink/35">{pick(lang, "nyní", EN.ui.now)}</span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* panel s plody vybraného měsíce */}
        <div className="mt-12 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              data-testid="harvest-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/50">
                {monthNames[active]} ·{" "}
                {lang === "en"
                  ? entries.length === 0
                    ? "nothing harvested"
                    : `${entries.length} ${entries.length === 1 ? "fruit" : "fruits"} harvested`
                  : entries.length === 0
                    ? "nic se nesklízí"
                    : `sklízí se ${entries.length} ${entries.length === 1 ? "plod" : entries.length < 5 ? "plody" : "plodů"}`}
              </p>
              {entries.length === 0 ? (
                <p className="font-serif text-lg font-light italic text-ink/50">
                  {pick(lang, "Půda si tento měsíc odpočívá — a my s ní.", EN.ui.monthEmpty)}
                </p>
              ) : (
                <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {entries.map((it) => {
                    const product = productOf(it.productId);
                    const orchard = orchardOf(product);
                    return (
                      <li key={it.productId}>
                        <button
                          type="button"
                          data-testid={`harvest-item-${it.productId}`}
                          onClick={() => orchard && onOpenOrchard?.(orchard.id)}
                          className="group flex w-full items-center gap-3 text-left"
                        >
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: product?.accent }} />
                          <span className="min-w-0">
                            <span className="block font-serif text-lg leading-tight tracking-tight">
                              {pick(lang, product?.displayName, EN.products[it.productId]?.displayName)}
                            </span>
                            <span className="block text-[11px] uppercase tracking-[0.18em] text-ink/45">
                              {orchard && pick(lang, `${orchard.name} · ${orchard.place}`, `${EN.orchards.items[orchard.id]?.name} · ${EN.orchards.items[orchard.id]?.place}`)}
                            </span>
                          </span>
                          <ArrowRight size={14} className="ml-auto shrink-0 text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-16 max-w-2xl text-xs leading-relaxed text-ink/55 sm:text-sm"
        >
          {pick(lang, HARVEST.outro, EN.harvest.outro)}
        </motion.p>
      </div>
    </section>
  );
};
