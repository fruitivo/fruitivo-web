import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_ITEMS, CATEGORIES } from "../data/catalog";
import { useScroller } from "../scrollContext";

const EASE = [0.65, 0, 0.35, 1];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useScroller();
  const openRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    openRef.current = open;
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const go = (target) => {
    setOpen(false);
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6 });
      else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? "bg-stone/85 backdrop-blur-md border-b border-ink/10" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-10 py-4">
          <button
            data-testid="brand-home-button"
            onClick={() => go("#hero")}
            className={`font-serif text-xl tracking-[0.18em] font-medium transition-colors duration-500 ${scrolled ? "text-ink" : "text-stone"}`}
          >
            KOŘENY<sup className="text-[0.5em] align-super">®</sup>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                data-testid={`nav-link-${item.id}`}
                onClick={() => go(item.target)}
                className={`group text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors duration-500 ${
                  scrolled ? "text-ink/70 hover:text-ink" : "text-stone/80 hover:text-stone"
                }`}
              >
                <span className="opacity-50 mr-1.5">{item.id}</span>
                {item.label}
                <span className="block h-px w-0 group-hover:w-full bg-current transition-[width] duration-300 mt-0.5" />
              </button>
            ))}
          </nav>

          <button
            data-testid="menu-overlay-toggle"
            onClick={() => setOpen(true)}
            className={`text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors duration-500 ${
              scrolled ? "text-ink" : "text-stone"
            }`}
          >
            Menu —
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="fullscreen-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.15 } }}
            className="fixed inset-0 z-50 bg-ink text-stone grain flex flex-col"
          >
            <div className="flex items-center justify-between px-5 sm:px-10 py-4">
              <span className="font-serif text-xl tracking-[0.18em]">KOŘENY<sup className="text-[0.5em] align-super">®</sup></span>
              <button
                data-testid="menu-overlay-close"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-semibold text-stone/70 hover:text-stone transition-colors"
              >
                Zavřít <X size={16} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-5 sm:px-10">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.id} className="overflow-hidden border-b border-stone/10">
                  <motion.button
                    data-testid={`overlay-nav-link-${item.id}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.06 }}
                    onClick={() => go(item.target)}
                    className="group flex items-baseline gap-5 py-4 sm:py-5 text-left w-full"
                  >
                    <span className="text-xs tracking-[0.3em] text-stone/40 font-sans">{item.id}</span>
                    <span className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-none transition-all duration-300 group-hover:italic group-hover:translate-x-3 group-hover:text-stone">
                      {item.label}
                    </span>
                  </motion.button>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45 }}
              className="px-5 sm:px-10 pb-8 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  data-testid={`overlay-category-${c.id}`}
                  onClick={() => go(`#kategorie-${c.id}`)}
                  className="text-[11px] tracking-[0.2em] uppercase text-stone/50 hover:text-stone transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
