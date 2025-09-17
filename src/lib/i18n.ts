import { useMemo } from 'react';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';

export type Locale = 'en' | 'es';

const messages = {
  en: enMessages,
  es: esMessages,
} as const;

export function useT(locale: Locale = 'en') {
  return useMemo(() => {
    const currentMessages = messages[locale];

    return function t(key: string, params?: Record<string, string | number>): string {
      const keys = key.split('.');
      let value: unknown = currentMessages;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key; // Return key if translation not found
        }
      }

      if (typeof value !== 'string') {
        return key;
      }

      // Replace parameters in the message
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match;
        });
      }

      return value;
    };
  }, [locale]);
}