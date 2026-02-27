import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

type Language = "es" | "en";
type TranslationPrimitive = string | number | boolean | null;
type TranslationValue = TranslationPrimitive | TranslationValue[] | { [key: string]: TranslationValue };
type TranslationParams = Record<string, string | number>;

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: TranslationParams) => string;
  tArray: (key: string) => string[];
};

const dictionaries: Record<Language, TranslationValue> = {
  es,
  en,
};

const STORAGE_KEY = "elaris-lang";

const getLanguageFromPathname = (pathname?: string): Language | null => {
  if (typeof pathname !== "string") {
    return null;
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return "es";
  }
  return null;
};

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "es";
  }
  const pathnameLang = getLanguageFromPathname(window.location.pathname);
  if (pathnameLang) {
    return pathnameLang;
  }
  return "es";
};

const resolveValue = (language: Language, key: string): TranslationValue | undefined => {
  const segments = key.split(".");
  let current: TranslationValue | undefined = dictionaries[language];

  for (const segment of segments) {
    if (current == null) {
      return undefined;
    }

    if (Array.isArray(current)) {
      const index = Number(segment);
      if (Number.isNaN(index)) {
        return undefined;
      }
      current = current[index];
      continue;
    }

    if (typeof current === "object") {
      current = (current as Record<string, TranslationValue>)[segment];
      continue;
    }

    return undefined;
  }

  return current;
};

const formatValue = (value: string, params?: TranslationParams) => {
  if (!params) return value;
  return Object.entries(params).reduce(
    (acc, [paramKey, paramValue]) => acc.split(`{${paramKey}}`).join(String(paramValue)),
    value
  );
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const translate = useCallback(
    (key: string, params?: TranslationParams) => {
      const value = resolveValue(language, key);
      if (typeof value === "string") {
        return formatValue(value, params);
      }
      if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
      }
      return key;
    },
    [language]
  );

  const translateArray = useCallback(
    (key: string) => {
      const value = resolveValue(language, key);
      if (Array.isArray(value)) {
        return value.map((item) => String(item));
      }
      return [];
    },
    [language]
  );

  const contextValue = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: translate,
      tArray: translateArray,
    }),
    [language, setLanguage, translate, translateArray]
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
};

export type { Language };
