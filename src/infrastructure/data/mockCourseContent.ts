import type { CoursePlayerMeta, QuizResultDetail, VideoLessonDetail } from '@src/types/courseContent.types'
import { mockCourses } from './mockCourses'

const videoIntro: VideoLessonDetail = {
  headline: 'História da Química Orgânica',
  subtitle: 'Vídeo • 15 min',
  description:
    'Nesta aula exploramos os marcos históricos que moldaram a química orgânica moderna, desde Wöhler até as sínteses contemporâneas.',
  ratingValue: 4.5,
  ratingCount: 365,
  filledStars: 4,
}

const quizUnit1: QuizResultDetail = {
  quizTitle: 'Quiz Final da Unidade 1',
  scorePercent: 40,
  correctCount: 2,
  totalCount: 5,
  questions: [
    {
      id: 1,
      correct: true,
      userAnswerLabel: 'Carbono tetravalente',
      explanation: 'O carbono forma quatro ligações covalentes, base da diversidade molecular orgânica.',
    },
    {
      id: 2,
      correct: false,
      userAnswerLabel: 'Apenas ligações iônicas',
      correctAnswerLabel: 'Ligações covalentes e polarizadas',
      explanation: 'Grupos funcionais envolvem ligações covalentes com polaridade variável.',
    },
    {
      id: 3,
      correct: true,
      userAnswerLabel: 'Isômeros',
      explanation: 'Mesma fórmula molecular, arranjo estrutural diferente.',
    },
    {
      id: 4,
      correct: false,
      userAnswerLabel: 'Reação de oxidação exclusiva',
      correctAnswerLabel: 'Substituição nucleofílica',
      explanation: 'Em halogenanos, a SN2 é um mecanismo comum com nucleófilos.',
    },
    {
      id: 5,
      correct: false,
      userAnswerLabel: 'Benzeno com três duplas fixas',
      correctAnswerLabel: 'Ressonância e deslocalização π',
      explanation: 'O anel aromático estabiliza-se por deslocalização dos eletrões π.',
    },
  ],
}

export const mockCoursePlayerById: Record<string, CoursePlayerMeta> = {
  '1': {
    courseId: '1',
    headerTitle: 'Fundamentos de Química Orgânica',
    sidebarSubtitle: 'Aventuras no Mundo dos Animais',
    instructor: 'Dr. Maria Silva',
    globalProgress: 75,
    units: [
      {
        id: 'u1',
        title: 'Unidade 1',
        progress: 100,
        locked: false,
        defaultExpanded: true,
        items: [
          {
            id: 'u1-v1',
            title: 'Vídeo de Introdução',
            type: 'video',
            durationMin: 15,
            status: 'completed',
            locked: false,
          },
          {
            id: 'u1-m1',
            title: 'Material de Apoio',
            type: 'material',
            durationMin: 10,
            status: 'completed',
            locked: false,
          },
          {
            id: 'u1-q1',
            title: 'Quiz da Unidade 1',
            type: 'quiz',
            durationMin: 20,
            status: 'completed',
            locked: false,
          },
        ],
      },
      {
        id: 'u2',
        title: 'Unidade 2',
        progress: 60,
        locked: false,
        defaultExpanded: false,
        items: [
          {
            id: 'u2-v1',
            title: 'Aula prática',
            type: 'video',
            durationMin: 25,
            status: 'available',
            locked: false,
          },
        ],
      },
      {
        id: 'u3',
        title: 'Unidade 3',
        progress: 0,
        locked: true,
        defaultExpanded: true,
        items: [
          {
            id: 'u3-v1',
            title: 'Tópicos avançados',
            type: 'video',
            durationMin: 30,
            status: 'locked',
            locked: true,
          },
        ],
      },
    ],
    finalQuizUnit: {
      id: 'uf',
      title: 'Quiz Final',
      progress: 100,
      locked: false,
      item: {
        id: 'uf-q1',
        title: 'Avaliação final do curso',
        type: 'quiz',
        durationMin: 45,
        status: 'completed',
        locked: false,
      },
    },
    discussions: [
      {
        id: 'd1',
        title: 'Dúvida sobre ressonância no benzeno',
        excerpt:
          'Gostaria de confirmar se a deslocalização dos eletrões π explica por completo a estabilidade do anel aromático em relação a um ciclo com duplas fixas.',
        authorName: 'Ana R.',
        authorAge: '14 anos',
        authorRole: 'Estudante',
        dateLabel: 'há 2 dias',
        category: 'ciencias',
        hashtags: ['#química', '#orgânica', '#benzeno'],
        likes: 24,
        comments: 8,
        views: 312,
      },
      {
        id: 'd2',
        title: 'Ferramentas para desenhar estruturas',
        excerpt:
          'Alguém recomenda um bom editor gratuito para esquemas de reação e nomenclatura IUPAC?',
        authorName: 'Bruno M.',
        authorAge: '16 anos',
        authorRole: 'Estudante',
        dateLabel: 'há 5 dias',
        category: 'tecnologia',
        hashtags: ['#ferramentas', '#IUPAC'],
        likes: 12,
        comments: 15,
        views: 98,
      },
      {
        id: 'd3',
        title: 'Analogia com peças de LEGO',
        excerpt:
          'A professora comparou os grupos funcionais a peças de encaixe — ajudou muito a visualizar substituições.',
        authorName: 'Carla S.',
        authorAge: '15 anos',
        authorRole: 'Estudante',
        dateLabel: 'há 1 semana',
        category: 'artes',
        hashtags: ['#metáfora', '#estudo'],
        likes: 40,
        comments: 6,
        views: 201,
      },
    ],
    videoDetails: {
      'u1-v1': videoIntro,
      'u2-v1': {
        headline: 'Aula prática — laboratório virtual',
        subtitle: 'Vídeo • 25 min',
        description: 'Simulação guiada de experimentos seguros com interpretação de resultados.',
        ratingValue: 4.8,
        ratingCount: 120,
        filledStars: 5,
      },
    },
    quizResults: {
      'u1-q1': quizUnit1,
      'uf-q1': {
        quizTitle: 'Avaliação final do curso',
        scorePercent: 88,
        correctCount: 22,
        totalCount: 25,
        questions: [
          {
            id: 1,
            correct: true,
            userAnswerLabel: 'Resposta correta exemplo',
            explanation: 'Breve explicação para a questão 1.',
          },
          {
            id: 2,
            correct: false,
            userAnswerLabel: 'Resposta incorreta',
            correctAnswerLabel: 'Resposta correta',
            explanation: 'Nota explicativa sobre o erro comum.',
          },
        ],
      },
    },
  },
}

const genericVideoDetail = (title: string): VideoLessonDetail => ({
  headline: title,
  subtitle: 'Vídeo • 10 min',
  description: 'Conteúdo em breve — explore as unidades ao lado.',
  ratingValue: 4.2,
  ratingCount: 48,
  filledStars: 4,
})

export function getCoursePlayerMeta(courseId: string): CoursePlayerMeta | null {
  const rich = mockCoursePlayerById[courseId]
  if (rich) return rich

  const course = mockCourses.find((c) => c.id === courseId)
  if (!course) return null

  const vidId = `${courseId}-intro`
  return {
    courseId,
    headerTitle: course.title,
    sidebarSubtitle: course.title,
    instructor: 'Formador Edênicos',
    globalProgress: course.progress,
    units: [
      {
        id: `${courseId}-u1`,
        title: 'Unidade 1',
        progress: Math.min(100, course.progress),
        locked: false,
        defaultExpanded: true,
        items: [
          {
            id: vidId,
            title: 'Introdução ao curso',
            type: 'video',
            durationMin: 10,
            status: 'available',
            locked: false,
          },
        ],
      },
    ],
    discussions: [],
    videoDetails: {
      [vidId]: genericVideoDetail('Introdução ao curso'),
    },
    quizResults: {},
  }
}
