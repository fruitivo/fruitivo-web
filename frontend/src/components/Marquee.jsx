import { MARQUEE_TEXT } from "../data/catalog";

export const Marquee = () => {
  const row = MARQUEE_TEXT.repeat(3);
  return (
    <div data-testid="editorial-marquee" className="overflow-hidden border-y border-ink/10 bg-stone py-5 select-none">
      <div className="marquee-track flex whitespace-nowrap">
        {[0, 1].map((half) => (
          <span key={half} aria-hidden={half === 1} className="font-serif text-2xl sm:text-3xl tracking-tight text-ink/80 pr-2">
            {row.split("•").map((chunk, i) => (
              <span key={i} className={i % 2 ? "italic font-light" : ""}>
                {chunk}
                {i < row.split("•").length - 1 && <span className="text-ink/30 not-italic"> • </span>}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};
