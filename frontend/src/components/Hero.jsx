import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO } from "../data/catalog";
import { useScroller } from "../scrollContext";

const EASE = [0.65, 0, 0.35, 1];

export const Hero = () => {
  const ref = useRef(null);
  const lenis = useScroller();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="hero" ref={ref} data-testid="hero-section" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink grain">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img
          src={HERO.image}
          alt="Pole v západu slunce — přechod od zdevastované půdy k živé krajině"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* jemná animovaná světelná vrstva */}
      <motion.div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light"
        animate={{ x: ["-6%", "6%", "-6%"], y: ["-3%", "4%", "-3%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 50% at 65% 35%, rgba(238,235,225,0.55) 0%, transparent 70%), radial-gradient(40% 35% at 25% 70%, rgba(224,106,38,0.35) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/40" />

      <motion.div
        style={{ y: fgY, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-stone/70"
        >
          {HERO.overline}
        </motion.p>

        <h1 className="overflow-hidden whitespace-nowrap font-display uppercase leading-[0.9] tracking-tight text-stone text-[17vw] sm:text-[19vw] lg:text-[15rem]">
          {"KOŘENY".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.45 + i * 0.055 }}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <div className="overflow-hidden mt-4">
          <motion.p
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.0 }}
            className="font-serif italic font-light text-stone/90 text-2xl sm:text-3xl lg:text-4xl"
          >
            {HERO.statement}
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
          className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-stone/70"
        >
          {HERO.support}
        </motion.p>

        <motion.button
          data-testid="hero-explore-cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => (lenis ? lenis.scrollTo("#produkty", { duration: 1.8 }) : null)}
          className="group mt-9 rounded-full border border-stone/60 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-stone transition-colors duration-300 hover:bg-stone hover:text-ink"
        >
          {HERO.cta} <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-stone/60">Posunout</span>
        <span className="scroll-cue-line block h-12 w-px bg-stone/60" />
      </motion.div>
    </section>
  );
};
