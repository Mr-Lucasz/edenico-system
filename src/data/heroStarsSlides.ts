import { starsCategories } from '@src/data/starsContent'

/** Ordem S.T.A.R.S. na hero — imagem do heptágono por pilar (public/). */
export const HERO_STARS_SLIDE_IDS = ['science', 'technology', 'arts', 'relationship', 'service'] as const

export type HeroStarsSlideId = (typeof HERO_STARS_SLIDE_IDS)[number]

export interface HeroStarsSlide {
  id: HeroStarsSlideId
  letter: string
  title: string
  description: string
  heroImage: string
}

const HERO_HEPTAGONE_IMAGES: Record<HeroStarsSlideId, string> = {
  science: '/science-image-heptagone.jpg',
  technology: '/technology-image-heptagone.jpg',
  arts: '/art-image-heptagone.jpg',
  relationship: '/relations-image-heptagone.jpg',
  service: '/service-image-heptagone.jpg',
}

export const heroStarsSlides: HeroStarsSlide[] = HERO_STARS_SLIDE_IDS.map((id) => {
  const cat = starsCategories.find((c) => c.id === id)
  if (!cat) throw new Error(`heroStarsSlides: categoria ${id} não encontrada`)

  return {
    id,
    letter: cat.letter,
    title: cat.landingTitle ?? cat.title,
    description: cat.description ?? '',
    heroImage: HERO_HEPTAGONE_IMAGES[id],
  }
})
