import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Generativní ambientní zvuk (vítr + ptactvo) přes Web Audio API.
// TODO(AUDIO): nahradit nahrávkou skutečného sadu, až bude k dispozici.
export const AmbientAudio = () => {
  const [on, setOn] = useState(false);
  const engine = useRef(null);

  const start = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // vítr: hnědý šum přes nízkopásmový filtr
    const len = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (last + 0.02 * white) / 1.02;
      last = data[i];
      data[i] *= 3.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 340;
    const windGain = ctx.createGain();
    windGain.gain.value = 0;

    // pomalé vlnění větru
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.018;
    lfo.connect(lfoGain).connect(windGain.gain);

    noise.connect(filter).connect(windGain).connect(ctx.destination);
    noise.start();
    lfo.start();
    windGain.gain.setTargetAtTime(0.05, ctx.currentTime, 1.5);

    // občasné cvrlikání ptáků
    const birdTimer = setInterval(() => {
      if (Math.random() < 0.55) return;
      const t = ctx.currentTime;
      const chirps = 1 + Math.floor(Math.random() * 3);
      for (let c = 0; c < chirps; c++) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        const start = t + c * (0.14 + Math.random() * 0.08);
        const f0 = 2200 + Math.random() * 1400;
        osc.frequency.setValueAtTime(f0, start);
        osc.frequency.exponentialRampToValueAtTime(f0 * (1.15 + Math.random() * 0.35), start + 0.07);
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(0.022, start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
        osc.connect(g).connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.15);
      }
    }, 3800);

    engine.current = { ctx, windGain, birdTimer };
  };

  const stop = () => {
    const e = engine.current;
    if (!e) return;
    clearInterval(e.birdTimer);
    e.windGain.gain.setTargetAtTime(0, e.ctx.currentTime, 0.3);
    setTimeout(() => e.ctx.close(), 900);
    engine.current = null;
  };

  useEffect(() => () => stop(), []);

  const toggle = () => {
    if (on) stop();
    else start();
    setOn(!on);
  };

  return (
    <button
      data-testid="ambient-sound-toggle"
      onClick={toggle}
      aria-label={on ? "Vypnout zvuk okolí" : "Zapnout zvuk okolí"}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-stone/85 backdrop-blur-md text-ink transition-all duration-300 hover:scale-105 hover:bg-stone shadow-[0_8px_30px_rgba(33,30,27,0.12)]"
    >
      {on ? <Volume2 size={17} strokeWidth={1.75} /> : <VolumeX size={17} strokeWidth={1.75} />}
    </button>
  );
};
