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

## Implementováno
### 12. 9. 2026 — velké kompozice na míru, bílý text, pomalejší přejíždění
- Produkty zvětšeny (základ ~44–56 vmin) a každý má vlastní layout (LAYOUT mapa v ProductSlider.jsx): scale + natočení + druhý kus / více kusů. Vodní meloun = jeden velký kus, mochyně = hlavní plod + dvě menší vedle, vše s jemným houpavým natáčením („kontrolovaný chaos").
- Všechny texty slideru i detailu jednotně bílé (#F5F3EC) na všech barvách scén.
- Značka XXX capslockem a větší (hlavička, overlay menu, patička).
- Přejíždění scén zpomaleno: běžný krok 1,15 s, průjezd mezilehlými 0,55 s/krok.

### 12. 9. 2026 — souvislý nekonečný slider, jen rostliny
- Katalog zúžen na 14 rostlinných produktů (odebrána kategorie Zpracované produkty — smoothie, kakao, čokoláda). Nové pořadí: Klasické sady → Citrusy → Tropické ovoce → Vzácné a divoké.
- Slider přepsán na souvislý pás 3 sousedních scén (motion value + animate) — nekonečná smyčka dokola, přechody jsou čisté dva barevné scény bez bílých pásů.
- Klik na vzdálenější produkt v roletce = rychlý průjezd všemi mezilehlými produkty (0,32 s/krok) a zastavení na cíli; autoplay 3 s jede trvale (zrušena pauza při najetí myší, pauza jen při otevřeném detailu).
- Rozložení scény: produkt NAD názvem, název CAPS LOCK celý viditelný; „Objevit" vpravo nad roletkou.
- Detail: produkt animací (layoutId) odletí doprava, vlevo název + informace; parallaxa myší zachována i v detailu; „Zpět" vrátí do slideru a roletka pokračuje.

### 12. 9. 2026 — minimalizace slideru + nová typografie
- Písmo produktových názvů: Clash Display (Fontshare), názvy CAPS LOCK přes produkt — produkt je ve vrstvě PŘED textem, aby byl vždy vidět.
- Produktová kompozice zvětšena (celek ~64vmin + půlka/kousek ~26vmin).
- Slider obsahuje POUZE: produkt, název, roletku názvů s časovačem (zvednutou pod kompozici) a odkaz „Objevit". Odstraněny popisky, kategorie, počítadlo a šipky ze scény.
- Detail = statická informační stránka: klik na „Objevit" → produkt animací (layoutId shared-element) „přeletí/zvětší" se do detailu, kolem něj text (kategorie, latinsky, podtitul, popis, poznámky, půda, pár bob→tabulka). Tlačítko „Zpět" → produkt se animací vrátí a roletka i auto-přepínání pokračují.

### 12. 9. 2026 — přestavba dle zpětné vazby
- Název značky zatím odstraněn → placeholder „xxx" (navigace, overlay menu, patička, titulek stránky, e-mail).
- Produkty jsou nyní PRVNÍ obsah stránky: pevný full-viewport slider místo scroll-driven scén. Automatické přepínání po 3 s (posuv do boku), pauza při najetí myší / otevřeném detailu, ruční přepínání řadou názvů produktů dole + šipkami; normální scroll stránky pod sliderem zůstává volný.
- Nové rozložení scény: vlevo kompozice více kusů produktu (celek + půlka/kousek, vlastní SVG ilustrace, parallaxa kurzorem, idle plování), vpravo obří název, latinský název, popis, chuťové poznámky, tlačítko detailu.
- Barva textu navigace se přizpůsobuje aktivní scéně (CSS proměnná --nav-ink).
- Odstraněn hero s polem a původní horizontální scroll-svět; zachováno: marquee, Příběh, Sady (TODO mapa), Žurnál, patička, ambientní zvuk, overlay menu, detail produktu s mask-reveal, pár kakao ↔ čokoláda.

### 10. 9. 2026 — první verze
- Filmový hero, číslovaná navigace, horizontální produktové scény řízené scrollem, manifest, sady, žurnál, patička, generativní ambientní zvuk.

## Ověřeno
- Screenshoty: slider nahoře (auto-přepnutí mango → papája → liči), ruční přepnutí na vodní meloun a kakao, skok „od bobu ke tabulce" na čokoládu (17/17), volný scroll do sekcí pod sliderem, mobilní zobrazení, overlay menu.
- Konzole bez chyb.

## Zbývá / backlog
- P0: Reálné produktové assety (foto cut-outy, 360° spin nebo .glb) místо TODO ilustrací; skutečný intro film místo statické fotky.
- P1: Interaktivní mapa sadů (sekce Sady), skutečný ambientní zvukový záznam, reálné odkazy sociálních sítí.
- P2: Stránky produktů s plným obsahem, vícejazyčnost (EN), napojení žurnálu na CMS.

## Poznámky
- Žádné credentials nejsou potřeba (statický prototyp). /app/memory/test_credentials.md neobsahuje účty.
