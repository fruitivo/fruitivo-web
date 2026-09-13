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

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-sand">
        <motion.h1
          data-testid="secret-headline"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Vítejte v XXX.
          <br />
          <em className="font-light">Pod kořeny našich sadů roste ještě jeden nápad.</em>
        </motion.h1>

        <motion.p
          data-testid="secret-subline"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: "easeOut" }}
          className="mt-8 max-w-md text-sm text-sand/70 sm:text-base"
        >
          Co roste pod povrchem, zůstává mezi námi.
        </motion.p>

        <motion.button
          data-testid="secret-dismiss-button"
          type="button"
          onClick={onDismiss}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-14 rounded-full border border-sand/40 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-sand transition-colors duration-300 hover:bg-sand hover:text-[#160a24]"
        >
          Já nic nevím
        </motion.button>
      </div>
    </motion.div>
  );
};
