import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import "@/App.css";
import { ScrollContext } from "./scrollContext";
import { Navigation } from "./components/Navigation";
import { ProductSlider } from "./components/ProductSlider";
import { Marquee } from "./components/Marquee";
import { Roots } from "./components/Roots";
import { Orchards } from "./components/Orchards";
import { Harvest } from "./components/Harvest";
import { Process } from "./components/Process";
import { Footer } from "./components/Footer";
import { AmbientAudio } from "./components/AmbientAudio";
import { SecretOverlay } from "./components/SecretOverlay";

function App() {
  const [lenis, setLenis] = useState(null);
  const [secretMode, setSecretMode] = useState(false);
  const [orchardFocus, setOrchardFocus] = useState(null);
  const [productFocus, setProductFocus] = useState(null);

  // detail produktu → klik na sad: zavřít detail, srolovat na mapu a vybrat značku
  const openOrchard = (name) => {
    setOrchardFocus({ name, at: Date.now() });
    setTimeout(() => lenis?.scrollTo("#sady", { duration: 1.4 }), 250);
  };

  // panel sadu → „Zobrazit plodiny": srolovat nahoru a přepnout slider na ovoce
  const showProduct = (productId) => {
    setProductFocus({ id: productId, at: Date.now() });
    lenis?.scrollTo(0, { duration: 1.4 });
  };

  useEffect(() => {
    const instance = new Lenis({ lerp: 0.09, smoothWheel: true, autoRaf: true });
    setLenis(instance);
    return () => instance.destroy();
  }, []);

  return (
    <ScrollContext.Provider value={lenis}>
      <div className="App bg-stone text-ink">
        <Navigation />
        <main>
          <ProductSlider onOpenOrchard={openOrchard} focus={productFocus} />
          <Marquee />
          <Roots />
          <Orchards focus={orchardFocus} onShowProduct={showProduct} />
          <Harvest onOpenOrchard={openOrchard} />
          <Process />
        </main>
        <Footer onUnlockSecret={() => setSecretMode(true)} />
        <AmbientAudio />
        <AnimatePresence>
          {secretMode && (
            <SecretOverlay
              onDismiss={() => {
                setSecretMode(false);
                // návrat na začátek hlavní stránky (force = i když je Lenis ještě pozastaven overlayem)
                if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
                else window.scrollTo(0, 0);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
