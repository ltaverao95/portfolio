'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import es from '@/lib/i18n/locales/es.json';
import en from '@/lib/i18n/locales/en.json';

type Language = 'es' | 'en';

const translations = { es, en };

// Definimos un tipo más flexible para el valor de retorno de la traducción
type TranslationValue = string | object | any[];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => TranslationValue;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const translate = useMemo(() => (key: string): TranslationValue => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Devuelve la clave si no se encuentra la traducción
      }
    }
    return result;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
