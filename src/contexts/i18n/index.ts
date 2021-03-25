import React from 'react'
import { GetStaticProps } from 'next'
import esESTranslation from './es-ES.json'

export type TranslatableText = keyof typeof esESTranslation

const translations = {
  'es-ES': esESTranslation,
}

export interface I18nStaticProps {
  t(text: TranslatableText): string
}

export const withI18StaticProps: (fn?: GetStaticProps) => GetStaticProps = (
  fn = async () => ({ props: {} })
) => async (context) => {
  const { locale, defaultLocale } = context
  const staticProps = await fn(context)
  const componentProps = (staticProps as any).props || {}
  const currentLocale = locale ?? defaultLocale

  return {
    ...staticProps,
    props: {
      ...componentProps,
      locale: currentLocale,
    },
  }
}

export function useTranslate(
  locale: string
): (text: TranslatableText) => string {
  return React.useCallback(
    (text: string) => translations[locale]?.[text] ?? text,
    [locale]
  )
}
