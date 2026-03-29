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
  /** Métricas do app (faixa branca acima das lojas na home). */
  app: {
    students: '50K+',
    studentsLabel: 'Estudantes Ativos',
    missions: '100+',
    missionsLabel: 'Missões Disponíveis',
    rating: '4.9',
    ratingLabel: 'Avaliação',
  },
} as const
