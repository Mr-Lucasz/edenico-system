/**
 * Gradientes CSS (linear-gradient) — substituem utilitários Tailwind.
 */
export const gradients = {
  banner: 'linear-gradient(to right, #fb923c, #facc15, #f97316)',
  summaryInProgress:
    'linear-gradient(to bottom right, #eff6ff, rgba(219, 234, 254, 0.3), #eff6ff)',
  summaryCompleted:
    'linear-gradient(to bottom right, #f7fee7, rgba(217, 249, 157, 0.3), #f7fee7)',
  summaryStudyHours:
    'linear-gradient(to bottom right, #fff7ed, rgba(255, 237, 213, 0.3), #fff7ed)',
  summaryAchievements:
    'linear-gradient(to bottom right, #faf5ff, rgba(233, 213, 255, 0.3), #faf5ff)',
  welcomeCard: 'linear-gradient(to bottom right, #155dfb, #1447e6)',
  achievements:
    'linear-gradient(to bottom right, #faf5ff, rgba(233, 213, 255, 0.5), #f3e8ff)',
  events: 'linear-gradient(to bottom right, #dbeafe, rgba(191, 219, 254, 0.5), #bfdbfe)',
  navbarActive: 'linear-gradient(to right, #3b82f6, #9333ea)',
} as const
