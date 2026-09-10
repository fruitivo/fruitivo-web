import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowRight, Sprout, X } from "lucide-react";
import { CATEGORIES, SCENES, categoryStartIndex, sceneIndexOf } from "../data/catalog";
import { ProductArt, Satellites } from "./ProductArt";
import { useScroller } from "../scrollContext";

const EASE = [0.65, 0, 0.35, 1];
const N = SCENES.length;
const inkOf = (s) => (s.sceneInk === "dark" ? "#211E1B" : "#F5F3EC");

// ── jedna produktová scéna: plochá barva, obří typografie, plovoucí kompozice ──
const Scene = ({ scene, index, progress, smx, smy, skewX, stretch, onOpen, onJump, dragMovedRef }) => {
  const step = 1 / (N - 1);
  const mid = index * step;
  const ink = inkOf(scene);

  // jemná rotace produktu při průjezdu scénou (scroll-driven, eased)
  const rotate = useTransform(progress, [mid - step, mid, mid + step], [-16, 0, 16], { clamp: true });
  // parallaxní hloubkové vrstvy řízené kurzorem
  const ax = useTransform(smx, (v) => v * 46);
  const ay = useTransform(smy, (v) => v * 30);
  const sx = useTransform(smx, (v) => v * 84);
  const sy = useTransform(smy, (v) => v * 58);
  const tx = useTransform(smx, (v) => v * -26);
  const ty = useTransform(smy, (v) => v * -16);

  const linked = scene.linkedId ? SCENES.find((s) => s.id === scene.linkedId) : null;

  return (
    <section
      data-testid={`scene-${scene.id}`}
      className="relative h-full w-screen shrink-0 overflow-hidden"
      style={{ backgroundColor: scene.sceneBg, color: ink }}
    >
      {/* obří slovo pozadí — deformuje se při posunu */}
      <motion.div
        style={{ x: tx, y: ty }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          style={{ skewX, scaleY: stretch }}
          className="select-none whitespace-nowrap font-display lowercase leading-none tracking-tight text-[24vw] lg:text-[19vw]"
        >
          {scene.name.split(" ")[0]}
        </motion.span>
      </motion.div>

      {/* satelitní plovoucí prvky */}
      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute inset-0 hidden sm:block">
        <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <Satellites ink={ink} />
        </svg>
      </motion.div>

      {/* plovoucí produktová kompozice */}
      <motion.div style={{ x: ax, y: ay }} className="absolute inset-0 flex items-center justify-center">
        <motion.div style={{ rotate }} className="w-[64vmin] max-w-[520px]">
          <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
            <ProductArt id={scene.id} className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.18)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* rozhraní scény */}
      <div className="absolute left-5 top-20 sm:left-10 sm:top-24">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] opacity-60">{scene.categoryName}</p>
        <p className="mt-1 font-serif italic text-lg opacity-80">{scene.subtitle}</p>
      </div>

      <div className="absolute bottom-6 left-5 sm:bottom-10 sm:left-10">
        <p className="font-display text-3xl sm:text-4xl leading-none">
          {String(index + 1).padStart(2, "0")}
          <span className="text-lg opacity-50"> / {N}</span>
        </p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] opacity-60">{scene.latin}</p>
      </div>

      <div className="absolute bottom-6 right-5 flex flex-col items-end gap-3 sm:bottom-10 sm:right-10">
        {linked && (
          <button
            data-testid="linked-bean-to-bar-badge"
            onClick={() => !dragMovedRef.current && onJump(linked.id)}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-transform duration-300 hover:scale-105"
            style={{ borderColor: `${ink}55` }}
          >
            od bobu ke tabulce <ArrowRight size={13} />
          </button>
        )}
        <button
          data-testid={`product-detail-open-${scene.id}`}
          onClick={() => !dragMovedRef.current && onOpen(scene)}
          className="rounded-full border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 hover:gap-3"
          style={{ borderColor: `${ink}66`, backgroundColor: `${ink}0d` }}
        >
          detail +
        </button>
      </div>
    </section>
  );
};

// ── horizontální svět scén ────────────────────────────────────────────────────
export const ProductScenes = () => {
  const outerRef = useRef(null);
  const lenis = useScroller();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const activeRef = useRef(0);
  const dragRef = useRef(null);
  const dragMovedRef = useRef(false);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 95, damping: 26, mass: 0.7 });
  const x = useTransform(smooth, [0, 1], ["0vw", `-${(N - 1) * 100}vw`]);

  // deformace typografie podle rychlosti posunu
  const vel = useVelocity(smooth);
  const skewX = useTransform(vel, [-0.8, 0.8], [9, -9]);
  const stretch = useTransform(vel, (v) => 1 + Math.min(Math.abs(v) * 0.4, 0.2));

  // kurzor pro parallaxu
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });

  useMotionValueEvent(smooth, "change", (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    if (i !== activeRef.current) {
      activeRef.current = i;
      setActive(i);
    }
  });

  const scrollToScene = (i) => {
    const top = outerRef.current.getBoundingClientRect().top + window.scrollY;
    const target = top + i * window.innerHeight;
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    dragRef.current = { x: e.clientX, scroll: window.scrollY };
  };
  const onPointerMove = (e) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) dragMovedRef.current = true;
    if (dragMovedRef.current && lenis) lenis.scrollTo(d.scroll - dx * 2.4, { immediate: true });
  };
  const onPointerUp = () => {
    dragRef.current = null;
    setTimeout(() => (dragMovedRef.current = false), 120);
  };

  const activeScene = SCENES[active];
  const ink = inkOf(activeScene);

  return (
    <div ref={outerRef} className="relative" style={{ height: `${N * 100}vh` }} data-testid="product-scenes">
      {/* kotvy kategorií pro navigaci */}
      {CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          id={`kategorie-${cat.id}`}
          className="absolute w-full"
          style={{ top: `${categoryStartIndex(cat.id) * 100}vh` }}
        />
      ))}

      <div
        className="sticky top-0 h-screen cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <motion.div style={{ x, width: `${N * 100}vw` }} className="flex h-full">
          {SCENES.map((scene, i) => (
            <Scene
              key={scene.id}
              scene={scene}
              index={i}
              progress={smooth}
              smx={smx}
              smy={smy}
              skewX={skewX}
              stretch={stretch}
              onOpen={setSelected}
              onJump={(id) => scrollToScene(sceneIndexOf(id))}
              dragMovedRef={dragMovedRef}
            />
          ))}
        </motion.div>

        {/* průběh — tečky scén */}
        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex" style={{ color: ink }}>
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              data-testid={`scene-dot-${s.id}`}
              aria-label={s.displayName}
              onClick={() => scrollToScene(i)}
              className="rounded-full bg-current transition-all duration-300"
              style={{ width: 8, height: i === active ? 26 : 8, opacity: i === active ? 1 : 0.35 }}
            />
          ))}
        </div>

        {/* nápověda posunu na první scéně */}
        <AnimatePresence>
          {active === 0 && !selected && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.35em] sm:bottom-10"
              style={{ color: ink }}
            >
              ← posouvej · táhni →
            </motion.p>
          )}
        </AnimatePresence>
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
            className="fixed inset-0 z-50 overflow-y-auto grain"
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
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto w-full max-w-md"
              >
                <ProductArt id={selected.id} className="h-auto w-full" />
              </motion.div>

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
                      setTimeout(() => scrollToScene(sceneIndexOf(target)), 350);
                    }}
                    className="group mt-8 flex items-center gap-3 rounded-2xl border p-4 pr-6 text-left transition-transform duration-300 hover:scale-[1.02]"
                    style={{ borderColor: `${inkOf(selected)}45` }}
                  >
                    <span className="h-12 w-12 shrink-0 overflow-hidden rounded-full border" style={{ borderColor: `${inkOf(selected)}33` }}>
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
    </div>
  );
};
