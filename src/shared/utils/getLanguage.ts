export function getLanguage(value = '') {
  const language = value.replace('_', '-').toLowerCase()

  if (language.includes('en-us')) {
    return 'en-us'
  }

  if (language.includes('pt-br')) {
    return 'pt-br'
  }

  return 'en-us'
}
