import { enUSTranslation } from '@/shared/i18n/en-us'
import { ptBRTranslation } from '@/shared/i18n/pt-br'

const languages = {
  'en-us': enUSTranslation,
  'pt-br': ptBRTranslation,
}

export type Language = keyof typeof languages

function interpolate(message: string, variables: { [key: string]: string }) {
  return message.replace(/{{(\w+)}}/g, (_, key) => variables[key] || '')
}

export function getInternationalizedData(
  obj: Record<string, any> | Record<string, any>[],
  language: Language = 'en-us',
): Record<string, any> | Record<string, any>[] {
  if (Array.isArray(obj)) {
    if (obj.every((item) => typeof item === 'string')) {
      return obj
    }

    return obj.map((item) => getInternationalizedData(item, language))
  }

  if (
    (Object.keys(obj).length <= 2 && Object.keys(obj)[0]?.includes('issues')) ||
    Object.keys(obj)[0]?.includes('message')
  ) {
    const messageKey = obj.message
    const translatedMessage =
      languages[language][messageKey] ??
      languages['en-us'][messageKey] ??
      messageKey
    return {
      ...obj,
      message: interpolate(translatedMessage, obj),
    }
  }

  return Object.entries(obj).reduce((acc, [key, value]: [string, any]) => {
    if (value instanceof Date) {
      return { ...acc, [key]: value }
    }

    if (value instanceof Object) {
      return { ...acc, [key]: getInternationalizedData(value, language) }
    }

    if (key.includes('I18n')) {
      return {
        ...acc,
        [key.replace('I18n', '')]:
          languages[language][value] ?? languages[language][value] ?? value,
      }
    }

    return { ...acc, [key]: value }
  }, {})
}
