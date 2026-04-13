export type LessonItemType = 'video' | 'material' | 'quiz'

export type LessonStatus = 'completed' | 'available' | 'locked'

export interface LessonItem {
  id: string
  title: string
  type: LessonItemType
  durationMin: number
  status: LessonStatus
  locked: boolean
}

export interface CourseUnit {
  id: string
  title: string
  /** Progress 0–100 */
  progress: number
  /** Unidade bloqueada (ex.: dependências) */
  locked: boolean
  defaultExpanded: boolean
  items: LessonItem[]
}

export type DiscussionCategoryTag = 'ciencias' | 'tecnologia' | 'artes' | 'relacionamento' | 'servico'

export interface DiscussionPost {
  id: string
  title: string
  excerpt: string
  authorName: string
  authorAge: string
  authorRole: string
  dateLabel: string
  category: DiscussionCategoryTag
  hashtags: string[]
  likes: number
  comments: number
  views: number
}

export interface VideoLessonDetail {
  headline: string
  subtitle: string
  description: string
  ratingValue: number
  ratingCount: number
  filledStars: number
}

export interface QuizQuestionReview {
  id: number
  correct: boolean
  userAnswerLabel: string
  correctAnswerLabel?: string
  explanation: string
}

export interface QuizResultDetail {
  quizTitle: string
  scorePercent: number
  correctCount: number
  totalCount: number
  questions: QuizQuestionReview[]
}

export interface CoursePlayerMeta {
  courseId: string
  /** Título no header (mock pode diferir do catálogo) */
  headerTitle: string
  sidebarSubtitle: string
  instructor: string
  globalProgress: number
  units: CourseUnit[]
  /** Unidade final tipo quiz */
  finalQuizUnit?: {
    id: string
    title: string
    progress: number
    locked: boolean
    item: LessonItem
  }
  discussions: DiscussionPost[]
  /** Detalhe por item id (vídeo) */
  videoDetails: Record<string, VideoLessonDetail>
  /** Resultado quiz por item id */
  quizResults: Record<string, QuizResultDetail>
}
