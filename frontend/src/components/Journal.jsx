import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { JOURNAL } from "../data/catalog";

const EASE = [0.65, 0, 0.35, 1];

export const Journal = () => (
  <section id="zurnal" data-testid="journal-section" className="bg-stone px-5 sm:px-10 py-28 sm:py-40 border-t border-ink/10">
    <div className="max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-[11px] tracking-[0.35em] uppercase font-semibold text-ink/50 mb-6"
      >
        04 · Žurnál
      </motion.p>

      <h2 className="font-serif tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mb-16">
        {JOURNAL.title}
      </h2>

      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {JOURNAL.articles.map((a, i) => (
          <motion.article
            key={a.title}
            data-testid={`journal-article-${i}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
            className="group grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 py-8 items-baseline cursor-pointer"
          >
            <span className="sm:col-span-2 text-[11px] tracking-[0.2em] uppercase text-ink/45">{a.date}</span>
            <h3 className="sm:col-span-6 font-serif text-2xl sm:text-3xl leading-tight transition-all duration-300 group-hover:italic group-hover:translate-x-2">
              {a.title}
            </h3>
            <p className="sm:col-span-3 text-sm text-ink/60 leading-relaxed">{a.excerpt}</p>
            <span className="sm:col-span-1 flex sm:justify-end items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-ink/50">
              {a.readTime}
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
