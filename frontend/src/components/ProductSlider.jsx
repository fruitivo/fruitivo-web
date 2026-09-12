import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Sprout } from "lucide-react";
import { SCENES, sceneIndexOf } from "../data/catalog";
import { ExtraArt, ProductArt, Satellites } from "./ProductArt";

const EASE = [0.65, 0, 0.35, 1];
const N = SCENES.length;
const wrap = (i) => ((i % N) + N) % N;
// všechny texty scén jsou bílé
const inkOf = () => "#F5F3EC";

// ── velikost a natočení kompozice na míru každému produktu ───────────────────
// scale = velikost hlavního kusu · rot = natočení · extra: false = jen jeden kus
// extras = další kusy vedle (kontrolovaný chaos — více menších plodů)
const LAYOUT = {
  pomegranate: { scale: 1.2, rot: -8, extraRot: 16 },
  kiwi: { scale: 1.1, rot: 7, extraRot: -14 },
  avocado: { scale: 1.28, rot: -6, extraRot: 18 },
  banana: { scale: 1.32, rot: -12, extraRot: 22 },
  watermelon: { scale: 1.4, rot: 4, extra: false }, // jeden velký kus
  lime: { scale: 1.02, rot: -13, extraRot: 20 },
  lemon: { scale: 1.12, rot: 9, extraRot: -16 },
  mango: { scale: 1.22, rot: -10, extraRot: 15 },
  papaya: { scale: 1.18, rot: 6, extraRot: -18 },
  dragonfruit: { scale: 1.22, rot: -8, extraRot: 14 },
  lychee: { scale: 1.05, rot: 10, extraRot: -20 },
  passionfruit: { scale: 1.1, rot: -7, extraRot: 17 },
  physalis: {
    scale: 0.95,
    rot: -10,
    extra: false,
    extras: [
      { art: "main", scale: 0.62, rot: 16, left: "-30%", top: "38%" },
      { art: "extra", scale: 0.55, rot: -22, left: "72%", top: "46%" },
    ],
  },
  pawpaw: { scale: 1.16, rot: 7, extraRot: -15 },
};

// ── jedna scéna: produkt NAD názvem, název celý vidět ─────────────────────────
const Slide = ({ scene, smx, smy, hidden, instant }) => {
  const ink = inkOf();
  const L = LAYOUT[scene.id] || {};
  const rot = L.rot ?? 0;
  const ax = useTransform(smx, (v) => v * 28);
  const ay = useTransform(smy, (v) => v * 18);
  const bx = useTransform(smx, (v) => v * 54);
  const by = useTransform(smy, (v) => v * 36);
  const t = instant ? { duration: 0 } : undefined;

  return (
    <section
      data-testid={`scene-${scene.id}`}
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: scene.sceneBg, color: ink }}
    >
      {/* satelitní plovoucí prvky (horní část) */}
      <motion.div style={{ x: bx, y: by }} className="pointer-events-none absolute inset-x-0 top-0 hidden h-[62%] sm:block">
        <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <Satellites ink={ink} />
        </svg>
      </motion.div>

      <div className="flex h-full flex-col items-center justify-center px-5">
        {/* produktová kompozice — velikost a natočení dle produktu */}
        <motion.div
          initial={instant ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={t || { duration: 0.7, ease: EASE, delay: 0.1 }}
          className={`relative ${hidden ? "invisible" : ""}`}
        >
          <motion.div layoutId={`art-${scene.id}`} transition={{ duration: 0.6, ease: EASE }}>
            <motion.div style={{ x: ax, y: ay, scale: L.scale ?? 1.15 }}>
              <motion.div
                animate={{ rotate: [rot - 3, rot + 3, rot - 3] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
                  <ProductArt
                    id={scene.id}
                    className="h-auto w-[56vmin] max-w-[620px] sm:w-[48vmin] lg:w-[44vmin] drop-shadow-[0_36px_44px_rgba(0,0,0,0.2)]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* druhý kus (půlka / celek) — natočený opačně */}
          {L.extra !== false && (
            <motion.div
              initial={instant ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={t || { duration: 0.7, ease: EASE, delay: 0.22 }}
              className="absolute -bottom-5 -right-14 sm:-right-20"
            >
              <motion.div style={{ x: bx, y: by, scale: L.extraScale ?? 1 }}>
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [(L.extraRot ?? 10) - 4, (L.extraRot ?? 10) + 4, (L.extraRot ?? 10) - 4] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  <ExtraArt id={scene.id} className="h-auto w-[22vmin] max-w-[240px] sm:w-[18vmin]" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* další kusy vedle — např. několik menších mochyní */}
          {(L.extras || []).map((e, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: e.left, top: e.top }}
              initial={instant ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: e.scale }}
              transition={t || { duration: 0.7, ease: EASE, delay: 0.28 + i * 0.08 }}
            >
              <motion.div style={{ x: bx, y: by }}>
                <motion.div
                  animate={{ rotate: [e.rot - 4, e.rot + 4, e.rot - 4] }}
                  transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  {e.art === "main" ? (
                    <ProductArt id={scene.id} className="h-auto w-[30vmin] max-w-[300px]" />
                  ) : (
                    <ExtraArt id={scene.id} className="h-auto w-[26vmin] max-w-[260px]" />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* název produktu pod kompozicí — celý vidět */}
        <h2 className="mt-4 select-none text-center font-display font-semibold uppercase leading-[0.95] tracking-tight text-[12.5vw] sm:text-[9vw] lg:text-[6.8vw]">
          {scene.name.split(" ").map((word, wi) => (
            <span key={wi} className="block overflow-hidden">
              <motion.span
                initial={instant ? false : { y: "112%" }}
                animate={{ y: 0 }}
                transition={t || { duration: 0.7, ease: EASE, delay: 0.2 + wi * 0.07 }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export const ProductSlider = () => {
  const [center, setCenter] = useState(0);
  const [selected, setSelected] = useState(null);
  const centerRef = useRef(0);
  const pos = useMotionValue(0); // 0 = prostřední scéna; animace na ±1
  const pending = useRef([]);
  const running = useRef(false);
  const firstDone = useRef(false);

  useEffect(() => {
    firstDone.current = true;
  }, []);

  // souvislý nekonečný pás: viditelné jsou vždy 3 sousední scény → žádné bílé pásy
  const x = useTransform(pos, (v) => `${-(v + 1) * 100}%`);
  const order = [wrap(center - 1), center, wrap(center + 1)];

  const run = async () => {
    if (running.current) return;
    running.current = true;
    while (pending.current.length) {
      const d = pending.current.shift();
      const fast = pending.current.length > 0;
      // pomalé, dlouhé přejíždění mezi produkty
      await animate(pos, d, { duration: fast ? 0.55 : 1.15, ease: EASE }).finished;
      const nc = wrap(centerRef.current + d);
      centerRef.current = nc;
      setCenter(nc);
      pos.set(0);
    }
    running.current = false;
  };

  const enqueue = (steps) => {
    pending.current.push(...steps);
    run();
  };

  // ruční výběr: projede mezilehlé produkty a zastaví se na cíli
  const go = (target) => {
    const delta = wrap(target - centerRef.current);
    const fwd = delta;
    const back = N - delta;
    if (fwd === 0) return;
    pending.current = [];
    enqueue(fwd <= back ? Array(fwd).fill(1) : Array(back).fill(-1));
  };

  // automatické přepínání po 3 s — jede pořád dokola, bez pauzy při najetí myší
  useEffect(() => {
    if (selected) return;
    const t = setTimeout(() => {
      if (!running.current && pending.current.length === 0) enqueue([1]);
    }, 3000);
    return () => clearTimeout(t);
  }, [center, selected]);

  // externí skoky (overlay menu → kategorie)
  useEffect(() => {
    const h = (e) => go(e.detail);
    window.addEventListener("goto-scene", h);
    return () => window.removeEventListener("goto-scene", h);
  }, []);

  const active = SCENES[center];
  const ink = inkOf();

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-ink", inkOf());
  }, [center]);

  // parallaxa kurzorem (slider i detail)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });
  const dax = useTransform(smx, (v) => v * 24);
  const day = useTransform(smy, (v) => v * 16);

  const activeLayout = LAYOUT[active.id] || {};

  return (
    <section
      id="produkty"
      data-testid="product-slider"
      className="relative h-[100svh] min-h-[620px] overflow-hidden"
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <motion.div style={{ x }} className="flex h-full w-full">
        {order.map((i) => (
          <div key={SCENES[i].id} className="h-full w-full shrink-0">
            <Slide scene={SCENES[i]} smx={smx} smy={smy} hidden={!!selected && i === center} instant={firstDone.current} />
          </div>
        ))}
      </motion.div>

      {/* tlačítko Objevit — vpravo, nad roletkou, pod názvem */}
      <button
        data-testid={`product-detail-open-${active.id}`}
        onClick={() => setSelected(active)}
        className="group absolute bottom-[17vh] right-5 z-20 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] opacity-80 transition-opacity hover:opacity-100"
        style={{ color: ink }}
      >
        Objevit
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {/* roletka produktů s časovačem */}
      <div className="absolute inset-x-0 bottom-[6vh] z-20 flex justify-center" style={{ color: ink }}>
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
              style={{ opacity: i === center ? 1 : 0.45 }}
            >
              {s.displayName}
              {i === center && !selected && (
                <motion.span
                  key={`progress-${center}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-current"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* informační stránka produktu — produkt odletí doprava, vlevo text */}
      <AnimatePresence>
        {selected && (
          <motion.div
            data-testid="product-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: selected.sceneBg, color: inkOf() }}
          >
            <div className="mx-auto grid min-h-full max-w-6xl grid-cols-1 items-center gap-10 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
                className="order-2 lg:order-1"
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
                      style={{ borderColor: `${inkOf()}45` }}
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <p className="mt-6 flex max-w-md items-start gap-2 text-xs leading-relaxed opacity-70 sm:text-sm">
                  <Sprout size={15} className="mt-0.5 shrink-0" />
                  {selected.soil}
                </p>

                <p className="mt-8 text-[10px] uppercase tracking-[0.2em] opacity-40">
                  TODO · Finální fotografický / 3D asset ve výrobě
                </p>
              </motion.div>

              {/* produkt vpravo — zachovaná parallaxa myší i natočení scény */}
              <div className="relative order-1 mx-auto w-full max-w-lg lg:order-2">
                <motion.div layoutId={`art-${selected.id}`} transition={{ duration: 0.6, ease: EASE }}>
                  <motion.div style={{ x: dax, y: day, rotate: activeLayout.rot ?? 0, scale: (activeLayout.scale ?? 1.15) * 0.9 }}>
                    <ProductArt id={selected.id} className="h-auto w-full" />
                  </motion.div>
                </motion.div>
                {activeLayout.extra !== false && (
                  <motion.div
                    style={{ x: dax, y: day, rotate: activeLayout.extraRot ?? 10 }}
                    className="absolute -bottom-4 -right-4 w-2/5"
                  >
                    <ExtraArt id={selected.id} className="h-auto w-full" />
                  </motion.div>
                )}
              </div>
            </div>

            <button
              data-testid="product-detail-close"
              onClick={() => setSelected(null)}
              className="fixed left-5 top-5 z-10 flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-transform hover:scale-105 sm:left-10"
              style={{ borderColor: `${inkOf()}55`, backgroundColor: selected.sceneBg }}
            >
              <ArrowLeft size={14} /> Zpět
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
