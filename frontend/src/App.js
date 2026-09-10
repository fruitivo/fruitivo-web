import { useEffect, useState } from "react";
import Lenis from "lenis";
import "@/App.css";
import { ScrollContext } from "./scrollContext";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Roots } from "./components/Roots";
import { Orchards } from "./components/Orchards";
import { ProductCatalog } from "./components/ProductCatalog";
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
          <Hero />
          <Marquee />
          <Roots />
          <Orchards />
          <ProductCatalog />
          <Journal />
        </main>
        <Footer />
        <AmbientAudio />
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
