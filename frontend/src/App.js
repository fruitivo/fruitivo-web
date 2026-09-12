import { useEffect, useState } from "react";
import Lenis from "lenis";
import "@/App.css";
import { ScrollContext } from "./scrollContext";
import { Navigation } from "./components/Navigation";
import { ProductSlider } from "./components/ProductSlider";
import { Marquee } from "./components/Marquee";
import { Roots } from "./components/Roots";
import { Orchards } from "./components/Orchards";
import { Journal } from "./components/Journal";
import { Footer } from "./components/Footer";
import { AmbientAudio } from "./components/AmbientAudio";

function App() {
  const [lenis, setLenis] = useState(null);

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
          <Journal />
        </main>
        <Footer />
        <AmbientAudio />
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
