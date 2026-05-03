/** URLs partilhadas entre landing /game e dashboard Comunidade */
export const GAME_GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.edenicos.academy'
export const GAME_APP_STORE_URL = 'https://apps.apple.com/app/edenicos-academy/id123456789'

export function gamePromoUtm(campaign: 'game-hero' | 'comunidade-dashboard') {
  return `utm_source=site&utm_medium=web&utm_campaign=${campaign}`
}
