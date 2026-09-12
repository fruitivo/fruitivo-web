import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Sprout } from "lucide-react";
import { SCENES, sceneIndexOf } from "../data/catalog";
import { ExtraArt, ProductArt, ProductFlora } from "./ProductArt";

const EASE = [0.65, 0, 0.35, 1];
const N = SCENES.length;
const wrap = (i) => ((i % N) + N) % N;
// všechny texty scén jsou bílé
const inkOf = () => "#F5F3EC";

// ── velikost a natočení kompozice na míru každému produktu ───────────────────
// Skupina kusů je vždy vycentrovaná; kusy jsou podobné velikosti.
const LAYOUT = {
  avocado: { scale: 1.16, rot: -6, extraRot: 16 },
  kiwi: { scale: 1.06, rot: 7, extraRot: -12 },
  lime: { scale: 0.98, rot: -10, extraRot: 18, extraMain: { rot: 16 } }, // tři kusy
  pawpaw: { scale: 1.1, rot: 6, extraRot: -14 },
  lemon: { scale: 1.04, rot: 8, extraRot: -16 },
  banana: { scale: 1.2, rot: -12, extraRot: 20 },
  passionfruit: { scale: 1.04, rot: -6, extraRot: 15 },
  physalis: { scale: 0.95, rot: -8, extraRot: -18, extraMain: { rot: 14 } }, // tři kusy
  mango: { scale: 1.14, rot: -9, extraRot: 13 },
  papaya: { scale: 1.1, rot: 6, extraRot: -15 },
  watermelon: { scale: 1.32, rot: 4, extra: false }, // jeden velký kus
  pomegranate: { scale: 1.14, rot: -8, extraRot: 14 },
  dragonfruit: { scale: 1.14, rot: -8, extraRot: 15 },
  lychee: { scale: 1.02, rot: 9, extraRot: -18 },
};

// ── jedna scéna: produkt NAD názvem, pozadí řeší slider (plynulé přebarvení) ──
const Slide = ({ scene, smx, smy, hidden, instant }) => {
  const ink = inkOf();
  const L = LAYOUT[scene.id] || {};
  const rot = L.rot ?? 0;
  const ax = useTransform(smx, (v) => v * 28);
  const ay = useTransform(smy, (v) => v * 18);
  const bx = useTransform(smx, (v) => v * 54);
  const by = useTransform(smy, (v) => v * 36);
  const t = instant ? { duration: 0 } : undefined;

  // vycentrovaná skupina kusů (celek + rozřezaný, případně třetí)
  const pieces = [
    { art: "main", rot },
    ...(L.extra !== false ? [{ art: "extra", rot: L.extraRot ?? 12 }] : []),
    ...(L.extraMain ? [{ art: "main", rot: L.extraMain.rot }] : []),
  ];
  const sizeCls =
    pieces.length === 1
      ? "w-[56vmin] sm:w-[48vmin] lg:w-[44vmin] max-w-[640px]"
      : pieces.length === 2
        ? "w-[42vmin] sm:w-[38vmin] lg:w-[34vmin] max-w-[470px]"
        : "w-[33vmin] sm:w-[29vmin] lg:w-[26vmin] max-w-[370px]";
  const lift = ["0%", "9%", "-5%"];

  return (
    <section data-testid={`scene-${scene.id}`} className="relative h-full w-full overflow-hidden" style={{ color: ink }}>
      {/* botanický prvek druhu — nenápadná lineární kresba v pozadí */}
      <motion.div style={{ x: bx, y: by }} className="pointer-events-none absolute inset-0 hidden sm:block">
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[3%] top-[8%] opacity-40"
        >
          <ProductFlora id={scene.id} ink={ink} className="h-auto w-[24vmin]" />
        </motion.div>
        <motion.div
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[4%] opacity-30"
        >
          <ProductFlora id={scene.id} ink={ink} className="h-auto w-[17vmin] -scale-x-100" />
        </motion.div>
      </motion.div>

      <div className="flex h-full flex-col items-center justify-center px-5">
        {/* vycentrovaná kompozice — kusy vedle sebe, podobné velikosti */}
        <motion.div
          initial={instant ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={t || { duration: 0.7, ease: EASE, delay: 0.1 }}
          className={`relative ${hidden ? "invisible" : ""}`}
        >
          <motion.div layoutId={`art-${scene.id}`} transition={{ duration: 0.6, ease: EASE }}>
            <motion.div style={{ x: ax, y: ay }}>
              <motion.div
                style={{ scale: L.scale ?? 1.1 }}
                animate={{ rotate: [rot / 2 - 2, rot / 2 + 2, rot / 2 - 2] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-center">
                  {pieces.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={instant ? false : { opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={t || { duration: 0.7, ease: EASE, delay: 0.12 + i * 0.1 }}
                      className={i > 0 ? "-ml-[9%]" : ""}
                      style={{ rotate: p.rot, marginTop: lift[i % lift.length] }}
                    >
                      <motion.div
                        animate={{ y: [0, -14 - i * 2, 0] }}
                        transition={{ duration: 5.5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                      >
                        {p.art === "main" ? (
                          <ProductArt id={scene.id} className={`h-auto ${sizeCls} drop-shadow-[0_36px_44px_rgba(0,0,0,0.2)]`} />
                        ) : (
                          <ExtraArt id={scene.id} className={`h-auto ${sizeCls} drop-shadow-[0_24px_30px_rgba(0,0,0,0.16)]`} />
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
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
  const [bgIndex, setBgIndex] = useState(0); // barva pozadí míří na cíl hned při startu posunu
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
    // pozadí se začíná přebarvovat už v době posunu, ne až po doběhnutí
    const total = steps.reduce((a, b) => a + b, 0);
    if (total !== 0) setBgIndex(wrap(centerRef.current + total));
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
      {/* pozadí zůstává stát a rychle, plynule proniká do barvy cílové scény */}
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundColor: SCENES[0].sceneBg }}
        animate={{ backgroundColor: SCENES[bgIndex].sceneBg }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
      />

      <motion.div style={{ x }} className="relative flex h-full w-full">
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
            {/* botanický prvek druhu i v detailu — jemně v pozadí */}
            <ProductFlora
              id={selected.id}
              ink={inkOf()}
              className="pointer-events-none absolute -right-12 top-10 h-auto w-[42vmin] opacity-20"
            />

            <div className="relative mx-auto grid min-h-full max-w-6xl grid-cols-1 items-center gap-10 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16">
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
                  <motion.div style={{ x: dax, y: day, rotate: activeLayout.rot ?? 0, scale: (activeLayout.scale ?? 1.1) * 0.85 }}>
                    <ProductArt id={selected.id} className="h-auto w-full" />
                  </motion.div>
                </motion.div>
                {activeLayout.extra !== false && (
                  <motion.div
                    style={{ x: dax, y: day, rotate: activeLayout.extraRot ?? 10 }}
                    className="absolute left-[62%] top-[14%] w-full"
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
