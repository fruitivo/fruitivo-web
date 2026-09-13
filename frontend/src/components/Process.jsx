import { motion } from "framer-motion";
import { PROCESS } from "../data/catalog";

const EASE = [0.65, 0, 0.35, 1];

export const Process = () => (
  <section id="denik" data-testid="process-section" className="border-t border-ink/10 bg-stone px-5 py-28 sm:px-10 sm:py-40">
    <div className="mx-auto max-w-6xl">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/50"
      >
        04 · Proces
      </motion.p>

      <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {PROCESS.title}
        </h2>
        <p className="max-w-sm font-serif text-lg font-light italic text-ink/60 sm:text-xl">{PROCESS.subtitle}</p>
      </div>

      <ol className="relative">
        {/* svislá osa časové linie */}
        <span aria-hidden className="absolute bottom-10 left-[2.4rem] top-10 hidden w-px bg-ink/15 sm:left-[3.4rem] sm:block" />
        {PROCESS.steps.map((step, i) => (
          <motion.li
            key={step.number}
            data-testid={`process-step-${step.number}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, ease: EASE, delay: Math.min(i * 0.06, 0.2) }}
            className={`relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-10 ${i > 0 ? "mt-10 sm:mt-14" : ""} ${
              step.core ? "sm:-mx-6 sm:rounded-2xl sm:bg-sand sm:px-6 sm:py-8 lg:-mx-10 lg:px-10" : ""
            }`}
          >
            <span
              aria-hidden
              className={`relative shrink-0 font-display text-6xl font-semibold leading-none tracking-tight sm:w-[6.8rem] sm:text-8xl ${
                step.core ? "text-ink/25" : "text-ink/10"
              }`}
            >
              {step.number}
            </span>
            <div className="max-w-xl pt-1 sm:pt-3">
              <h3 className="font-serif text-2xl leading-tight tracking-tight sm:text-3xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65 sm:text-base">{step.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);
