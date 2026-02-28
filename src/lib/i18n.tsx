import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import es from "@/locales/es.json";
type TranslationPrimitive = string | number | boolean | null;
type TranslationValue = TranslationPrimitive | TranslationValue[] | { [key: string]: TranslationValue };
type TranslationParams = Record<string, string | number>;

type I18nContextValue = {
  t: (key: string, params?: TranslationParams) => string;
  tArray: (key: string) => string[];
};

const resolveValue = (key: string): TranslationValue | undefined => {
  const segments = key.split(".");
  let current: TranslationValue | undefined = es as TranslationValue;

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
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = "es";
    }
  }, []);

  const translate = useCallback(
    (key: string, params?: TranslationParams): string => {
      const value = resolveValue(key);
      if (typeof value === "string") {
        return formatValue(value, params);
      }
      if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
      }
      return key;
    },
    []
  );

  const translateArray = useCallback(
    (key: string): string[] => {
      const value = resolveValue(key);
      if (Array.isArray(value)) {
        return value.map((item) => String(item));
      }
      return [];
    },
    []
  );

  const contextValue = useMemo<I18nContextValue>(
    () => ({
      t: translate,
      tArray: translateArray,
    }),
    [translate, translateArray]
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


