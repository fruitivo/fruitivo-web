# KOŘENY — homepage a katalog produktů (koncept-prototyp)

## Původní zadání
Homepage a struktura produktového katalogu fiktivní prémiové ovocné značky KOŘENY (obnova poškozené půdy → pěstování ovoce). Struktura a interakční vzor věrně podle delassus.com (filmový intro, minimální číslovaná navigace, fullscreen overlay menu, produktové scény s vlastní barvou, plovoucí produktové kompozice s parallaxou, plynulé přechody barev pozadí), ale s vlastní značkou, českými texty a jinými produkty. Veškerý viditelný text česky.

## Architektura
- React (CRA) + Tailwind + framer-motion + lenis (smooth scroll). Bez backendové logiky (statický koncept).
- `src/data/catalog.js` — jediný zdroj dat (kategorie, produkty, barvy scén, texty).
- `src/components/ProductArt.jsx` — dočasné vlastní vektorové ilustrace (TODO: nahradit reálnými assety; připravena abstrakce asset.type: image | frames | glb).
- `src/components/ProductScenes.jsx` — horizontální svět 17 produktových scén (sticky kontejner, scroll/drag → horizontální posuv, parallaxe vrstev kurzorem, deformace typografie rychlostí, mask-reveal detail produktu).
- Další: Navigation (fixní lišta + fullscreen overlay menu), Hero (filmový intro s odhalením písmen), Marquee, Roots (manifest), Orchards (TODO mapa), Journal, Footer, AmbientAudio (generativní ambient zvuk přes Web Audio API, defaultně ztlumený).

## Uživatelé
Návštěvníci prezentačního webu značky (zákazníci, partneři, tisk). Žádné role/login.

## Implementováno (10. 9. 2026)
- Filmový full-viewport hero: fotka pole + animovaná světelná vrstva, obří odhalované KOŘENY, statement, CTA, scroll cue, parallax.
- Fixní číslovaná navigace 01–05 + fullscreen overlay menu s velkou typografií a odkazy na kategorie.
- 17 produktových scén v 5 kategoriích — každá s vlastní plochou barvou pozadí, obřím slovem, plovoucí stylizovanou kompozicí produktu, satelitními prvky, počítadlem scény, tečkovým průběhem, drag interakcí.
- Detail produktu s mask-reveal (circle clip-path), chuťové poznámky, půda, TODO poznámka k assetu.
- Propojený pár Kakaové boby ↔ Čokoláda s kousky ovoce („od bobu ke tabulce").
- Sekce Příběh (kapitoly manifestu), Sady (placeholder interaktivní mapy s piny), Žurnál, patička s kontaktem.
- Generativní ambientní zvuk (vítr + ptactvo) — toggle vpravo dole, defaultně vypnutý.
- Responsivita (mobil/tablet/desktop), lazy-loading obrázků.

## Ověřeno
- Screenshoty: hero, scény (mango, dračí ovoce, kakao, čokoláda), detail overlay, overlay menu, mobilní hero/scéna/menu.
- Skok z kakaa na čokoládu přes „od bobu ke tabulce" funguje.
- Konzole bez chyb (po opravě fetchPriority).

## Zbývá / backlog
- P0: Reálné produktové assety (foto cut-outy, 360° spin nebo .glb) místо TODO ilustrací; skutečný intro film místo statické fotky.
- P1: Interaktivní mapa sadů (sekce Sady), skutečný ambientní zvukový záznam, reálné odkazy sociálních sítí.
- P2: Stránky produktů s plným obsahem, vícejazyčnost (EN), napojení žurnálu na CMS.

## Poznámky
- Žádné credentials nejsou potřeba (statický prototyp). /app/memory/test_credentials.md neobsahuje účty.
