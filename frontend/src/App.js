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
import { Process } from "./components/Process";
import { Footer } from "./components/Footer";
import { AmbientAudio } from "./components/AmbientAudio";
import { SecretOverlay } from "./components/SecretOverlay";

function App() {
  const [lenis, setLenis] = useState(null);
  const [secretMode, setSecretMode] = useState(false);

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
          <ProductSlider />
          <Marquee />
          <Roots />
          <Orchards />
          <Process />
        </main>
        <Footer onUnlockSecret={() => setSecretMode(true)} />
        <AmbientAudio />
        <AnimatePresence>
          {secretMode && <SecretOverlay onDismiss={() => setSecretMode(false)} />}
        </AnimatePresence>
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
