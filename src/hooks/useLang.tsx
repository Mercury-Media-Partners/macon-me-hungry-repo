import React, { createContext, useContext, useState } from "react";

type Lang = "es" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (es: string, en: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "es",
  setLang: () => {},
  t: (es) => es,
});

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("es");
  const t = (es: string, en: string) => (lang === "es" ? es : en);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
