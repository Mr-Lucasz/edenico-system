import type { CourseLevel } from '@src/types/course.types'

export type LevelSlug = 'basico' | 'intermediario' | 'avancado'

export const LEVEL_SLUGS: LevelSlug[] = ['basico', 'intermediario', 'avancado']

export function isLevelSlug(value: string): value is LevelSlug {
  return LEVEL_SLUGS.includes(value as LevelSlug)
}

const SLUG_TO_LEVEL: Record<LevelSlug, CourseLevel> = {
  basico: 'basic',
  intermediario: 'intermediate',
  avancado: 'advanced',
}

const LEVEL_TO_SLUG: Record<CourseLevel, LevelSlug> = {
  basic: 'basico',
  intermediate: 'intermediario',
  advanced: 'avancado',
}

export function parseLevelSlug(slug: string): CourseLevel | null {
  return SLUG_TO_LEVEL[slug as LevelSlug] ?? null
}

export function toLevelSlug(level: CourseLevel): LevelSlug {
  return LEVEL_TO_SLUG[level]
}

export function levelDisplayLabel(level: CourseLevel): string {
  switch (level) {
    case 'basic':
      return 'Nível Básico'
    case 'intermediate':
      return 'Nível Intermediário'
    case 'advanced':
      return 'Nível Avançado'
    default:
      return ''
  }
}
