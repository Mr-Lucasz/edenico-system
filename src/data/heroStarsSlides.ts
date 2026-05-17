import { starsCategories } from '@src/data/starsContent'

/** Ordem S.T.A.R.S. na hero — Science usa imagem de teste no heptágono. */
export const HERO_STARS_SLIDE_IDS = ['science', 'technology', 'arts', 'relationship', 'service'] as const

export type HeroStarsSlideId = (typeof HERO_STARS_SLIDE_IDS)[number]

export interface HeroStarsSlide {
  id: HeroStarsSlideId
  letter: string
  title: string
  description: string
  heroImage: string
}

function decodePublicImagePath(encoded: string): string {
  try {
    return decodeURIComponent(encoded)
  } catch {
    return encoded
  }
}

export const heroStarsSlides: HeroStarsSlide[] = HERO_STARS_SLIDE_IDS.map((id) => {
  const cat = starsCategories.find((c) => c.id === id)
  if (!cat) throw new Error(`heroStarsSlides: categoria ${id} não encontrada`)

  let heroImage: string
  if (id === 'science') {
    heroImage = '/science-image-heptagone.jpg'
  } else if (cat.image) {
    heroImage = decodePublicImagePath(cat.image)
  } else {
    heroImage = '/Science (Cat).png'
  }

  return {
    id,
    letter: cat.letter,
    title: cat.landingTitle ?? cat.title,
    description: cat.description ?? '',
    heroImage,
  }
})
