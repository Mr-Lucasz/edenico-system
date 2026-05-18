export const DESKTOP_SITE_VIEW_STORAGE_KEY = 'edenicos-landing-desktop-site-view' as const

export const LANDING_LANG_STORAGE_KEY = 'edenicos-landing-lang' as const

export const LANDING_LANG_CHANGE_EVENT = 'edenicos-landing-lang' as const

export type LandingLang = 'pt' | 'en' | 'es'

export const LANDING_LANG_LABELS: Record<LandingLang, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
}
