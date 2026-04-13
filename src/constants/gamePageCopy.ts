/** Copy da página Game (secções pós-hero). */
export const gameHowToPlayCopy = {
  badge: 'Como Funciona',
  title: 'Veja Como é Jogar',
  subtitle:
    'Explore uma experiência onde cada missão ensina de forma leve e envolvente. Veja o fluxo do jogo e o que te espera em cada etapa.',
  slides: [
    {
      id: '1',
      label: 'Missões guiadas',
      caption: 'Passo a passo claro para avançar com confiança.',
    },
    {
      id: '2',
      label: 'Feedback na hora',
      caption: 'Entenda o que acertou e o que pode melhorar.',
    },
    {
      id: '3',
      label: 'Progressão visível',
      caption: 'Acompanhe conquistas e desbloqueie novos desafios.',
    },
  ],
  features: [
    {
      title: 'Aprenda com Facilidade',
      description:
        'Conteúdos pensados para fixar conceitos sem sobrecarga. Você aprende no seu ritmo, com explicações diretas e exemplos práticos.',
      tone: 'blue' as const,
    },
    {
      title: 'Desafios e Conquistas',
      description:
        'Missões variadas, recompensas e metas que mantêm a motivação alta. Cada vitória conta para a sua jornada.',
      tone: 'green' as const,
    },
    {
      title: 'Interação com Amigos',
      description:
        'Compartilhe progresso, compare conquistas e jogue junto com quem você escolher, em um ambiente seguro.',
      tone: 'purple' as const,
    },
  ],
} as const

export const gameSaveWorldCopy = {
  badge: 'Nossa Missão',
  titleBefore: 'Salve o Mundo Através da ',
  titleAccent: 'Cooperação',
  subtitle:
    'Junte-se a outros jogadores para causar impacto real: educação, comunidade e propósito andam juntos.',
  objectiveCard: {
    title: 'Objetivo Principal',
    body:
      'Completar missões educativas que traduzem aprendizado em ações positivas — para você e para quem está ao seu redor.',
    moreLabel: 'Saiba Mais',
    moreHref: '/institucional',
    playLabel: 'Jogar',
    playHref: '/game#game-hero-heading',
  },
  communityCard: {
    title: 'Comunidade Engajada',
    body:
      'Participe de desafios coletivos, eventos sazonais e rankings que celebram quem mais contribui com a comunidade.',
    bullets: ['Metas semanais em equipe', 'Reconhecimento entre pares'],
  },
  educationCard: {
    brand: 'Educação Transformadora',
    headline: 'Aprendizado que transforma o dia a dia',
    intro:
      'Unimos diversão e pedagogia para que estudar deixe de ser obrigação e vire aventura com sentido.',
    columns: [
      {
        title: 'Metodologia ativa',
        text: 'Você faz, erra, corrige e aprende de verdade — não só decora.',
      },
      {
        title: 'Conteúdo alinhado',
        text: 'Bases curriculares e habilidades para a vida em cada fase.',
      },
      {
        title: 'Impacto mensurável',
        text: 'Relatos e indicadores mostram evolução ao longo do tempo.',
      },
    ],
  },
} as const

export const gameAdventureCtaCopy = {
  badge: 'Mundo de Aventuras',
  titleBefore: 'Comece Agora a ',
  titleAccent: 'Aventura!',
  subtitle:
    'Embarque em uma jornada épica através de 7 continentes únicos, cada um com mais de 500 níveis desafiadores e recompensadores.',
  stats: [
    {
      value: '7',
      valueClass: 'yellow' as const,
      label: 'Níveis Totais',
      hint: '6 continentes + 1 fase secreta',
    },
    {
      value: '3500+',
      valueClass: 'green' as const,
      label: 'Novos Itens',
      hint: 'Mais de 500 níveis por continente',
    },
    {
      value: '∞',
      valueClass: 'purple' as const,
      label: 'Diversão Garantida',
      hint: 'Aventuras sem fim te esperam',
    },
  ],
  ctaLabel: 'Jogar Agora',
  footnoteBefore: 'Junte-se a milhares de jovens aventureiros e faça parte da missão mais importante: ',
  footnoteBold: 'Salvar nosso planeta!',
} as const
