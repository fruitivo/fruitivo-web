import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Sprout, X } from "lucide-react";
import { SCENES, sceneIndexOf } from "../data/catalog";
import { ExtraArt, ProductArt, Satellites } from "./ProductArt";

const EASE = [0.65, 0, 0.35, 1];
const N = SCENES.length;
const inkOf = (s) => (s.sceneInk === "dark" ? "#211E1B" : "#F5F3EC");

const slideVariants = {
  enter: (d) => ({ x: d >= 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (d) => ({ x: d >= 0 ? "-100%" : "100%" }),
};

const Slide = ({ scene, dir, smx, smy, onOpen, onJump }) => {
  const ink = inkOf(scene);
  const linked = scene.linkedId ? SCENES.find((s) => s.id === scene.linkedId) : null;

  // parallaxní hloubkové vrstvy řízené kurzorem
  const ax = useTransform(smx, (v) => v * 30);
  const ay = useTransform(smy, (v) => v * 20);
  const bx = useTransform(smx, (v) => v * 58);
  const by = useTransform(smy, (v) => v * 40);

  return (
    <motion.section
      data-testid={`scene-${scene.id}`}
      custom={dir}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.85, ease: EASE }}
      className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-2"
      style={{ backgroundColor: scene.sceneBg, color: ink }}
    >
      {/* levá polovina — kompozice více kusů produktu */}
      <div className="relative flex h-[44%] shrink-0 items-center justify-center lg:h-full">
        <motion.div style={{ x: bx, y: by }} className="pointer-events-none absolute inset-0 hidden lg:block">
          <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <Satellites ink={ink} />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -70, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="relative"
        >
          <motion.div style={{ x: ax, y: ay }}>
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
              <ProductArt id={scene.id} className="h-auto w-[36vmin] max-w-[420px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.18)]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 12 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="absolute -bottom-4 -right-10 sm:-right-16"
          >
            <motion.div style={{ x: bx, y: by }}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <ExtraArt id={scene.id} className="h-auto w-[19vmin] max-w-[210px]" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* pravá polovina — typografie a informace */}
      <div className="relative flex flex-1 items-center">
        <div className="w-full px-5 pb-24 sm:px-10 lg:max-w-2xl lg:pb-28 lg:pr-20">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 0.65, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
          >
            {scene.categoryName} · {scene.latin}
          </motion.p>

          <h2 className="mt-2 font-display lowercase leading-[0.95] tracking-tight text-[clamp(2.6rem,6.5vw,5.6rem)]">
            {scene.name.split(" ").map((word, wi) => (
              <span key={wi} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.3 + wi * 0.08 }}
                  className="block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-3 font-serif text-lg italic font-light sm:text-xl"
          >
            {scene.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 hidden max-w-md text-sm leading-relaxed sm:block sm:text-base"
          >
            {scene.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 hidden flex-wrap gap-2 sm:flex"
          >
            {scene.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]"
                style={{ borderColor: `${ink}40` }}
              >
                {n}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <button
              data-testid={`product-detail-open-${scene.id}`}
              onClick={() => onOpen(scene)}
              className="rounded-full border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] transition-transform duration-300 hover:scale-105"
              style={{ borderColor: `${ink}66`, backgroundColor: `${ink}0d` }}
            >
              detail +
            </button>
            {linked && (
              <button
                data-testid="linked-bean-to-bar-badge"
                onClick={() => onJump(linked.id)}
                className="flex items-center gap-2 rounded-full border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-transform duration-300 hover:scale-105"
                style={{ borderColor: `${ink}55` }}
              >
                od bobu ke tabulce <ArrowRight size={13} />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export const ProductSlider = () => {
  const [[index, dir], setState] = useState([0, 1]);
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false);
  const indexRef = useRef(0);
  indexRef.current = index;

  const go = (i, d) => {
    const next = ((i % N) + N) % N;
    setState(([prev]) => [next, d ?? (next > prev || (next === 0 && prev === N - 1) ? 1 : -1)]);
  };

  // automatické přepínání po 3 s (pauza při najetí / otevřeném detailu)
  useEffect(() => {
    if (paused || selected) return;
    const t = setTimeout(() => go(indexRef.current + 1, 1), 3000);
    return () => clearTimeout(t);
  }, [index, paused, selected]);

  // externí skoky (overlay menu → kategorie)
  useEffect(() => {
    const h = (e) => go(e.detail, 1);
    window.addEventListener("goto-scene", h);
    return () => window.removeEventListener("goto-scene", h);
  }, []);

  // barva navigace nad sliderem = ink aktivní scény
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-ink", inkOf(active));
  }, [index]);

  // kurzor pro parallaxu
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });

  const active = SCENES[index];
  const ink = inkOf(active);

  return (
    <section
      id="produkty"
      data-testid="product-slider"
      className="relative h-[100svh] min-h-[620px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <AnimatePresence initial={false} custom={dir}>
        <Slide
          key={index}
          scene={active}
          dir={dir}
          smx={smx}
          smy={smy}
          onOpen={setSelected}
          onJump={(id) => go(sceneIndexOf(id), 1)}
        />
      </AnimatePresence>

      {/* počítadlo */}
      <div className="absolute bottom-[92px] left-5 z-20 sm:left-10" style={{ color: ink }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="font-display text-3xl leading-none sm:text-4xl"
          >
            {String(index + 1).padStart(2, "0")}
            <span className="text-lg opacity-50"> / {N}</span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* šipky */}
      <div className="absolute bottom-[86px] right-5 z-20 flex gap-2 sm:right-10">
        <button
          data-testid="slider-prev"
          aria-label="Předchozí produkt"
          onClick={() => go(index - 1, -1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-transform hover:scale-110"
          style={{ borderColor: `${ink}55`, color: ink }}
        >
          <ArrowLeft size={15} />
        </button>
        <button
          data-testid="slider-next"
          aria-label="Další produkt"
          onClick={() => go(index + 1, 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-transform hover:scale-110"
          style={{ borderColor: `${ink}55`, color: ink }}
        >
          <ArrowRight size={15} />
        </button>
      </div>

      {/* ruční přepínač produktů */}
      <div
        className="no-scrollbar absolute inset-x-0 bottom-0 z-20 flex items-end gap-6 overflow-x-auto border-t px-5 pb-4 pt-3 sm:px-10"
        style={{ borderColor: `${ink}22`, color: ink }}
      >
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            data-testid={`slider-tab-${s.id}`}
            onClick={() => go(i)}
            className="relative shrink-0 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-opacity duration-300"
            style={{ opacity: i === index ? 1 : 0.45 }}
          >
            {s.displayName}
            {i === index && !paused && !selected && (
              <motion.span
                key={`progress-${index}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="absolute -bottom-0.5 left-0 h-[2px] bg-current"
              />
            )}
          </button>
        ))}
      </div>

      {/* detail produktu — mask reveal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            data-testid="product-detail-overlay"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(142% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.75, ease: EASE }}
            className="grain fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: selected.sceneBg, color: inkOf(selected) }}
          >
            <button
              data-testid="product-detail-close"
              onClick={() => setSelected(null)}
              className="fixed right-5 top-5 z-10 flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-transform hover:scale-105"
              style={{ borderColor: `${inkOf(selected)}55` }}
            >
              Zavřít <X size={15} />
            </button>

            <div className="mx-auto grid min-h-full max-w-6xl grid-cols-1 items-center gap-10 px-5 py-24 sm:px-10 lg:grid-cols-2">
              <div className="relative mx-auto w-full max-w-md">
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ProductArt id={selected.id} className="h-auto w-full" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-2 -right-2 w-2/5"
                >
                  <ExtraArt id={selected.id} className="h-auto w-full" />
                </motion.div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] opacity-60">
                  {selected.categoryName} · {selected.latin}
                </p>
                <h3 className="mt-3 font-display lowercase leading-[0.95] text-5xl sm:text-6xl">{selected.name}</h3>
                <p className="mt-3 font-serif text-xl italic font-light opacity-80">{selected.subtitle}</p>
                <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80 sm:text-base">{selected.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.notes.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]"
                      style={{ borderColor: `${inkOf(selected)}45` }}
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed opacity-70">
                  <Sprout size={15} className="mt-0.5 shrink-0" />
                  {selected.soil}
                </p>

                {selected.linkedId && (
                  <button
                    onClick={() => {
                      const target = selected.linkedId;
                      setSelected(null);
                      setTimeout(() => go(sceneIndexOf(target), 1), 350);
                    }}
                    className="group mt-8 flex items-center gap-3 rounded-2xl border p-4 pr-6 text-left transition-transform duration-300 hover:scale-[1.02]"
                    style={{ borderColor: `${inkOf(selected)}45` }}
                  >
                    <span
                      className="h-12 w-12 shrink-0 overflow-hidden rounded-full border"
                      style={{ borderColor: `${inkOf(selected)}33` }}
                    >
                      <ProductArt id={selected.linkedId} className="h-full w-full" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] opacity-70">
                        Od bobu ke tabulce · {selected.pairRole}
                      </span>
                      <span className="mt-0.5 flex items-center gap-2 font-serif text-base">
                        {selected.id === "cocoa" ? "se stává" : "vzniká z"}{" "}
                        <em>{SCENES.find((s) => s.id === selected.linkedId).displayName}</em>
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </button>
                )}

                <p className="mt-8 text-[10px] uppercase tracking-[0.2em] opacity-40">
                  TODO · Finální fotografický / 3D asset ve výrobě
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
