import { motion } from "framer-motion";
import { CATEGORIES } from "../data/catalog";
import { ProductScenes } from "./ProductScenes";
import { useScroller } from "../scrollContext";

const EASE = [0.65, 0, 0.35, 1];

export const ProductCatalog = () => {
  const lenis = useScroller();
  const go = (target) =>
    lenis ? lenis.scrollTo(target, { duration: 1.5 }) : document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div id="produkty" data-testid="product-catalog">
      <section className="bg-stone px-5 pb-20 pt-28 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/50"
          >
            03 · Produkty
          </motion.p>

          <h2 className="font-serif text-[13vw] leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: EASE }}
                className="block"
              >
                Svět <em className="font-light">sklizně</em>
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 max-w-lg text-sm leading-relaxed text-ink/65 sm:text-base"
          >
            Sedmnáct plodů, pět kategorií, jedna živá země. Posouvejte dál — každý produkt
            má svou scénu, svou barvu a svůj příběh půdy.
          </motion.p>

          <div className="mt-12 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                data-testid={`category-tab-${c.id}`}
                onClick={() => go(`#kategorie-${c.id}`)}
                className="group flex items-center gap-2.5 rounded-full border border-ink/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70 transition-all duration-300 hover:border-ink hover:text-ink"
              >
                <span
                  className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: c.accent }}
                />
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ProductScenes />
    </div>
  );
};
