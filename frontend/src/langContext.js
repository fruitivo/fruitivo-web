import { createContext, useContext } from "react";

// { lang: "cs" | "en", setLang }
export const LangContext = createContext({ lang: "cs", setLang: () => {} });

export const useLang = () => useContext(LangContext);

// vyber textu podle jazyka s fallbackem na češtinu
export const pick = (lang, cs, en) => (lang === "en" && en != null ? en : cs);
