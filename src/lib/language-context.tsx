"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, Translations } from "./translations";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  adsEnabled: boolean;
  setAdsEnabled: (enabled: boolean) => void;
};

const defaultContext: LanguageContextType = {
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
  adsEnabled: true,
  setAdsEnabled: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");
  const [adsEnabled, setAdsEnabledState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("warp-lang") as Language;
    if (savedLang && translations[savedLang]) {
      setLangState(savedLang);
    }
    const savedAds = localStorage.getItem("warp-ads");
    if (savedAds !== null) {
      setAdsEnabledState(savedAds === "true");
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("warp-lang", newLang);
  };

  const setAdsEnabled = (enabled: boolean) => {
    setAdsEnabledState(enabled);
    localStorage.setItem("warp-ads", String(enabled));
  };

  const t = translations[lang];

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, adsEnabled, setAdsEnabled }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}