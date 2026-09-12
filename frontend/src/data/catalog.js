// ─────────────────────────────────────────────────────────────────────────────
// KOŘENY — katalog dat
// TODO(ASSETS): Produktové vizuály jsou DOČASNÉ vektorové ilustrace
// (components/ProductArt.jsx). Pro finální web nahradit vlastními assety.
// Pole `asset` u produktu je připraveno i na budoucí režimy:
//   { type: 'frames', baseUrl, count, ext } → 360° spin ze sekvenčních snímků
//   { type: 'glb', src }                    → 3D model přes React Three Fiber
// Výměna = poupravit `asset` / art produktu, zbytek scén se nemění.
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { id: "01", label: "Příběh", target: "#pribeh" },
  { id: "02", label: "Sady", target: "#sady" },
  { id: "03", label: "Produkty", target: "#produkty" },
  { id: "04", label: "Žurnál", target: "#zurnal" },
  { id: "05", label: "Kontakt", target: "#kontakt" },
];

export const HERO = {
  overline: "Obnova půdy · Prémiové ovoce",
  statement: "Ze zdevastované půdy k živým sadům.",
  support:
    "Obnovujeme poškozenou půdu po celém světě. Na živé zemi pěstujeme ovoce výjimečné chuti — čerstvé, sušené i zpracované.",
  cta: "Prozkoumat sklizeň",
  // TODO(ASSET): dočasná atmosférická fotografie pole — nahradit vlastním filmem půda → sad
  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2400&auto=format&fit=crop",
};

export const MARQUEE_TEXT =
  "OBNOVA POŠKOZENÉ PŮDY • ČISTÉ BIO OVOCE • OD BOBU KE TABULCE • ŽIVÁ PŮDA • PLNÁ CHUŤ • BEZ CHEMIE • POCTIVÉ ZEMĚDĚLSTVÍ • ";

// sceneBg = plochá barva scény produktu · sceneInk = 'dark' | 'light' (barva textu scény)
export const CATEGORIES = [
  {
    id: "tropical",
    index: "01",
    name: "Tropické ovoce",
    accent: "#E06A26",
    tagline: "Ovoce z teplých obnovených oblastí — sluncem nasáklé, sklízené v plné zralosti.",
    products: [
      {
        id: "mango", name: "mango", displayName: "Mango", latin: "Mangifera indica",
        subtitle: "Odrůda Kent z komunitních sadů",
        description: "Šťavnatá dužina s tóny medu a borovicové pryskyřice, vypěstovaná v půdě obohacené organickým kompostem.",
        notes: ["Med", "Citrusová kůra", "Tropický nektar"],
        soil: "Hluboká červená jílovitá půda s vysokým podílem humusu",
        sceneBg: "#EE9A3A", sceneInk: "dark",
      },
      {
        id: "papaya", name: "papája", displayName: "Papája", latin: "Carica papaya",
        subtitle: "Sladká papája Formosa",
        description: "Přirozeně enzymatické ovoce dozrávající přímo na stromě, bez chemických dozráváren.",
        notes: ["Karamel", "Meloun", "Vanilka"],
        soil: "Vulkanický popel a regenerovaná lesní prsť",
        sceneBg: "#DF7049", sceneInk: "light",
      },
      {
        id: "dragonfruit", name: "dračí ovoce", displayName: "Dračí ovoce", latin: "Hylocereus undatus",
        subtitle: "Pitahaya s jemnou dužinou",
        description: "Křupavá struktura plná antioxidantů. Kaktusové výsadby zpevňují erozí ohrožené svahy.",
        notes: ["Kiwi", "Ostružina", "Limetková svěžest"],
        soil: "Písčitohlinitá drenážovaná půda s biouhlem",
        sceneBg: "#D8437B", sceneInk: "light",
      },
      {
        id: "lychee", name: "liči", displayName: "Liči", latin: "Litchi chinensis",
        subtitle: "Královské liči s květinovým aroma",
        description: "Perleťová sladká dužina s lehkým opojným aroma růže a bílého čaje.",
        notes: ["Růže", "Muškátový hrozen", "Bílý čaj"],
        soil: "Aluviální naplaveniny bohaté na minerály",
        sceneBg: "#E8B4A6", sceneInk: "dark",
      },
      {
        id: "passionfruit", name: "marakuja", displayName: "Marakuja", latin: "Passiflora edulis",
        subtitle: "Intenzivní mučenka jedlá",
        description: "Kyselavý výbuch chuti s vysokým obsahem přírodních esenciálních olejů.",
        notes: ["Marakuja", "Žlutý citron", "Divoký med"],
        soil: "Mulčované terasy s krycími plodinami",
        sceneBg: "#E3B93C", sceneInk: "dark",
      },
    ],
  },
  {
    id: "citrus",
    index: "02",
    name: "Citrusy",
    accent: "#688F35",
    tagline: "Esenciální oleje, ostrá svěžest a kůra bez vosků a postřiků.",
    products: [
      {
        id: "lime", name: "limetka", displayName: "Limetka", latin: "Citrus aurantiifolia",
        subtitle: "Šťavnatá mexická limetka",
        description: "Přírodní esence svěžesti s jedlou kůrou bez jakýchkoli voskových úprav.",
        notes: ["Ostrá kyselost", "Citrusový květ", "Kůra"],
        soil: "Vápencové podloží s organickým mulčem",
        sceneBg: "#79AE44", sceneInk: "dark",
      },
      {
        id: "lemon", name: "citron", displayName: "Citron", latin: "Citrus limon",
        subtitle: "Aromatický citron Eureka",
        description: "Bohatý na vitamín C a esenciální oleje. Pěstován na jižních prosluněných terasách.",
        notes: ["Svěží kyselost", "Eukalyptus", "Květinový tón"],
        soil: "Regenerovaná kamenitá půda s jíchou z kopřiv",
        sceneBg: "#ECD06F", sceneInk: "dark",
      },
    ],
  },
  {
    id: "rare",
    index: "03",
    name: "Vzácné a divoké",
    accent: "#D49013",
    tagline: "Zapomenuté plody starých kultur, pěstované v malých dávkách.",
    products: [
      {
        id: "physalis", name: "mochyně", displayName: "Mochyně", latin: "Physalis peruviana",
        subtitle: "Incká třešeň v přírodním kalichu",
        description: "Klenot starobylého zemědělství. Sladkokyselá kulička plná vitamínu A a bioflavonoidů.",
        notes: ["Ananas", "Angrešt", "Karamel"],
        soil: "Suché obnovené stráně s lokální mykorhízou",
        sceneBg: "#D99A2B", sceneInk: "dark",
      },
      {
        id: "pawpaw", name: "asimina", displayName: "Asimina", latin: "Asimina triloba",
        subtitle: "Severoamerický banánovec",
        description: "Vzácné ovoce s krémovou texturou kombinující chuť banánu, manga a vanilkového pudinku.",
        notes: ["Banánový krém", "Mango", "Kokosové mléko"],
        soil: "Hluboké lužní půdy s bohatým opadem",
        sceneBg: "#9FAF55", sceneInk: "dark",
      },
    ],
  },
  {
    id: "orchard",
    index: "04",
    name: "Klasické sady",
    accent: "#9E2A2B",
    tagline: "Prověřené druhy z rodinných výsadeb na regenerované půdě.",
    products: [
      {
        id: "pomegranate", name: "granátové jablko", displayName: "Granátové jablko", latin: "Punica granatum",
        subtitle: "Rubínová zrna plná síly",
        description: "Symbol plodnosti a regenerace. Šťáva lisovaná z plodů starých sadů.",
        notes: ["Rubínové víno", "Brusinka", "Dřevo"],
        soil: "Kamenité terasy s hlubokým kořenovým systémem",
        sceneBg: "#A83232", sceneInk: "light",
      },
      {
        id: "kiwi", name: "kiwi", displayName: "Kiwi", latin: "Actinidia deliciosa",
        subtitle: "Kiwi z rodinných výsadeb",
        description: "Sladká osvěžující dužina s jemnými semínky, pěstovaná bez syntetických hormonů.",
        notes: ["Svěží jahoda", "Tráva", "Citrus"],
        soil: "Vlhké humózní půdy s mikrobiálním životem",
        sceneBg: "#7C9A4E", sceneInk: "dark",
      },
      {
        id: "avocado", name: "avokádo", displayName: "Avokádo", latin: "Persea americana",
        subtitle: "Krémové avokádo Hass",
        description: "Máslová konzistence s oříškovým podtónem. Zavlažované dešťovou vodou z retenčních nádrží.",
        notes: ["Lískový oříšek", "Máslo", "Čerstvé obilí"],
        soil: "Pórovitá úrodná hlinitá půda",
        sceneBg: "#4C7A3C", sceneInk: "light",
      },
      {
        id: "banana", name: "banán", displayName: "Banán", latin: "Musa acuminata",
        subtitle: "Horský banán Gros Michel",
        description: "Plná intenzivní sladkost a pevná textura, jakou měly banány před průmyslovou monokulturou.",
        notes: ["Vanilkový pudink", "Med", "Pečené jablko"],
        soil: "Agrolesnický systém s banánovníkovým mulčem",
        sceneBg: "#E8C84C", sceneInk: "dark",
      },
      {
        id: "watermelon", name: "vodní meloun", displayName: "Vodní meloun", latin: "Citrullus lanatus",
        subtitle: "Sladký meloun z teplých písků",
        description: "Křupavý, chladivý a přirozeně sladký meloun pěstovaný v biodynamickém režimu.",
        notes: ["Cukrová voda", "Růžové poupě", "Okurková svěžest"],
        soil: "Písčité duny vyhřívané letním sluncem",
        sceneBg: "#CF4A44", sceneInk: "light",
      },
    ],
  },
  {
    id: "processed",
    index: "05",
    name: "Zpracované produkty",
    accent: "#5C3A21",
    tagline: "Z bobu, ovoce a šťávy — uzavřený řetězec od sadu po tabulku.",
    products: [
      {
        id: "smoothie", name: "malinové smoothie", displayName: "Malinové smoothie", latin: "Rubus idaeus",
        subtitle: "100 % čisté pyré z lesních malin",
        description: "Za studena lisovaná ovocná šťáva bez přidaného cukru, vody či konzervantů.",
        notes: ["Divoké maliny", "Šípkový nektar", "Jemná trpkost"],
        soil: "Podhorská paseka s bohatou biodiverzitou",
        sceneBg: "#BE4A6C", sceneInk: "light",
      },
      {
        id: "cocoa", name: "kakaové boby", displayName: "Kakaové boby", latin: "Theobroma cacao",
        subtitle: "Fermentované boby Criollo",
        description: "Surové kakaové boby z agrolesnických výsadeb. První krok našeho uzavřeného řetězce kvality.",
        notes: ["Hořká čokoláda", "Sušené švestky", "Tabákový list"],
        soil: "Stínové kakaové háje na vulkanickém podloží",
        sceneBg: "#8A5A38", sceneInk: "light",
        linkedId: "chocolate", pairRole: "Surovina",
      },
      {
        id: "chocolate", name: "čokoláda s kousky ovoce", displayName: "Čokoláda s kousky ovoce", latin: "Theobroma cacao",
        subtitle: "80 % čokoláda s lyofilizovaným ovocem",
        description: "Ručně vyráběná čokoláda spojená s kousky našeho mrazem sušeného manga a malin.",
        notes: ["Sametové kakao", "Křupavé mango", "Ovocná acidita"],
        soil: "Udržitelná sklizeň spojená s řemeslnou pražírnou",
        sceneBg: "#3E2A20", sceneInk: "light",
        linkedId: "cocoa", pairRole: "Finální produkt",
      },
    ],
  },
];

// plochý seznam scén pro horizontální katalog
export const SCENES = CATEGORIES.flatMap((cat) =>
  cat.products.map((p) => ({ ...p, categoryId: cat.id, categoryName: cat.name, accent: cat.accent }))
);

export const sceneIndexOf = (productId) => SCENES.findIndex((s) => s.id === productId);
export const categoryStartIndex = (categoryId) => SCENES.findIndex((s) => s.categoryId === categoryId);

export const ROOTS = {
  title: "Náš příběh",
  subtitle: "Filozofie návratu ke skutečným hodnotám půdy",
  chapters: [
    { number: "01", title: "Obnova poškozené půdy", text: "Odbouráváme chemické zátěže desetiletí průmyslového zemědělství. Pomocí biouhlu, kompostu a krycích plodin vracíme do země mikrobiální život." },
    { number: "02", title: "Život bez syntetiky", text: "Žádné syntetické pesticidy ani průmyslová hnojiva. Ochrana úrody probíhá přirozenou biologickou rovnováhou a podporou ptactva a užitečného hmyzu." },
    { number: "03", title: "Trpělivost a čas", text: "Ovoce nespěchá. Dozrává na slunci až do plné biologické zralosti. Výsledkem je nesrovnatelně bohatší chuť, aroma i koncentrace živin." },
    { number: "04", title: "Od bobu ke tabulce", text: "Kontrolujeme celý řetězec od prvního semínka až po finální balení. Věříme v absolutní transparentnost a úctu k lidské práci." },
  ],
};

export const ORCHARDS = {
  title: "Naše obnovené sady",
  subtitle: "Živá území v Česku a partnerských oblastech",
  // TODO(ASSET): dočasná fotografie sadu — nahradit interaktivní mapou obnovených území
  image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1400&auto=format&fit=crop",
  locations: [
    { id: "litomerice", name: "Sad Litoměřice", type: "Mírné pásmo · Mochyně, bobuloviny", coords: "50.5338° N, 14.1318° E", status: "100 % regenerováno", pin: { x: 46, y: 30 } },
    { id: "palava", name: "Terasy Pálava", type: "Teplé svahy · Granátová jablka, melouny", coords: "48.8055° N, 16.6436° E", status: "Aktivní regenerace", pin: { x: 58, y: 62 } },
    { id: "polabi", name: "Polabská nížina", type: "Lužní půda · Asimina, kiwi", coords: "50.1500° N, 15.1000° E", status: "100 % regenerováno", pin: { x: 38, y: 44 } },
    { id: "chriby", name: "Chřibské vrchy", type: "Agrolesnictví · ovocné háje", coords: "49.1000° N, 17.3000° E", status: "Rozšiřování území", pin: { x: 64, y: 50 } },
  ],
};

export const JOURNAL = {
  title: "Žurnál půdy a sklizně",
  articles: [
    { title: "Jak biouhel vrací vodu do vyprahlé země", date: "12. července 2026", readTime: "5 min čtení", excerpt: "Praktické zkušenosti z tříletého experimentu na terasách Pálavy s regenerací půdního humusu." },
    { title: "Od bobu ke tabulce: fermentace kakaa", date: "28. června 2026", readTime: "8 min čtení", excerpt: "Cesta našich kakaových bobů z biodynamického háje až po ruční balení tabulkové čokolády." },
  ],
};

export const FOOTER = {
  statement: "Pěstujeme na živé zemi.",
  email: "info@xxx.cz",
  phone: "+420 800 567 369",
  address: "Sadařská 108, 412 01 Litoměřice",
  socials: ["Instagram", "LinkedIn", "Pinterest"],
  copyright: "© 2026 xxx. Všechna práva vyhrazena.",
};
