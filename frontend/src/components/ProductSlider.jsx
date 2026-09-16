import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MapPin, Sprout } from "lucide-react";
import { SCENES, sceneIndexOf } from "../data/catalog";
import { ExtraArt, ProductArt, ProductFlora } from "./ProductArt";

const EASE = [0.65, 0, 0.35, 1];
const N = SCENES.length;
const wrap = (i) => ((i % N) + N) % N;
const STONE = "#EEEBE1";
const INK = "#211E1B";
// všechny texty scén jsou bílé
const inkOf = () => "#F5F3EC";

// ── velikost a natočení kompozice na míru každému produktu ───────────────────
const LAYOUT = {
  avocado: { scale: 1.16, rot: -6, extraRot: 16 },
  kiwi: { scale: 1.1, rot: 7, extraRot: -12 },
  lime: { scale: 1.02, rot: -10, extraRot: 18 },
  pawpaw: { scale: 1.12, rot: 6, extraRot: -14 },
  lemon: { scale: 1.06, rot: 8, extraRot: -16 },
  banana: { scale: 1.18, rot: -12, extraRot: 20 },
  passionfruit: { scale: 1.06, rot: -6, extraRot: 15 },
  physalis: { scale: 1.0, rot: -8, extraRot: -16 },
  mango: { scale: 1.14, rot: -9, extraRot: 13 },
  papaya: { scale: 1.12, rot: 6, extraRot: -15 },
  watermelon: { scale: 1.12, rot: 4, extra: false },
  pomegranate: { scale: 1.14, rot: -8, extraRot: 14 },
  dragonfruit: { scale: 1.14, rot: -8, extraRot: 15 },
  lychee: { scale: 1.04, rot: 9, extraRot: -18 },
};

// velikost ovoce v detailu — každý druh zvlášť, aby pěkně vyplnil barevný panel
// [hlavní kus, druhý kus]; panel = na mobilu horní pás přes celou šířku, na desktopu pravá polovina
const DETAIL_SIZE = {
  avocado: ["w-[54vmin] lg:w-[23vw]", "w-[46vmin] lg:w-[19vw]"],
  kiwi: ["w-[56vmin] lg:w-[24vw]", "w-[48vmin] lg:w-[20vw]"],
  lime: ["w-[50vmin] lg:w-[22vw]", "w-[42vmin] lg:w-[18vw]"],
  pawpaw: ["w-[62vmin] lg:w-[27vw]", "w-[50vmin] lg:w-[21vw]"],
  lemon: ["w-[54vmin] lg:w-[23vw]", "w-[46vmin] lg:w-[19vw]"],
  passionfruit: ["w-[52vmin] lg:w-[22vw]", "w-[44vmin] lg:w-[18vw]"],
  physalis: ["w-[64vmin] lg:w-[28vw]", "w-[52vmin] lg:w-[22vw]"],
  mango: ["w-[58vmin] lg:w-[25vw]", "w-[48vmin] lg:w-[20vw]"],
  papaya: ["w-[62vmin] lg:w-[27vw]", "w-[50vmin] lg:w-[21vw]"],
  watermelon: ["w-[78vmin] lg:w-[36vw]"],
  pomegranate: ["w-[56vmin] lg:w-[24vw]", "w-[46vmin] lg:w-[19vw]"],
  dragonfruit: ["w-[56vmin] lg:w-[24vw]", "w-[46vmin] lg:w-[19vw]"],
  lychee: ["w-[60vmin] lg:w-[26vw]", "w-[48vmin] lg:w-[20vw]"],
};

// různé pozice flóry — každá scéna dostane jiné rozmístění (posun dle indexu)
const FLORA_SPOTS = [
  { style: { left: "3%", top: "8%" }, size: "w-[26vmin]", opacity: 0.5, flip: false, dur: 16 },
  { style: { right: "4%", bottom: "24%" }, size: "w-[19vmin]", opacity: 0.4, flip: true, dur: 19 },
  { style: { left: "11%", bottom: "18%" }, size: "w-[14vmin]", opacity: 0.36, flip: true, dur: 14 },
  { style: { right: "15%", top: "5%" }, size: "w-[15vmin]", opacity: 0.44, flip: false, dur: 21 },
  { style: { left: "38%", top: "3%" }, size: "w-[11vmin]", opacity: 0.3, flip: true, dur: 17 },
];

// ── jedna scéna: velký produkt, název nízko, pozadí řeší slider ───────────────
const Slide = ({ scene, idx, smx, smy, hidden, instant }) => {
  const ink = inkOf();
  const L = LAYOUT[scene.id] || {};
  const rot = L.rot ?? 0;
  const ax = useTransform(smx, (v) => v * 28);
  const ay = useTransform(smy, (v) => v * 18);
  const bx = useTransform(smx, (v) => v * 54);
  const by = useTransform(smy, (v) => v * 36);
  const t = instant ? { duration: 0 } : undefined;

  // vycentrovaný pár RŮZNÝCH kusů (celek + půlka), případně jediný kus
  const pieces = [{ art: "main", rot }, ...(L.extra !== false ? [{ art: "extra", rot: L.extraRot ?? 12 }] : [])];
  const sizeCls =
    pieces.length === 1
      ? "w-[88vmin] sm:w-[78vmin] lg:w-[66vmin] max-w-[760px]"
      : "w-[62vmin] sm:w-[56vmin] lg:w-[47vmin] max-w-[640px]";
  const lift = ["0%", "9%"];

  // 4 prvky flóry, rozmístění se scéna od scény posouvá
  const spots = [0, 1, 2, 3].map((k) => FLORA_SPOTS[(idx + k) % FLORA_SPOTS.length]);

  return (
    <section data-testid={`scene-${scene.id}`} className="relative h-full w-full overflow-hidden" style={{ color: ink }}>
      {/* botanický prvek druhu — rozmístěný různě po scéně */}
      <motion.div style={{ x: bx, y: by }} className="pointer-events-none absolute inset-0 hidden sm:block">
        {spots.map((s, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [i % 2 ? 3 : -3, i % 2 ? -3 : 3, i % 2 ? 3 : -3] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            className="absolute"
            style={{ ...s.style, opacity: s.opacity }}
          >
            <ProductFlora id={scene.id} ink={ink} className={`h-auto ${s.size} ${s.flip ? "-scale-x-100" : ""}`} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex h-full flex-col items-center">
        {/* vycentrovaná kompozice */}
        <div className="flex flex-1 items-center justify-center">
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
        </div>

        {/* název produktu nízko pod kompozicí */}
        <h2 className="select-none pb-[19vh] text-center font-display font-semibold uppercase leading-[0.95] tracking-tight text-[12.5vw] sm:text-[9vw] lg:text-[6.2vw]">
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
  const [range, setRange] = useState([-1, 1]); // okno vykreslených scén (rozšíří se při průletu)
  const [selected, setSelected] = useState(null);
  const [listOpen, setListOpen] = useState(false);
  const centerRef = useRef(0);
  const pos = useMotionValue(0); // pozice vůči středu (ve scénách)
  const busyRef = useRef(false);
  const jumpRef = useRef(null);
  const firstDone = useRef(false);

  useEffect(() => {
    firstDone.current = true;
  }, []);

  // souvislý nekonečný pás — pozice 0 zobrazuje střed okna
  const x = useTransform(pos, (v) => `${-(v - range[0]) * 100}%`);
  const offsets = [];
  for (let o = range[0]; o <= range[1]; o++) offsets.push(o);

  const settle = (nc) => {
    centerRef.current = nc;
    setCenter(nc);
    pos.set(0);
    setRange([-1, 1]);
  };

  const afterMove = () => {
    busyRef.current = false;
    if (jumpRef.current != null && wrap(jumpRef.current - centerRef.current) !== 0) {
      const t = jumpRef.current;
      jumpRef.current = null;
      jump(t);
    }
  };

  // autoplay — jednotlivý krok
  const step = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBgIndex(wrap(centerRef.current + 1));
    await animate(pos, 1, { duration: 1.15, ease: EASE }).finished;
    settle(wrap(centerRef.current + 1));
    afterMove();
  };

  // ruční výběr — JEDEN plynulý průlet přes mezilehlé scény, bez zastavování
  const jump = async (target) => {
    if (busyRef.current) {
      jumpRef.current = target;
      return;
    }
    const delta = wrap(target - centerRef.current);
    const fwd = delta;
    const back = N - delta;
    if (fwd === 0) return;
    const d = fwd <= back ? fwd : -back;
    busyRef.current = true;
    setBgIndex(wrap(centerRef.current + d)); // barva pozadí se plynule přelije sama
    setRange([Math.min(-1, d - 1), Math.max(1, d + 1)]);
    await animate(pos, d, { duration: 0.45 + Math.abs(d) * 0.3, ease: "easeInOut" }).finished;
    settle(wrap(centerRef.current + d));
    afterMove();
  };

  // mobilní šipky — krok zpět (vpřed řeší autoplay step)
  const stepBack = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBgIndex(wrap(centerRef.current - 1));
    await animate(pos, -1, { duration: 1.15, ease: EASE }).finished;
    settle(wrap(centerRef.current - 1));
    afterMove();
  };

  const go = (target) => jump(target);

  // automatické přepínání po 3 s — jede pořád dokola, bez pauzy při najetí myší
  useEffect(() => {
    if (selected || listOpen) return;
    const t = setTimeout(() => step(), 3000);
    return () => clearTimeout(t);
  }, [center, selected, listOpen]);

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

  // parallaxa kurzorem (jen slider — v detailu vypnutá na přání)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });

  const selLayout = selected ? LAYOUT[selected.id] || {} : {};
  const [detailMain, detailExtra] = selected
    ? DETAIL_SIZE[selected.id] ?? ["w-[56vmin] lg:w-[24vw]", "w-[46vmin] lg:w-[19vw]"]
    : [];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  // plovoucí panel detailu — nedotýká se okrajů, blíž hornímu okraji
  const panelInitial = isMobile
    ? { top: "34%", left: "50%", x: "-50%", y: "-50%", width: "86vmin", height: "86vmin", borderRadius: 40 }
    : { top: "46%", left: "50%", x: "-50%", y: "-50%", width: "62vmin", height: "62vmin", borderRadius: 40 };
  const panelTarget = isMobile
    ? { top: "5%", left: "6%", x: "0%", y: "0%", width: "88%", height: "44%", borderRadius: 24 }
    : { top: "10%", left: "54%", x: "0%", y: "0%", width: "42%", height: "68%", borderRadius: 28 };

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

      {/* TEST: luxusní stín přes barvy scén (tlumení + vinětace) — pro návrat odstranit tyto dva div */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-ink/25" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 38%, transparent 42%, rgba(33,30,27,0.25) 100%)" }}
      />

      <motion.div style={{ x }} className="relative flex h-full w-full">
        {offsets.map((o) => {
          const i = wrap(center + o);
          return (
            <div key={SCENES[i].id} className="h-full w-full shrink-0">
              <Slide scene={SCENES[i]} idx={i} smx={smx} smy={smy} hidden={!!selected && i === center} instant={firstDone.current} />
            </div>
          );
        })}
      </motion.div>

      {/* tlačítko Více — desktop: obdélník se zaoblenými rohy, zarovnaný s jednoslovným nápisem */}
      <button
        data-testid={`product-detail-open-${active.id}`}
        onClick={() => setSelected(active)}
        className="group absolute bottom-[12vh] right-[8%] z-20 hidden transition-transform duration-500 hover:scale-105 lg:block"
        style={{ color: ink }}
      >
        <span className="relative block px-8 py-4 text-base font-semibold uppercase tracking-[0.3em]">
          <span
            aria-hidden
            className="absolute inset-0 rounded-2xl border transition-transform duration-700 ease-out group-hover:-rotate-3 group-hover:scale-110"
            style={{ borderColor: `${ink}75` }}
          />
          <span aria-hidden className="absolute inset-0 rounded-2xl bg-current opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
          <span className="relative flex items-center gap-2">
            Více
            <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1.5" />
          </span>
        </span>
      </button>

      {/* mobil: menší statické Více v pravém dolním rohu (bez hover animace — na dotyku nemá smysl) */}
      <button
        data-testid="product-detail-open-mobile"
        onClick={() => setSelected(active)}
        className="absolute bottom-24 right-5 z-20 rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] lg:hidden"
        style={{ color: ink, borderColor: `${ink}75` }}
      >
        Více
      </button>

      {/* mobil: šipky vpřed/vzad + přehled všech produktů (roleťka je na mobilu skrytá) */}
      <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 lg:hidden" style={{ color: ink }}>
        <button
          data-testid="mobile-prev-button"
          aria-label="Předchozí produkt"
          onClick={stepBack}
          className="flex h-10 w-10 items-center justify-center rounded-full border"
          style={{ borderColor: `${ink}60` }}
        >
          <ChevronLeft size={17} />
        </button>
        <button
          data-testid="mobile-next-button"
          aria-label="Další produkt"
          onClick={() => step()}
          className="flex h-10 w-10 items-center justify-center rounded-full border"
          style={{ borderColor: `${ink}60` }}
        >
          <ChevronRight size={17} />
        </button>
        <button
          data-testid="mobile-products-open"
          onClick={() => setListOpen(true)}
          className="ml-1 rounded-full border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ borderColor: `${ink}60` }}
        >
          Všechny produkty
        </button>
      </div>

      {/* mobil: překryvný seznam všech produktů */}
      <AnimatePresence>
        {listOpen && (
          <motion.div
            data-testid="mobile-product-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.35 }}
            className="grain fixed inset-0 z-40 flex flex-col bg-ink text-stone lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-stone/50">Všechny produkty</span>
              <button
                data-testid="mobile-product-list-close"
                onClick={() => setListOpen(false)}
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone/70"
              >
                Zavřít
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center overflow-y-auto px-5 pb-10">
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  data-testid={`mobile-product-item-${s.id}`}
                  onClick={() => {
                    setListOpen(false);
                    go(i);
                  }}
                  className="group flex items-baseline gap-4 border-b border-stone/10 py-3 text-left"
                >
                  <span className="text-[10px] tracking-[0.3em] text-stone/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-serif text-2xl leading-none ${i === center ? "italic" : ""}`}>{s.displayName}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* roletka produktů s časovačem — jen desktop (na mobilu šipky + seznam) */}
      <div className="absolute inset-x-0 bottom-[6vh] z-20 hidden justify-center lg:flex" style={{ color: ink }}>
        <div
          data-testid="slider-tabs"
          className="no-scrollbar flex max-w-full items-end justify-center gap-4 overflow-x-auto px-4 pb-1 pt-3 sm:gap-5 sm:px-8"
        >
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              data-testid={`slider-tab-${s.id}`}
              onClick={() => go(i)}
              className="relative shrink-0 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-opacity duration-300 sm:text-[11px]"
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

      {/* detail: plovoucí barevný obdélník s vycentrovaným ovocem, text vlevo na barvě webu */}
      <AnimatePresence>
        {selected && (
          <motion.div
            data-testid="product-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.35 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: STONE, color: INK }}
          >
            {/* barevný panel s produktem — plovoucí, mimo okraje */}
            <motion.div
              initial={panelInitial}
              animate={panelTarget}
              exit={panelInitial}
              transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
              className="absolute overflow-hidden"
              style={{ backgroundColor: selected.sceneBg }}
            >
              {/* TEST: stejný luxusní stín i v panelu detailu */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-ink/20" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 45%, rgba(33,30,27,0.3) 100%)" }}
              />
              <div className="flex h-full items-center justify-center">
                <motion.div layoutId={`art-${selected.id}`} transition={{ duration: 0.65, ease: EASE }}>
                  {/* bez parallax za myší — statická kompozice, zvětšená dle druhu */}
                  <div className="flex items-center justify-center">
                    <motion.div style={{ rotate: selLayout.rot ?? 0 }}>
                      <ProductArt id={selected.id} className={`h-auto ${detailMain}`} />
                    </motion.div>
                    {selLayout.extra !== false && (
                      <motion.div style={{ rotate: selLayout.extraRot ?? 10 }} className="-ml-[10%] mt-[8%]">
                        <ExtraArt id={selected.id} className={`h-auto ${detailExtra}`} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* text vlevo na barvě webu */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.75 }}
              className="relative flex items-center px-5 pb-20 pt-[58svh] sm:px-12 lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-1/2 lg:py-24"
            >
              <div className="max-w-lg">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/55">
                  {selected.categoryName} · {selected.latin}
                </p>
                <h3 className="mt-3 font-display font-semibold uppercase leading-[0.95] tracking-tight text-5xl text-ink sm:text-6xl">
                  {selected.name.split(" ").map((w, i) => (
                    <span key={i} className="mr-[0.24em] inline-block last:mr-0">
                      {w}
                    </span>
                  ))}
                </h3>
                <p className="mt-4 font-serif text-xl italic font-light text-ink/75">{selected.subtitle}</p>
                <p className="mt-6 text-sm leading-relaxed text-ink/75 sm:text-base">{selected.description}</p>

                {selected.usage && (
                  <p className="mt-4 font-serif text-sm font-light italic leading-relaxed text-ink/70 sm:text-base">
                    {selected.usage}
                  </p>
                )}

                {selected.orchard && (
                  <p className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ink/45">
                    <MapPin size={13} className="shrink-0" />
                    {selected.orchard}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.notes.map((n) => (
                    <span key={n} className="rounded-full border border-ink/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink/70">
                      {n}
                    </span>
                  ))}
                </div>

                <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-ink/60 sm:text-sm">
                  <Sprout size={15} className="mt-0.5 shrink-0" />
                  {selected.soil}
                </p>

                <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-ink/40">
                  TODO · Finální fotografický / 3D asset ve výrobě
                </p>
              </div>
            </motion.div>

            <motion.button
              data-testid="product-detail-close"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="fixed left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-ink/25 bg-stone px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink transition-transform hover:scale-105 sm:left-10"
            >
              <ArrowLeft size={14} /> Zpět
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
