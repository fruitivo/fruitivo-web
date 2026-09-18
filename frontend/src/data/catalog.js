// ─────────────────────────────────────────────────────────────────────────────
// Fruitivo — katalog dat
// TODO(ASSETS): Produktové vizuály jsou DOČASNÉ vektorové ilustrace
// (components/ProductArt.jsx). Pro finální web nahradit vlastními assety.
// Pole `asset` u produktu je připraveno na budoucí režimy:
//   { type: 'frames', baseUrl, count, ext } → 360° spin ze sekvenčních snímků
//   { type: 'glb', src }                    → 3D model přes React Three Fiber
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { id: "01", label: "Příběh", target: "#pribeh" },
  { id: "02", label: "Sady", target: "#sady" },
  { id: "03", label: "Produkty", target: "#produkty" },
  { id: "04", label: "Proces", target: "#denik" },
  { id: "05", label: "Kontakt", target: "#kontakt" },
];

export const MARQUEE_TEXT =
  "OBNOVA POŠKOZENÉ PŮDY • ČISTÉ BIO OVOCE • ŽIVÁ PŮDA • PLNÁ CHUŤ • BEZ CHEMIE • POCTIVÉ ZEMĚDĚLSTVÍ • ";

// sceneBg = plochá barva scény produktu · sceneInk = 'dark' | 'light'
// Pořadí kategorií: od ověřených sadových klasik po vzácné a divoké plody.
export const CATEGORIES = [
  {
    id: "orchard",
    index: "01",
    name: "Klasické sady",
    accent: "#9E2A2B",
    tagline: "Prověřené druhy z rodinných výsadeb na regenerované půdě.",
    products: [
      {
        id: "pomegranate", name: "granátové jablko", displayName: "Granátové jablko", latin: "Punica granatum",
        subtitle: "Rubínová zrna plná síly",
        description: "Požáry roku 2021 zasáhly rozsáhlé plochy starých olivových hájů na Peloponésu. Část téhle spálené půdy jsme osadili granátovníky — odrůdou, která dobře snáší sucho i chudší podmínky.",
        usage: "Sladce trpkavá šťáva plná semínek, prodáváme plody i lisovanou šťávu.",
        orchard: "Sad Peloponés, Řecko",
        notes: ["Rubínové víno", "Brusinka", "Dřevo"],
        soil: "Kamenité terasy s hlubokým kořenovým systémem",
        sceneBg: "#EEEBE1", sceneInk: "light",
      },
      {
        id: "kiwi", name: "kiwi", displayName: "Kiwi", latin: "Actinidia deliciosa",
        subtitle: "Kiwi z rodinných výsadeb",
        description: "Po rozpadu sovětských zemědělských družstev zůstala v gruzínské Gurii spousta terasovitých svahů bez péče. Kiwi jsme vybrali i proto, že jde o popínavou rostlinu — její kořeny pomáhají takový svah znovu zpevnit.",
        usage: "Sladce nakyslé a šťavnaté, prodáváme výhradně čerstvé.",
        orchard: "Sad Guria, Gruzie",
        notes: ["Svěží jahoda", "Tráva", "Citrus"],
        soil: "Vlhké humózní půdy s mikrobiálním životem",
        sceneBg: "#7C9A4E", sceneInk: "dark",
      },
      {
        id: "avocado", name: "avokádo", displayName: "Avokádo", latin: "Persea americana",
        subtitle: "Krémové avokádo Hass",
        description: "Region Petorca je bohužel známý vodní krizí způsobenou právě nadměrnou avokádovou produkcí. Chtěli jsme dokázat, že se dá pěstovat i zodpovědně, s ohledem na místní vodní zdroje.",
        usage: "Krémové a máslové, prodáváme výhradně čerstvé.",
        orchard: "Sad Petorca, Chile",
        notes: ["Lískový oříšek", "Máslo", "Čerstvé obilí"],
        soil: "Pórovitá úrodná hlinitá půda",
        sceneBg: "#EEEBE1", sceneInk: "light",
      },
      {
        id: "watermelon", name: "vodní meloun", displayName: "Vodní meloun", latin: "Citrullus lanatus",
        subtitle: "Sladký meloun z teplých písků",
        description: "Divoký meloun pravděpodobně pochází přímo z pouště Kalahari, kde roste dodnes. Pěstujeme ho na okraji pouště, v pečlivě zavlažovaném pásu obnovené půdy.",
        usage: "Šťavnatý a osvěžující, prodáváme čerstvý, sezónně.",
        orchard: "Sad Kalahari, Namibie",
        notes: ["Cukrová voda", "Růžové poupě", "Okurková svěžest"],
        soil: "Písčité duny vyhřívané letním sluncem",
        sceneBg: "#CF4A44", sceneInk: "light",
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
        description: "Údolí San Joaquin patří mezi oblasti nejvíc zasažené dlouhodobým suchem v Kalifornii. Citrusové sady tu často zůstávají neobdělané, protože voda je pro velkovýrobce příliš drahá.",
        usage: "Ostře kyselá, prodáváme čerstvou i jako sušenou kůru.",
        orchard: "Sad San Joaquin, Kalifornie, USA",
        notes: ["Ostrá kyselost", "Citrusový květ", "Kůra"],
        soil: "Vápencové podloží s organickým mulčem",
        sceneBg: "#79AE44", sceneInk: "dark",
      },
      {
        id: "lemon", name: "citron", displayName: "Citron", latin: "Citrus limon",
        subtitle: "Aromatický citron Eureka",
        description: "Roste ve stejném údolí jako naše limetky — v oblasti dlouhodobě zasažené suchem, kde se citrusové sady staly pro velkovýrobce příliš nákladné na zavlažování.",
        usage: "Intenzivně vonná kůra a kyselá šťáva, prodáváme čerstvý i sušenou kůru.",
        orchard: "Sad San Joaquin, Kalifornie, USA",
        notes: ["Svěží kyselost", "Eukalyptus", "Květinový tón"],
        soil: "Regenerovaná kamenitá půda s jíchou z kopřiv",
        sceneBg: "#EEEBE1", sceneInk: "dark",
      },
    ],
  },
  {
    id: "tropical",
    index: "03",
    name: "Tropické ovoce",
    accent: "#E06A26",
    tagline: "Ovoce z teplých obnovených oblastí — sluncem nasáklé, sklízené v plné zralosti.",
    products: [
      {
        id: "mango", name: "mango", displayName: "Mango", latin: "Mangifera indica",
        subtitle: "Odrůda Kent z komunitních sadů",
        description: "Mangovník potřebuje přesně to, co dnes queenslandská buš nabízí až příliš — žár a sucho. Po vlnách požárů, které tudy prošly, jsme tenhle kus země koupili právě proto, že o něj skoro nikdo nestál.",
        usage: "Sladké a šťavnaté, prodáváme čerstvé i jako sušené plátky.",
        orchard: "Sad Kuranda, Queensland, Austrálie",
        notes: ["Med", "Citrusová kůra", "Tropický nektar"],
        soil: "Hluboká červená jílovitá půda s vysokým podílem humusu",
        sceneBg: "#EEEBE1", sceneInk: "dark",
      },
      {
        id: "papaya", name: "papája", displayName: "Papája", latin: "Carica papaya",
        subtitle: "Sladká papája Formosa",
        description: "Roste na stejném pozemku jako naše mango — queenslandské buši, která si prošla opakovanými požáry, než jsme ji začali obnovovat.",
        usage: "Sladká, máslová dužina, prodáváme čerstvou i jako sušené plátky.",
        orchard: "Sad Kuranda, Queensland, Austrálie",
        notes: ["Karamel", "Meloun", "Vanilka"],
        soil: "Vulkanický popel a regenerovaná lesní prsť",
        sceneBg: "#EEEBE1", sceneInk: "light",
      },
      {
        id: "dragonfruit", name: "dračí ovoce", displayName: "Dračí ovoce", latin: "Hylocereus undatus",
        subtitle: "Pitahaya s jemnou dužinou",
        description: "Popínavý kaktus dračího ovoce roste tam, kde po odlesnění zbyla jen tenká vrstva vyprahlé půdy — jeho vlastní kořeny přitom pomáhají takovou zemi znovu zpevnit.",
        usage: "Jemně sladké a osvěžující, prodáváme výhradně čerstvé.",
        orchard: "Sad León, Nikaragua",
        notes: ["Kiwi", "Ostružina", "Limetková svěžest"],
        soil: "Písčitohlinitá drenážovaná půda s biouhlem",
        sceneBg: "#EEEBE1", sceneInk: "light",
      },
      {
        id: "lychee", name: "liči", displayName: "Liči", latin: "Litchi chinensis",
        subtitle: "Královské liči s květinovým aroma",
        description: "Další plodina ze stejného sadu jako mango a papája — queenslandská buš, kde po požárech obnovujeme půdu už několik let.",
        usage: "Sladká, aromatická dužina kolem pecky, prodáváme čerstvé.",
        orchard: "Sad Kuranda, Queensland, Austrálie",
        notes: ["Růže", "Muškátový hrozen", "Bílý čaj"],
        soil: "Aluviální naplaveniny bohaté na minerály",
        sceneBg: "#E8B4A6", sceneInk: "dark",
      },
      {
        id: "passionfruit", name: "marakuja", displayName: "Marakuja", latin: "Passiflora edulis",
        subtitle: "Intenzivní mučenka jedlá",
        description: "Popínavá réva marakuji se hodí přesně na půdu, která potřebuje rychle zapojit kořeny do stabilizace svahu — a to je přesně situace, ve které jsme Sad Kuranda přebírali.",
        usage: "Intenzivně kyselá a aromatická, skvělá čerstvá i do smoothie.",
        orchard: "Sad Kuranda, Queensland, Austrálie",
        notes: ["Marakuja", "Žlutý citron", "Divoký med"],
        soil: "Mulčované terasy s krycími plodinami",
        sceneBg: "#E3B93C", sceneInk: "dark",
      },
    ],
  },
  {
    id: "rare",
    index: "04",
    name: "Vzácné a divoké",
    accent: "#D49013",
    tagline: "Zapomenuté plody starých kultur, pěstované v malých dávkách.",
    products: [
      {
        id: "physalis", name: "mochyně", displayName: "Mochyně", latin: "Physalis peruviana",
        subtitle: "Incká třešeň v přírodním kalichu",
        description: "Po vodní krizi v Kapském Městě zůstala spousta zemědělské půdy v oblasti Karoo bez využití. Mochyně patřila mezi první plodiny, které jsme na takhle vyprahlé zemi vůbec zkusili.",
        usage: "Sladce nakyslá, nejlíp chutná sušená jako svačina.",
        orchard: "Sad Karoo, Jižní Afrika",
        notes: ["Ananas", "Angrešt", "Karamel"],
        soil: "Suché obnovené stráně s lokální mykorhízou",
        sceneBg: "#EEEBE1", sceneInk: "dark",
      },
      {
        id: "pawpaw", name: "asimina", displayName: "Asimina", latin: "Asimina triloba",
        subtitle: "Severoamerický banánovec",
        description: "Půda v údolí Ohia byla generace vyčerpávána monokulturou kukuřice a sóji. Asimina je přitom původní severoamerické ovoce — jen se na něj během let velkovýroby skoro zapomnělo.",
        usage: "Krémová dužina s nádechem banánu a manga, prodáváme jen čerstvou, špatně se skladuje.",
        orchard: "Sad Ohio Valley, Ohio, USA",
        notes: ["Banánový krém", "Mango", "Kokosové mléko"],
        soil: "Hluboké lužní půdy s bohatým opadem",
        sceneBg: "#EEEBE1", sceneInk: "dark",
      },
    ],
  },
];

// plochý seznam scén pro slider (nekonečná smyčka)
// Seřazeno podle ODSTÍNU barev (zelená → žlutá → oranžová → červená → růžová),
// aby přechody barev pozadí působily přirozeně a plynule; smyčka se uzavírá zpět do zelené.
const SCENE_ORDER = [
  "avocado", "kiwi", "lime", "pawpaw", "lemon", "passionfruit",
  "physalis", "mango", "papaya", "watermelon", "pomegranate", "dragonfruit", "lychee",
];
const ALL_SCENES = CATEGORIES.flatMap((cat) =>
  cat.products.map((p) => ({ ...p, categoryId: cat.id, categoryName: cat.name, accent: cat.accent }))
);
export const SCENES = SCENE_ORDER.map((id) => ALL_SCENES.find((p) => p.id === id));

export const sceneIndexOf = (productId) => SCENES.findIndex((s) => s.id === productId);
export const categoryStartIndex = (categoryId) => SCENES.findIndex((s) => s.categoryId === categoryId);

export const ROOTS = {
  title: "Náš příběh",
  lead: "Fruitivo vzniklo z jednoho přání — přivézt sem ovoce, které u nás neroste, a udělat to poctivě.",
  chapters: [
    { number: "01", title: "Tam, kam patří", text: "Jezdíme za ním tam, kam patří. Do míst, kde slunce svítí skoro celý rok, ale kde má půda za sebou těžké roky — sucho, požáry, vyčerpanou zemi. Tyhle pozemky kupujeme a dáváme jim čas se zase nadechnout." },
    { number: "02", title: "Neděláme to sami", text: "Učíme se od lidí, kteří tam žijí a starají se o zem odjakživa. Oni vědí, jak s půdou a rostlinami zacházet — my jim pomáháme s obnovou a časem, který to potřebuje." },
    { number: "03", title: "Kousek jiného světa", text: "Když sad zase začne rodit, ovoce dovezeme domů. Chceme, aby si u nás lidé mohli vychutnat kousek jiného světa — takového, jaký doopravdy je, bez zbytečných oklik." },
    { number: "04", title: "Zpátky k zemi a lidem", text: "A protože nám na těch místech záleží dál, část z každého prodeje se vrací zpátky tam, odkud ovoce přišlo — k zemi i k lidem, kteří nám s ní pomáhají." },
  ],
};

export const ORCHARDS = {
  title: "Naše obnovené sady",
  subtitle: "Devět území napříč kontinenty, kterým vracíme život",
  locations: [
    {
      id: "kuranda",
      name: "Sad Kuranda",
      place: "Queensland, Austrálie",
      crops: "mango, marakuja, papája, liči",
      text: "Bývalá buš zasažená požáry, dnes největší sad v naší síti.",
      image: "/assets/sad-kuranda.jpg",
      pin: { x: 90.4, y: 59.3 },
    },
    {
      id: "leon",
      name: "Sad León",
      place: "Nikaragua",
      crops: "dračí ovoce",
      text: "Půda obnovená po letech odlesňování, dnes domov dračího ovoce.",
      image: "/assets/sad-leon.jpg",
      pin: { x: 25.9, y: 43.1 },
    },
    {
      id: "sanjoaquin",
      name: "Sad San Joaquin",
      place: "Kalifornie, USA",
      crops: "limetka, citron",
      text: "Údolí vysušené lety sucha, citrusy sem vrátily život i vodu.",
      image: "/assets/sad-sanjoaquin.jpg",
      pin: { x: 16.7, y: 29.7 },
    },
    {
      id: "karoo",
      name: "Sad Karoo",
      place: "Jižní Afrika",
      crops: "mochyně",
      text: "Země po vodní krizi, kde nenáročná mochyně otevřela cestu dalším plodinám.",
      image: "/assets/sad-karoo.jpg",
      pin: { x: 56.1, y: 67.9 },
    },
    {
      id: "pelopones",
      name: "Sad Peloponés",
      place: "Řecko",
      crops: "granátové jablko",
      text: "Staré olivové háje zasažené požáry roku 2021, obnovené pod granátovými sady.",
      image: "/assets/sad-pelopones.jpg",
      pin: { x: 56.2, y: 29.2 },
    },
    {
      id: "petorca",
      name: "Sad Petorca",
      place: "Chile",
      crops: "avokádo",
      text: "Region známý vodní krizí, kde obnova půdy začíná dávat smysl i ekonomicky.",
      image: "/assets/sad-petorca.jpg",
      pin: { x: 30.3, y: 67.9 },
    },
    {
      id: "kalahari",
      name: "Sad Kalahari",
      place: "Namibie",
      crops: "vodní meloun",
      text: "Domovina divokého melounu, odkud pochází i ten na vašem stole.",
      image: "/assets/sad-kalahari.jpg",
      pin: { x: 56.7, y: 62.2 },
    },
    {
      id: "guria",
      name: "Sad Guria",
      place: "Gruzie",
      crops: "kiwi",
      text: "Terasovité svahy opuštěné po rozpadu sovětských zemědělských družstev, dnes znovu zpevněné kořeny popínavého kiwi.",
      image: "/assets/sad-guria.jpg",
      pin: { x: 61.7, y: 26.7 },
    },
    {
      id: "ohiovalley",
      name: "Sad Ohio Valley",
      place: "Ohio, USA",
      crops: "asimina",
      text: "Půda vyčerpaná generacemi monokultury kukuřice a sóji, dnes návrat k asimině — původnímu americkému ovoci.",
      image: "/assets/sad-ohiovalley.jpg",
      pin: { x: 27.1, y: 28.3 },
    },
  ],
};

export const PROCESS = {
  title: "Jak to funguje",
  subtitle: "Od zničené země po ovoce na vašem stole",
  steps: [
    {
      number: "01",
      title: "Najdeme pozemek",
      text: "Hledáme půdu zasaženou požárem, suchem nebo lety vyčerpávajícího hospodaření — v regionech, kde přirozeně roste ovoce, které chceme pěstovat.",
    },
    {
      number: "02",
      title: "Koupíme ji",
      text: "Právě proto, že je poškozená, bývá levná. Kupujeme zemi, o kterou velké farmy přestaly stát.",
    },
    {
      number: "03",
      title: "Vrátíme jí vodu a mikrobiom",
      text: "Nejdřív se staráme o půdu samotnou, ne o rostliny na ní — kompost, krycí plodiny a obnova mikroorganismů, které oheň nebo roky sucha z hlíny vzaly.",
      core: true,
    },
    {
      number: "04",
      title: "Necháme jí čas",
      text: "Obnova půdy trvá roky, ne měsíce. Teprve když je země znovu schopná držet vodu a živiny, má smysl na ni něco sázet.",
      core: true,
    },
    {
      number: "05",
      title: "Vysadíme odolné odrůdy",
      text: "Sázíme plodiny, které svými hlubokými kořeny půdu dál stabilizují a chrání před opětovnou erozí.",
    },
    {
      number: "06",
      title: "Sklidíme a dovezeme",
      text: "Zralé ovoce sklidíme a dopravíme čerstvé nebo šetrně sušené až k vám do Česka.",
    },
  ],
};

export const FOOTER = {
  statement: "Pěstujeme na živé zemi.",
  email: "info@fruitivo.cz",
  phone: "+420 800 567 369",
  address: "Fruitivo s.r.o. — Sokola Tůmy 402/12, 737 01 Český Těšín",
  socials: ["Instagram", "LinkedIn", "Pinterest"],
  copyright: "© 2026 Fruitivo s.r.o. Všechna práva vyhrazena.",
};
