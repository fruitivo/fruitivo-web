import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Sprout } from "lucide-react";
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

// ── jedna scéna: velký produkt + název CAPS přes něj, nic víc ────────────────
const Slide = ({ scene, dir, smx, smy, hidden }) => {
  const ink = inkOf(scene);
  const ax = useTransform(smx, (v) => v * 28);
  const ay = useTransform(smy, (v) => v * 18);
  const bx = useTransform(smx, (v) => v * 54);
  const by = useTransform(smy, (v) => v * 36);

  return (
    <motion.section
      data-testid={`scene-${scene.id}`}
      custom={dir}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.85, ease: EASE }}
      className="absolute inset-0"
      style={{ backgroundColor: scene.sceneBg, color: ink }}
    >
      {/* satelitní plovoucí prvky */}
      <motion.div style={{ x: bx, y: by }} className="pointer-events-none absolute inset-0 hidden sm:block">
        <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <Satellites ink={ink} />
        </svg>
      </motion.div>

      {/* název produktu ZA kompozicí — produkt zůstává vždy vidět */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <h2 className="select-none text-center font-display font-semibold uppercase leading-[0.92] tracking-tight text-[14vw] lg:text-[12vw]">
          {scene.name.split(" ").map((word, wi) => (
            <span key={wi} className="block overflow-hidden">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.25 + wi * 0.08 }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>

      {/* velká produktová kompozice VPŘEDU */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -70, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className={`relative ${hidden ? "invisible" : ""}`}
        >
          <motion.div style={{ x: ax, y: ay }} layoutId={`art-${scene.id}`}>
            <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
              <ProductArt id={scene.id} className="h-auto w-[64vmin] max-w-[700px] drop-shadow-[0_40px_50px_rgba(0,0,0,0.2)]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 12 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="absolute -bottom-8 -right-16 sm:-right-24"
          >
            <motion.div style={{ x: bx, y: by }}>
              <motion.div
                animate={{ y: [0, -11, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <ExtraArt id={scene.id} className="h-auto w-[26vmin] max-w-[280px]" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
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
        <Slide key={index} scene={active} dir={dir} smx={smx} smy={smy} hidden={!!selected} />
      </AnimatePresence>

      {/* spodní blok: roletka produktů zvednutá pod název + objevit */}
      <div className="absolute inset-x-0 bottom-[7vh] z-20 flex flex-col items-center sm:bottom-[8vh]" style={{ color: ink }}>
        <div
          data-testid="slider-tabs"
          className="no-scrollbar flex max-w-full items-end gap-6 overflow-x-auto px-5 pb-1 pt-3 sm:gap-8 sm:px-10"
        >
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              data-testid={`slider-tab-${s.id}`}
              onClick={() => go(i)}
              className="relative shrink-0 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-opacity duration-300 sm:text-xs"
              style={{ opacity: i === index ? 1 : 0.45 }}
            >
              {s.displayName}
              {i === index && !paused && !selected && (
                <motion.span
                  key={`progress-${index}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-current"
                />
              )}
            </button>
          ))}
        </div>

        <button
          data-testid={`product-detail-open-${active.id}`}
          onClick={() => setSelected(active)}
          className="group mb-5 mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] opacity-70 transition-opacity hover:opacity-100"
        >
          Objevit
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* informační stránka produktu — produkt se animací zvětší a text ho obklopí */}
      <AnimatePresence>
        {selected && (
          <motion.div
            data-testid="product-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: selected.sceneBg, color: inkOf(selected) }}
          >
            <div className="mx-auto grid min-h-full max-w-6xl grid-cols-1 items-center gap-10 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative mx-auto w-full max-w-lg">
                <motion.div layoutId={`art-${selected.id}`} transition={{ duration: 0.6, ease: EASE }}>
                  <ProductArt id={selected.id} className="h-auto w-full" />
                </motion.div>
                <div className="absolute -bottom-4 -right-4 w-2/5">
                  <ExtraArt id={selected.id} className="h-auto w-full" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] opacity-60">
                  {selected.categoryName} · {selected.latin}
                </p>
                <h3 className="mt-3 font-display font-semibold uppercase leading-[0.95] tracking-tight text-5xl sm:text-6xl">
                  {selected.name.split(" ").map((w, i) => (
                    <span key={i} className="mr-[0.24em] inline-block last:mr-0">
                      {w}
                    </span>
                  ))}
                </h3>
                <p className="mt-4 font-serif text-xl italic font-light opacity-80">{selected.subtitle}</p>
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

                <p className="mt-6 flex max-w-md items-start gap-2 text-xs leading-relaxed opacity-70 sm:text-sm">
                  <Sprout size={15} className="mt-0.5 shrink-0" />
                  {selected.soil}
                </p>

                {selected.linkedId && (
                  <button
                    data-testid="linked-bean-to-bar-badge"
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
              </motion.div>
            </div>

            <button
              data-testid="product-detail-close"
              onClick={() => setSelected(null)}
              className="fixed left-5 top-5 z-10 flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-transform hover:scale-105 sm:left-10"
              style={{ borderColor: `${inkOf(selected)}55`, backgroundColor: selected.sceneBg }}
            >
              <ArrowLeft size={14} /> Zpět
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
