import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_ITEMS, CATEGORIES, categoryStartIndex } from "../data/catalog";
import { EN } from "../data/en";
import { useLang, pick } from "../langContext";
import { useScroller } from "../scrollContext";

const EASE = [0.65, 0, 0.35, 1];

// elegantní přepínač jazyka — jen písmena, žádné vlajky; skoro nepovšimnutelný, stranou od záložek
const LangToggle = ({ lang, setLang, color, testidPrefix }) => (
  <div data-testid={testidPrefix} className="flex items-center text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color }}>
    <button
      data-testid={`${testidPrefix}-cs`}
      onClick={() => setLang("cs")}
      className={`transition-opacity duration-300 ${lang === "cs" ? "opacity-60" : "opacity-25 hover:opacity-60"}`}
    >
      CZ
    </button>
    <span className="mx-1 opacity-20">/</span>
    <button
      data-testid={`${testidPrefix}-en`}
      onClick={() => setLang("en")}
      className={`transition-opacity duration-300 ${lang === "en" ? "opacity-60" : "opacity-25 hover:opacity-60"}`}
    >
      EN
    </button>
  </div>
);

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useScroller();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
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

  const goCategory = (catId) => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("goto-scene", { detail: categoryStartIndex(catId) }));
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // barva textu navigace nad sliderem se přizpůsobí aktivní scéně (--nav-ink)
  const navColor = scrolled ? undefined : "var(--nav-ink, #EEEBE1)";

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? "border-b border-ink/10 bg-stone/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-10">
          <button
            data-testid="brand-home-button"
            onClick={() => go("#produkty")}
            style={{ color: navColor }}
            className={`font-display text-xl uppercase tracking-[0.12em] transition-colors duration-500 ${scrolled ? "text-ink" : ""}`}
          >
            Fruitivo
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                data-testid={`nav-link-${item.id}`}
                onClick={() => go(item.target)}
                style={{ color: navColor }}
                className={`group text-[11px] font-semibold uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-70 ${
                  scrolled ? "text-ink/75" : ""
                }`}
              >
                <span className="mr-1.5 opacity-50">{item.id}</span>
                {pick(lang, item.label, EN.nav[item.target])}
                <span className="mt-0.5 block h-px w-0 bg-current transition-[width] duration-300 group-hover:w-full" />
              </button>
            ))}
            <div className="ml-12">
              <LangToggle lang={lang} setLang={setLang} color={navColor} testidPrefix="lang-toggle" />
            </div>
          </nav>

          <div className="flex items-center gap-5 lg:hidden">
            <LangToggle lang={lang} setLang={setLang} color={navColor} testidPrefix="lang-toggle-mobile" />
            <button
              data-testid="menu-overlay-toggle"
              onClick={() => setOpen(true)}
              style={{ color: navColor }}
              className={`text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors duration-500 ${scrolled ? "text-ink" : ""}`}
            >
              Menu —
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="fullscreen-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.15 } }}
            className="grain fixed inset-0 z-50 flex flex-col bg-ink text-stone"
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-10">
              <span className="font-display text-xl uppercase tracking-[0.12em]">Fruitivo</span>
              <button
                data-testid="menu-overlay-close"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-stone/70 transition-colors hover:text-stone"
              >
                {pick(lang, "Zavřít", EN.ui.closeMenu)} <X size={16} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-5 sm:px-10">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.id} className="overflow-hidden border-b border-stone/10">
                  <motion.button
                    data-testid={`overlay-nav-link-${item.id}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.06 }}
                    onClick={() => go(item.target)}
                    className="group flex w-full items-baseline gap-5 py-4 text-left sm:py-5"
                  >
                    <span className="font-sans text-xs tracking-[0.3em] text-stone/40">{item.id}</span>
                    <span className="font-serif text-4xl leading-none transition-all duration-300 group-hover:translate-x-3 group-hover:italic group-hover:text-stone sm:text-6xl lg:text-7xl">
                      {pick(lang, item.label, EN.nav[item.target])}
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
              className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 pb-8 sm:px-10"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  data-testid={`overlay-category-${c.id}`}
                  onClick={() => goCategory(c.id)}
                  className="text-[11px] uppercase tracking-[0.2em] text-stone/50 transition-colors hover:text-stone"
                >
                  {pick(lang, c.name, EN.categories[c.id])}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
