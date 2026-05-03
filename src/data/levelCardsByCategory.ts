import type { CourseCategory } from '@src/types/course.types'

/** Conteúdo mock dos três cartões de nível na landing «Meu Cursos», por pilar STARS. */
export interface LevelCardsCategoryMock {
  basicDescription: string
  basicTags: readonly [string, string, string]
  progressPercent: number
  points: number
  adventures: number
  intermediateDescription: string
  advancedDescription: string
}

export const LEVEL_CARDS_MOCK_BY_CATEGORY: Record<CourseCategory, LevelCardsCategoryMock> = {
  sciences: {
    basicDescription:
      'Fundamentos divertidos para começar a jornada com confiança e curiosidade.',
    basicTags: ['Planetas', 'Estrelas', 'Foguetes'],
    progressPercent: 65,
    points: 520,
    adventures: 6,
    intermediateDescription: 'Desafios para quem já dominou o básico.',
    advancedDescription: 'Projetos complexos para pequenos especialistas.',
  },
  technology: {
    basicDescription:
      'Lógica, jogos e primeiros passos no digital com segurança e muita imaginação.',
    basicTags: ['Lógica', 'Apps', 'Robôs'],
    progressPercent: 52,
    points: 380,
    adventures: 4,
    intermediateDescription: 'Constrói projetos digitais e resolve desafios reais.',
    advancedDescription: 'Laboratórios avançados para futuros criadores de tecnologia.',
  },
  arts: {
    basicDescription:
      'Cores, sons e histórias para expressar ideias com liberdade e alegria.',
    basicTags: ['Cores', 'Música', 'Histórias'],
    progressPercent: 78,
    points: 640,
    adventures: 7,
    intermediateDescription: 'Aprofunda técnicas e monta apresentações com estilo.',
    advancedDescription: 'Projetos autorais para quem já domina a linguagem artística.',
  },
  relations: {
    basicDescription:
      'Escuta, empatia e trabalho em equipa para viver bem com quem está ao redor.',
    basicTags: ['Empatia', 'Diálogo', 'Equipe'],
    progressPercent: 40,
    points: 290,
    adventures: 3,
    intermediateDescription: 'Mediação, liderança gentil e vínculos mais profundos.',
    advancedDescription: 'Mentoria e projetos que transformam a comunidade escolar.',
  },
  service: {
    basicDescription:
      'Pequenos gestos que ajudam casa, escola e planeta com coração e responsabilidade.',
    basicTags: ['Comunidade', 'Natureza', 'Ajudar'],
    progressPercent: 12,
    points: 95,
    adventures: 2,
    intermediateDescription: 'Projetos em equipa com impacto visível na comunidade.',
    advancedDescription: 'Iniciativas de liderança e empreendedorismo social.',
  },
}

export function getLevelCardsMock(category: CourseCategory): LevelCardsCategoryMock {
  return LEVEL_CARDS_MOCK_BY_CATEGORY[category]
}
