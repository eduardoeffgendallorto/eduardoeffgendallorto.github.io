import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang, T } from "@/data/content";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (x: T) => string }>({
  lang: "pt",
  setLang: () => {},
  t: (x) => x.pt,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    const initial: Lang =
      saved === "pt" || saved === "en" ? saved : navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
    setLangState(initial);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    localStorage.setItem("lang", l);
    setLangState(l);
  }, []);
  const t = useCallback((x: T) => x[lang], [lang]);
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
