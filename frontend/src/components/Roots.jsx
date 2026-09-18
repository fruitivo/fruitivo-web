import { motion } from "framer-motion";
import { ROOTS } from "../data/catalog";

const EASE = [0.65, 0, 0.35, 1];

export const Roots = () => (
  <section id="pribeh" data-testid="roots-section" className="bg-stone px-5 sm:px-10 py-28 sm:py-40">
    <div className="max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-[11px] tracking-[0.35em] uppercase font-semibold text-ink/50 mb-6"
      >
        02 · Příběh
      </motion.p>

      <h2 className="font-serif tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
        <motion.span
          className="block overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
            className="block"
          >
            {ROOTS.title}
          </motion.span>
        </motion.span>
        <motion.span
          className="block overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
            className="block italic font-light text-ink/70 text-2xl sm:text-3xl lg:text-4xl mt-3"
          >
            {ROOTS.lead}
          </motion.span>
        </motion.span>
      </h2>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
        {ROOTS.chapters.map((ch, i) => (
          <motion.article
            key={ch.number}
            data-testid={`manifesto-chapter-${ch.number}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.12 }}
            className="border-t border-ink/15 pt-6"
          >
            <span className="font-serif italic text-lg text-ink/40">{ch.number}</span>
            <h3 className="font-serif text-xl sm:text-2xl mt-2 mb-3 leading-snug">{ch.title}</h3>
            <p className="text-sm sm:text-base leading-relaxed text-ink/70 max-w-md">{ch.text}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
