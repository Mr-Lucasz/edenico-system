/**
 * Paleta de cores do dashboard Edénicos Academy
 */
export const colors = {
  // Cores por categoria
  category: {
    sciences: '#ef4444', // Vermelho - Ciências
    technology: '#a855f7', // Roxo - Tecnologia
    arts: '#f97316', // Laranja - Artes
    relations: '#3b82f6', // Azul - Relações
    service: '#10b981', // Verde - Serviço
  },
  // Cores dos summary cards - Pixel Perfect
  summary: {
    inProgress: {
      light: '#dbeafe', // Azul claro
      dark: '#3b82f6',
      text: '#ffffff', // Branco para título
      iconBg: '#bfdbfe', // bg-blue-200
    },
    completed: {
      light: '#d9f99d', // Lime claro
      dark: '#22c55e',
      text: '#1e6e44', // Verde escuro
      iconBg: '#86efac', // bg-green-200
    },
    studyHours: {
      light: '#fed7aa', // Laranja claro
      dark: '#f97316',
      text: '#6B4D2B', // Laranja escuro
      iconBg: '#fed7aa', // bg-orange-200
    },
    achievements: {
      light: '#f3e8ff', // Roxo claro
      dark: '#a855f7',
      text: '#6b21a8', // Roxo escuro
      iconBg: '#e9d5ff', // bg-purple-200
    },
  },
  // Cores de badges
  badges: {
    green: '#22c55e', // bg-green-500
    orange: '#f97316', // bg-orange-500
    pink: '#ec4899', // bg-pink-500
  },
  // Cores de ranking
  ranking: {
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700',
    diamond: '#b9f2ff',
  },
} as const
