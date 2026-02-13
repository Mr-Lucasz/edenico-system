/**
 * Fonte única de estatísticas (Single Source of Truth).
 * Consumido pela Home e pela página Institucional.
 */
export const institutionalStats = {
  /** Impacto B2B / Institucional: estudantes impactados, escolas parceiras, etc. */
  impact: {
    studentsImpacted: '50.000+',
    schoolsPartner: '500+',
    satisfactionPercent: '95%',
    supportLabel: '24/7', // exibido estático (sem CountUp)
    projectsDeveloped: '800+',
  },
  /** Métricas do app (seção download / home). */
  app: {
    students: '2.000+',
    classes: '350+',
    rating: '4.8/5.0',
  },
} as const
