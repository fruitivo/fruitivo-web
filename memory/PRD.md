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
### 12. 9. 2026 — oválné Objevit, průlet bez zastavení, čistý detail
- Tlačítko Objevit: větší, posunuté blíž ke středu (right ~15 %), s oválným obrysem, který se při najetí myší plynule pootočí, zvětší a jemně zvýrazní.
- Ruční skok na vzdálenější produkt = JEDEN souvislý rychlý průlet přes mezilehlé scény bez zastavování (rozšířené renderovací okno + jediná tween animace 0,45 + 0,3 s/scénu); barva pozadí se přelévá sama na cílový odstín.
- Detail produktu: žádná flora uvnitř panelu — jen vycentrovaný pár kusů ovoce; text vlevo na barvě webu.
- Flora ve scénách: 4 prvky (z 5 pozic, rotace dle indexu scény), vyšší viditelnost.
- Jemné doladění kreseb: banán (spodní stín), meloun (pruhy slupky), avokádo (faseta dužiny).

### 12. 9. 2026 — oprava Satellites, plovoucí panel, bez duplicit
- Oprava pádu náhledu: odstraněn zbytkový import Satellites (hláška „Satellites was not found in ./ProductArt") + restart frontendu pro vyčištění build cache.
- Panel detailu je plovoucí obdélník se zaoblením (28 px), nedotýká se okrajů (vpravo 4 %, shora 10 %, zdola 22 % — blíž hornímu okraji), na mobilu horní pás s okraji.
- Žádné duplicitní kusy: kiwi = celek + plátek, marakuja = celek + půlka, granátové jablko = celek + půlka, liči = červený plod + oloupané plody, limetka = celek + půlka (třetí kus zrušen), mochyně = lampionek + volná plodina.
- Ovoce ještě zvětšeno (pár ~47–56 vmin, meloun ~66 vmin).

### 12. 9. 2026 — panelový detail, dvojnásobné ovoce, rozptýlená flora
- Detail produktu přepsán: klik na Objevit → kolem produktu se vytvoří obdélník v barvě scény, který se plynule posune do pravé poloviny obrazovky (na mobilu horní pás); vlevo text na barvě webu (stone, tmavý ink). Celá animace = jen přesun + změna velikosti, bez záseků; Zpět animaci přehrává pozpátku.
- Ovoce ~2× zvětšené (pár kusů ~44–52 vmin, jednotlivý meloun ~64 vmin), název posunutý níž (pb-[13vh]).
- Flora: 5 různých pozic (FLORA_SPOTS), každá scéna dostane 3 z nich posunuté dle indexu → různé rozmístění po obrazovce.

### 12. 9. 2026 — vycentrování, botanické prvky, nové mango
- Kompozice vycentrovány: kusy stojí vedle sebe v překryté řadě (stejná/podobná velikost), skupina jako celek uprostřed scény; meloun zůstává jediný velký kus, limetka a mochyně mají kusy tři.
- Každý druh má vlastní botanický prvek jako nenápadnou lineární kresbu v pozadí (ProductFlora v ProductArt.jsx): mango lata květů, papája hvězdicový květ, dračí ovoce noční květ, liči trs květů + list, marakuja květ s korunkou, limetka/citron pětiplátečné květy s větví, mochyně lampionek, asimina vínový zvonek, granátové jablko trubkovitý květ, kiwi srdčitý list, avokádo lesklý list, banán květní srdce, meloun květ + členěný list. Generické květy v pozadí odstraněny. Flora je i v detailu produktu.
- Mango překresleno: zelenkavá kůrka s červeno-oranžovým nádechem + žlutá kostkovaná půlka.

### 12. 9. 2026 — rychlejší přebarvení, pár kusů, příběh značky
- Přebarvení pozadí zrychleno (1,0 s) a spouští se HNED při startu posunu produktu (cílová barva se nastavuje při zařazení kroku do fronty, ne po doběhnutí).
- Druhý kus kompozice zvětšen na stejnou velikost jako hlavní (celek + rozřezaný kus jako překrytý pár); limetka a mochyně mají 3 kusy podobné velikosti.
- Sekce Příběh naplněna skutečným příběhem značky: lead „XXX vzniklo z jednoho přání…" + 4 kapitoly (Tam, kam patří / Neděláme to sami / Kousek jiného světa / Zpátky k zemi a lidem).
- Oprava: maskovaný reveal nadpisu Příběhu se nespouštěl (whileInView na potomkovi oříznutém overflow-hidden rodičem měl nulový intersection) — přepsáno na variant-based reveal (pozorování na rodiči, animace potomka).

### 12. 9. 2026 — barevné řazení, plynulé pozadí, flora
- Produkty seřazeny podle odstínu barev do uzavřeného kruhu (avokádo → kiwi → limetka → asimina → citron → banán → marakuja → mochyně → mango → papája → vodní meloun → granátové jablko → dračí ovoce → liči → zpět na avokádo).
- Pozadí odděleno od posuvníku: zůstává stát a 1,9 s plynule proniká do barvy další scény; do strany se posouvají jen produkty a názvy.
- Kompozice sjednoceny do skupin kusů podobné velikosti (hlavní plod + půlka/celek přimknutý vpravo; limetka a mochyně mají 3 kusy).
- Přidána nenápadná flora v pozadí (květy, větvičky s listy, pupeny — nízká krytí, parallaxní vrstva).

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
