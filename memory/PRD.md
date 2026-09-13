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
### 13. 9. 2026 — desktopové „Více" níž
- Desktopové tlačítko „Více" posunuto z bottom-[24vh] na bottom-[12vh] (těsně nad roleťku), ať nezasahuje do ovoce a prvků scény.

### 13. 9. 2026 — mobilní ovládání slideru
- Roletka se jmény produktů je pod lg skrytá; nahrazují ji šipky ‹ › (nová funkce stepBack) a tlačítko „Všechny produkty" otevírající překryvný seznam všech 13 plodin (číslovaný, aktivní kurzívou, klepnutí skočí na produkt a zavře; autoplay se při otevřeném seznamu pozastaví).
- Mobilní „Více": menší statické pilulkové tlačítko vpravo dole (bottom-24 — vyšší, aby nekrylo plovoucí tlačítko zvuku), bez hover animace. Desktopová verze „Více" i roletka zůstávají od lg beze změny.

### 13. 9. 2026 — animace osy časové linie v sekci Proces
- Svislá osa se dokresluje při scrollu: dvě vrstvy linky (tlumený podklad ink/10 + kreslená ink/40), délka řízena useScroll nad seznamem kroků (offset start 80 % → end 65 % viewportu) s useSpring (stiffness 60, damping 20) pro plynulý „růst". data-testid process-timeline-line.

### 13. 9. 2026 — návrat ze skryté stránky na začátek webu
- Odklepnutí skryté obrazovky („Zapomeňte, co jste viděli") nově posune hlavní stránku na začátek (lenis.scrollTo(0, { immediate: true, force: true }) — force nutný, protože Lenis je během fade-outu ještě pozastaven). Dřív stránka zůstávala dole u kontaktů.

### 13. 9. 2026 — sekce „Jak to funguje" místo Žurnálu
- Journal.jsx smazán, nahrazen Process.jsx: časová osa 6 kroků (Najdeme pozemek → Sklidíme a dovezeme), velká tlumená čísla (font-display, ink/10), svislá linka osy, kroky 03 a 04 (jádro — péče o půdu) zvýrazněny kartou bg-sand s větším odsazením a číslem ink/25. Sekce má id="denik" (zachování odkazů), data-testid process-section / process-step-01..06.
- Data JOURNAL nahrazena exportem PROCESS v catalog.js. Navigace (desktop i overlay menu): 01 Příběh, 02 Sady, 03 Produkty, 04 Proces (#denik), 05 Kontakt. Patička přečíslována na „05 · Kontakt". Žádný odkaz na Deník/Žurnál na webu nezbyl.

### 13. 9. 2026 — rozšířený obsah detailu produktu
- 8 produktů (mango, marakuja, dračí ovoce, limetka, mochyně, granátové jablko, avokádo, vodní meloun) má nový úvodní odstavec o pozemku/obnově půdy (pole description), kratší větu o chuti a využití (nové pole usage, kurzíva serif) a tlumený řádek se sadem (nové pole orchard, malé uppercase písmo s ikonou MapPin). Ostatní produkty (kiwi, citron, papája, asimina, liči) zůstávají na původních textech, detail bez nových polí se vykreslí korektně.
- Layout detailu zachován: kategorie · latinsky, velký název, podtitul, odstavec, věta o chuti, řádek se sadem, chuťové chipsy, půda, TODO asset poznámka.

### 13. 9. 2026 — doplněny poslední fotky sadů
- Sad Karoo a Sad Kalahari mají reálné fotky (mochyně / melounové pole v poušti); placeholdery a flag photoPending odstraněny. Všech 7 sadů má nyní fotografii.

### 13. 9. 2026 — reálná mapa světa místo ilustrativních tvarů
- Abstraktní obrysy nahrazeny skutečnou geografickou mapou: vygenerováno /public/assets/world-map.svg z dat Natural Earth 110m (119 pevnin/ostrovů, bez Antarktidy, ekvirectangulární projekce 1000×500), barvy webu (ink 13 % výplň, 30 % obrys).
- Piny přepočítány na skutečné souřadnice (x=(lon+180)/3.6, y=(90−lat)/1.8): San Joaquin 16.7/29.7, León 25.9/43.1, Petorca 30.3/67.9, Peloponés 56.2/29.2, Kalahari 56.7/62.2, Karoo 56.1/67.9, Kuranda 90.4/59.3.
- Z Orchards.jsx odstraněno pole CONTINENTS; mapa se vkládá jako <img> world-map.svg.
- OPRAVA zarovnání pinů: kontejner mapy se v gridu natahoval na výšku vedlejšího panelu (420 px vs. mapa 338 px), takže piny počítané v % kontejneru seděly níž než pevnina na obrázku (vypadaly „v oceánu"). Kontejner má nyní pevné aspect-[2/1] + self-start → % pinů odpovídá přesně obrázku mapy.

### 13. 9. 2026 — interaktivní mapa vlastněných pozemků (sekce Sady)
- Placeholder nahrazen plnou mapou: ilustrativní SVG svět (měkké obrysy kontinentů, fill-ink/10 + stroke-ink/25 na stone panelu) se 7 pulzujícími piny; klik přepne boční panel (AnimatePresence crossfade) s fotkou, lokalitou, plodinami a textem. Data v ORCHARDS (catalog.js): Kuranda, León, San Joaquin, Karoo, Peloponés, Petorca, Kalahari — přesně dle zadání.
- Fotky v /public/assets/sad-*.jpg: kuranda (mango), leon (dračí ovoce), sanjoaquin (limetka), pelopones (granátové jablko), petorca (avokádo). Pro karoo a kalahari šedé placeholdery se správnými názvy souborů + nápis „Fotografie bude doplněna" (flag photoPending).
- Mobil (<lg): mapa skrytá, místo ní svislý seznam 7 karet se stejným obsahem.
- Podtitul sekce: „Sedm území napříč kontinenty, kterým vracíme život".

### 13. 9. 2026 — úprava textů skryté stránky
- Kurzíva na úvodní obrazovce: „Vedlejší projekt, o kterém se nemluví na valné hromadě." → „Sady nahoře. Byznys dole.", posunutá níž (mt-24/32).
- Slogan: „…kam se nikdo neptá." → „…kam se nikdo nedívá."
- Tlačítko návratu: „Já nic nevím" → „Zapomeňte, co jste viděli".

### 13. 9. 2026 — skrytá obrazovka jako srolovatelná mini-stránka
- SecretOverlay přestavěn na plnou stránku s vlastním scrollem (data-lenis-prevent, hlavní Lenis pozastaven): 1. obrazovka = jen „Vítejte v XXX." + kurzíva „Vedlejší projekt…" s velkým rozestupem (mt-12/16) nad fialovým vizuálem; po srolování obsah na tmavě fialovém #160a24 se zrnem v rytmu hlavního webu (číslovaný label „01 · Vedlejší projekt", serif nadpis s kurzívou, odstavec max 60ch, slogan kurzívou, tlačítko „Já nic nevím" na konci). Bloky se odhalují whileInView fade-up.

### 13. 9. 2026 — obsah skryté obrazovky „gentlemen" (finální texty)
- SecretOverlay: kurzíva nadpisu změněna na „Vedlejší projekt, o kterém se nemluví na valné hromadě.", podnadpis „Diverzifikace portfolia má i svoje tišší kapitoly."; přidán tělový odstavec ve stylu seriálu Gentlemen (max 60 znaků/řádek, centrovaný) a závěrečný slogan kurzívou „XXX. Nejlepší úroda roste tam, kam se nikdo neptá.". Tlačítko „Já nic nevím" zachováno; staggered fade-in jednotlivých bloků.

### 13. 9. 2026 — skrytý easter egg po zadání přístupového kódu
- Pole „Vstup pro pozvané" v patičce (Footer.jsx) nově napojeno: kód "gentlemen" (case-insensitive) spustí skrytý fullscreen stav; jiný kód zobrazí dosavadní placeholder hlášku. Pole je type=password, kód není nikde v UI naznačen.
- Nová komponenta SecretOverlay.jsx: překrytí přes celou obrazovku (fixed, z-100), cross-dissolve fade 1 s (stejný typ přechodu jako scény slideru), pozadí = dodaný fialový vizuál /assets/secret-bg.jpg + tmavá fialová vinětace, filmové zrno.
- Obsah: nadpis „Vítejte v XXX." (Fraunces vzpřímený) + kurzíva „Pod kořeny našich sadů roste ještě jeden nápad.", podnadpis „Co roste pod povrchem, zůstává mezi námi.", tlačítko „Já nic nevím" → fade zpět do normálního režimu.
- Stav drží App.js (secretMode + AnimatePresence); při otevřeném overlay se pozastaví Lenis scroll. Žádná vlastní URL → noindex není potřeba, nic se neindexuje; funkce není nikde odkazovaná ani zmíněná v UI.

### 12. 9. 2026 — zjemnění luxusního stínu (hlavní slider)
- Na základě zpětné vazby uživatele zjemněna vinětace hlavního slideru: ztemnění okrajů radial gradientu z rgba(33,30,27,0.38) na 0.25. Detailní panel po kliknutí na „Více" zůstává beze změny (0.30). Plochá vrstva ink/25 zachována. Uživatel potvrdil, že stín jinak vyhovuje — TEST stává se trvalou součástí.

### 12. 9. 2026 — TEST: luxusní stín přes barvy
- Přes barvy scén přidán tlumící „luxusní plášť": ink/25 vrstva + jemná vinětace (radial gradient k okrajům), stejný stín i v panelu detailu (ink/20). Označeno komentářem TEST v ProductSlider.jsx — pro návrat stačí odstranit příslušné div elementy.

### 12. 9. 2026 — Více tlačítko, kód v patičce, menu jen na mobilu
- Nápisy produktů posunuty výš (pb 19 vh) — více prostoru nad roletkou.
- Banán odstraněn z katalogu (13 produktů); roletka zmenšena (menší písmo a mezery), všechny produkty se vejdou na jednu řádku.
- „Objevit" → „Více": menší obdélník se zaoblenými rohy a větším textem, zarovnaný s úrovní názvu produktu (bottom 24 vh), hover animace zachována.
- Navigace: ze záložek pryč Žurnál (01 Příběh / 02 Sady / 03 Produkty / 04 Kontakt); na desktopu zmizelo tlačítko Menu (jen číslované záložky), na mobilu naopak jen Menu.
- Patička: nové pole „Vstup pro pozvané" — input pro přístupový kód + tlačítko Vstoupit (zatím placeholder hláška, TODO napojení na budoucí uzavřenou část).
- Meloun bez vyčnívajících prvků (hladké tvary, odstraněny pruhy přes okraj), mango oválnější.

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
- P1: Skutečný ambientní zvukový záznam, reálné odkazy sociálních sítí.
- P2: Stránky produktů s plným obsahem, vícejazyčnost (EN), napojení žurnálu na CMS.

## Poznámky
- Žádné credentials nejsou potřeba (statický prototyp). /app/memory/test_credentials.md neobsahuje účty.
