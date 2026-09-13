import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollContext } from "../scrollContext";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { delay, duration: 0.9, ease: "easeOut" },
});

export const SecretOverlay = ({ onDismiss }) => {
  const lenis = useContext(ScrollContext);

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  return (
    <motion.div
      data-testid="secret-overlay"
      className="fixed inset-0 z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.0, ease: "easeInOut" } }}
      exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
    >
      {/* pozadí první obrazovky — placeholder vizuál nasvícený fialovým světlem (TODO: finální asset) */}
      <div aria-hidden className="absolute inset-0 bg-[#160a24]" />
      <img
        src="/assets/secret-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, rgba(22,10,36,0.25) 30%, rgba(22,10,36,0.88) 100%)",
        }}
      />

      {/* vlastní scroll uvnitř overlaye (hlavní Lenis je pozastaven) */}
      <div data-lenis-prevent className="relative z-10 h-full overflow-y-auto">
        {/* ÚVODNÍ OBRAZOVKA — jen nadpis a kurzíva, vzdušně */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-sand">
          <motion.h1
            data-testid="secret-headline"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
            className="max-w-4xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Vítejte v XXX.
          </motion.h1>
          <motion.p
            data-testid="secret-headline-em"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: "easeOut" }}
            className="mt-24 max-w-3xl font-serif text-2xl font-light italic leading-snug tracking-tight text-sand/90 sm:mt-32 sm:text-4xl"
          >
            Sady nahoře. Byznys dole.
          </motion.p>
        </section>

        {/* OBSAH — stejný rytmus a design jako hlavní web, na tmavém fialovém */}
        <div className="grain relative bg-[#160a24] text-sand">
          <section className="relative z-10 mx-auto max-w-6xl px-6 pt-28 sm:pt-36">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <motion.p
                  {...fadeUp()}
                  className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-sand/40"
                >
                  01 · Vedlejší projekt
                </motion.p>
                <motion.h2
                  data-testid="secret-subline"
                  {...fadeUp(0.1)}
                  className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-5xl"
                >
                  Diverzifikace portfolia má i svoje <em className="font-light">tišší kapitoly.</em>
                </motion.h2>
                <motion.p
                  data-testid="secret-paragraph"
                  {...fadeUp(0.2)}
                  className="mt-12 max-w-[60ch] text-sm leading-relaxed text-sand/60 sm:text-base"
                >
                  Ve dne jsme sad jako každý jiný — turisté, degustace, laborantky
                  v gumových holínkách. Ale jakmile slunce zajde, začíná směna, o které
                  se nepíše do výroční zprávy. Hluboko pod kořeny, tam, kde končí naše
                  oficiální mapa pozemku, mají naši nejzkušenější lidé druhé zaměstnání.
                  Žádná fotodokumentace, žádné degustace pro veřejnost, žádné „ochutnejte
                  a napište recenzi". Jen tichá, precizní práce a produkt, který mluví
                  sám za sebe — pro toho, kdo ví, koho se zeptat.
                  <br />
                  <br />
                  Nazýváme to diverzifikací portfolia. Účetní tomu říkají jinak, ale
                  účetní se stejně nikdy nedostanou dál než do vzorkovny.
                </motion.p>
              </div>

              <motion.div
                data-testid="secret-photo"
                {...fadeUp(0.25)}
                className="relative overflow-hidden rounded-2xl border border-sand/15"
              >
                <img
                  src="/assets/secret-leaf.jpg"
                  alt="List nasvícený fialovým světlem"
                  className="block h-auto w-full object-cover"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(22,10,36,0.5) 100%)" }}
                />
              </motion.div>
            </div>
          </section>

          {/* slogan + návrat */}
          <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-28 pt-32 text-center sm:pt-40">
            <motion.p
              data-testid="secret-tagline"
              {...fadeUp()}
              className="max-w-2xl font-serif text-2xl font-light italic leading-snug tracking-tight text-sand/85 sm:text-3xl"
            >
              XXX. Nejlepší úroda roste tam, kam se nikdo nedívá.
            </motion.p>
            <motion.button
              data-testid="secret-dismiss-button"
              {...fadeUp(0.15)}
              type="button"
              onClick={onDismiss}
              className="mt-16 rounded-full border border-sand/40 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-sand transition-colors duration-300 hover:bg-sand hover:text-[#160a24]"
            >
              Zapomeňte, co jste viděli
            </motion.button>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
