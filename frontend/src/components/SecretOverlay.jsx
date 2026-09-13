import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollContext } from "../scrollContext";

export const SecretOverlay = ({ onDismiss }) => {
  const lenis = useContext(ScrollContext);

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  return (
    <motion.div
      data-testid="secret-overlay"
      className="grain fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.0, ease: "easeInOut" } }}
      exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
    >
      {/* pozadí — placeholder vizuál nasvícený fialovým světlem (TODO: finální asset) */}
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

      <div className="relative z-10 flex h-full flex-col items-center justify-center overflow-y-auto px-6 py-16 text-center text-sand">
        <motion.h1
          data-testid="secret-headline"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Vítejte v XXX.
          <br />
          <em className="font-light">Vedlejší projekt, o kterém se nemluví na valné hromadě.</em>
        </motion.h1>

        <motion.p
          data-testid="secret-subline"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: "easeOut" }}
          className="mt-8 text-sm text-sand/70 sm:text-base"
        >
          Diverzifikace portfolia má i svoje tišší kapitoly.
        </motion.p>

        <motion.p
          data-testid="secret-paragraph"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="mt-10 max-w-[60ch] text-sm leading-relaxed text-sand/60"
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

        <motion.p
          data-testid="secret-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
          className="mt-10 font-serif text-sm italic text-sand/70"
        >
          XXX. Nejlepší úroda roste tam, kam se nikdo neptá.
        </motion.p>

        <motion.button
          data-testid="secret-dismiss-button"
          type="button"
          onClick={onDismiss}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-14 rounded-full border border-sand/40 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-sand transition-colors duration-300 hover:bg-sand hover:text-[#160a24]"
        >
          Já nic nevím
        </motion.button>
      </div>
    </motion.div>
  );
};
