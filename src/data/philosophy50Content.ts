export interface Philosophy50Item {
  title: string
  description: string
  /** Emoji à esquerda (protótipo: Atividades Relacionais / Profissionalizantes) */
  emoji?: string
  /** Sem pictograma à esquerda (ex.: Momentos de Silêncio) */
  hideIcon?: boolean
}

export interface Philosophy50Dimension {
  id: string
  title: string
  subtitle: string
  /** Cor do ícone (hex) — também usada no quadrado do cabeçalho */
  iconColor: string
  /** Fundo do cartão da dimensão (hex ou rgba) */
  cardSurface: string
  /** Borda do cartão principal (protótipo: tom suave da dimensão) */
  cardBorderColor: string
  /** Borda dos sub-cartões brancos */
  itemBorderColor: string
  /** Gradiente no quadrado do ícone do título (ex.: Relacional) */
  headerIconGradient?: string
  /** Título da coluna esquerda (default: «Como Cuidamos») */
  howWeCareColumnTitle?: string
  /** Título da coluna direita (default: «Atividades e Práticas») */
  activitiesColumnTitle?: string
  howWeCare: Philosophy50Item[]
  activities: Philosophy50Item[]
}

export const philosophy50Dimensions: Philosophy50Dimension[] = [
  {
    id: 'fisica',
    title: 'Dimensão Física',
    subtitle: 'Cuidado integral do corpo e promoção da saúde',
    iconColor: '#dc2626',
    cardSurface: '#fff5f5',
    cardBorderColor: '#fecaca',
    itemBorderColor: '#ffe4e6',
    howWeCare: [
      {
        title: 'Avaliação Nutricional Personalizada',
        description:
          'Análise individual das necessidades nutricionais e criação de planos alimentares adequados para cada estudante.',
      },
      {
        title: 'Programa de Atividade Física Adaptada',
        description:
          'Exercícios e esportes adequados às capacidades e interesses individuais de cada estudante.',
      },
      {
        title: 'Monitoramento de Saúde Preventiva',
        description:
          'Acompanhamento regular com profissionais de saúde para prevenção e detecção precoce.',
      },
      {
        title: 'Educação sobre Autocuidado',
        description:
          'Ensino de hábitos saudáveis, higiene pessoal e responsabilidade com o próprio corpo.',
      },
    ],
    activities: [
      {
        title: 'Esportes Aquáticos',
        description:
          'Natação, polo aquático e atividades recreativas na água para desenvolvimento cardiovascular completo.',
      },
      {
        title: 'Oficinas Culinárias Saudáveis',
        description:
          'Preparo de refeições nutritivas, aprendizado sobre ingredientes e técnicas de conservação.',
      },
      {
        title: 'Yoga e Mindfulness Corporal',
        description:
          'Práticas de consciência corporal, flexibilidade e conexão mente-corpo.',
      },
      {
        title: 'Jardim Medicinal e Terapêutico',
        description:
          'Cultivo de plantas medicinais e ervas aromáticas para chás e tratamentos naturais.',
      },
      {
        title: 'Primeiros Socorros e Segurança',
        description:
          'Treinamento em procedimentos básicos de emergência e cuidados médicos essenciais.',
      },
    ],
  },
  {
    id: 'mental',
    title: 'Dimensão Mental',
    subtitle: 'Desenvolvimento cognitivo e equilíbrio emocional',
    iconColor: '#3b82f6',
    cardSurface: '#f0f7ff',
    cardBorderColor: '#bfdbfe',
    itemBorderColor: '#dbeafe',
    activitiesColumnTitle: 'Atividades Cognitivas',
    howWeCare: [
      {
        title: 'Avaliação Neuropsicopedagógica',
        description:
          'Identificação de estilos de aprendizagem e potencialidades cognitivas individuais.',
      },
      {
        title: 'Programa de Inteligência Emocional',
        description:
          'Desenvolvimento sistemático de habilidades para reconhecer, compreender e regular emoções.',
      },
      {
        title: 'Apoio Psicológico Preventivo',
        description:
          'Acompanhamento psicológico regular para manutenção da saúde mental e prevenção de problemas.',
      },
      {
        title: 'Técnicas de Gestão de Stress',
        description:
          'Ensino de estratégias para lidar com pressão, ansiedade e desafios acadêmicos.',
      },
    ],
    activities: [
      {
        title: 'Jogos de Estratégia e Lógica',
        description:
          'Xadrez, damas, quebra-cabeças complexos e jogos que desenvolvem raciocínio lógico.',
      },
      {
        title: 'Clubes de Debate e Filosofia',
        description:
          'Discussões estruturadas sobre temas complexos para desenvolver pensamento crítico.',
      },
      {
        title: 'Teatro Terapêutico',
        description:
          'Representação dramática para expressão emocional e desenvolvimento da empatia.',
      },
      {
        title: 'Arte-Terapia Criativa',
        description:
          'Expressão artística como ferramenta terapêutica e de autoconhecimento.',
      },
      {
        title: 'Diários Reflexivos Digitais',
        description:
          'Registro de pensamentos e emoções usando plataformas digitais interativas.',
      },
    ],
  },
  {
    id: 'espiritual',
    title: 'Dimensão Espiritual',
    subtitle: 'Conexão com valores, propósito e transcendência',
    iconColor: '#8b5cf6',
    cardSurface: '#f3f4ff',
    cardBorderColor: '#e2e8f0',
    itemBorderColor: '#e8e0ff',
    activitiesColumnTitle: 'Práticas Espirituais',
    howWeCare: [
      {
        title: 'Exploração de Valores Universais',
        description:
          'Reflexão sobre princípios éticos fundamentais presentes em diferentes culturas e tradições.',
      },
      {
        title: 'Descoberta do Propósito Pessoal',
        description:
          'Orientação individualizada para identificação de missão de vida e significado existencial.',
      },
      {
        title: 'Práticas Contemplativas Universais',
        description:
          'Meditação, oração, contemplação da natureza adaptadas às crenças individuais.',
      },
      {
        title: 'Serviço e Gratidão',
        description:
          'Desenvolvimento da espiritualidade através de atos de servir ao próximo e gratidão diária.',
      },
    ],
    activities: [
      {
        title: 'Rituais de Gratidão Matinal',
        emoji: '🌅',
        description:
          'Momentos diários de reconhecimento pelas bênçãos e oportunidades recebidas.',
      },
      {
        title: 'Círculos de Partilha Espiritual',
        emoji: '💭',
        description:
          'Encontros respeitosos para compartilhar experiências espirituais e reflexões profundas.',
      },
      {
        title: 'Momentos de Silêncio e Reflexão',
        hideIcon: true,
        description:
          'Períodos contemplativos para conexão interior e aquietamento da mente.',
      },
      {
        title: 'Música Sacra e Meditativa',
        emoji: '🎵',
        description:
          'Apreciação e criação de músicas que elevam o espírito e inspiram a alma.',
      },
      {
        title: 'Estudo de Textos Inspiradores',
        emoji: '📖',
        description:
          'Leitura e discussão de obras que abordam temas transcendentais e espirituais.',
      },
    ],
  },
  {
    id: 'relacional',
    title: 'Dimensão Relacional',
    subtitle: 'Desenvolvimento da consciência social e ambiental',
    iconColor: '#14b8a6',
    cardSurface: '#f0faf5',
    cardBorderColor: '#d1eae0',
    itemBorderColor: '#d1eae0',
    headerIconGradient: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    activitiesColumnTitle: 'Atividades Relacionais',
    howWeCare: [
      {
        title: 'Programa de Mediação de Conflitos',
        description:
          'Treinamento em resolução pacífica de disputas e desenvolvimento de habilidades diplomáticas.',
      },
      {
        title: 'Projetos de Impacto Comunitário',
        description:
          'Engajamento em ações que beneficiam diretamente a comunidade local e regional.',
      },
      {
        title: 'Educação para Sustentabilidade',
        description:
          'Formação sobre questões ambientais e práticas sustentáveis no dia a dia.',
      },
      {
        title: 'Desenvolvimento de Empatia Global',
        description:
          'Conexão com estudantes de diferentes culturas e realidades sociais pelo mundo.',
      },
    ],
    activities: [
      {
        title: 'Intercâmbio Cultural Virtual',
        emoji: '🌐',
        description:
          'Conexões digitais com estudantes de diferentes países para troca de experiências.',
      },
      {
        title: 'Projetos de Reflorestamento',
        emoji: '🌳',
        description:
          'Plantio e cuidado de árvores nativas para restauração ambiental.',
      },
      {
        title: 'Simulações de Negociação',
        emoji: '🧩',
        description:
          'Atividades que replicam situações diplomáticas e de resolução de conflitos.',
      },
      {
        title: 'Campanha Zero Waste',
        emoji: '♻️',
        description:
          'Iniciativas para redução de resíduos e implementação de práticas sustentáveis.',
      },
    ],
  },
  {
    id: 'profissional',
    title: 'Dimensão Profissional',
    subtitle: 'Preparação para o futuro profissional e desenvolvimento de carreira',
    iconColor: '#5c67f2',
    cardSurface: '#f0f4ff',
    cardBorderColor: '#d1d9ff',
    itemBorderColor: '#e0e7ff',
    activitiesColumnTitle: 'Atividades Profissionalizantes',
    howWeCare: [
      {
        title: 'Orientação Vocacional Personalizada',
        description:
          'Identificação de talentos naturais e interesses profissionais através de assessments especializados.',
      },
      {
        title: 'Mentoria com Profissionais',
        description:
          'Conexão com especialistas de diversas áreas para orientação prática e networking.',
      },
      {
        title: 'Desenvolvimento de Soft Skills',
        description:
          'Treinamento em habilidades interpessoais essenciais para o mercado de trabalho.',
      },
      {
        title: 'Simulações Profissionais',
        description:
          'Experiências práticas que replicam ambientes e desafios do mundo corporativo.',
      },
    ],
    activities: [
      {
        title: 'Programa de Estágios Orientados',
        emoji: '💼',
        description:
          'Experiências profissionais supervisionadas em empresas parceiras da comunidade.',
      },
      {
        title: 'Incubadora de Startups Estudantis',
        emoji: '🚀',
        description:
          'Apoio na criação de empresas inovadoras com mentoria especializada.',
      },
      {
        title: 'Workshop de Apresentações',
        emoji: '🎤',
        description:
          'Desenvolvimento de habilidades de comunicação e apresentação profissional.',
      },
      {
        title: 'Simulação de Mercado Financeiro',
        emoji: '📊',
        description:
          'Experiências práticas com investimentos e gestão financeira empresarial.',
      },
      {
        title: 'Eventos de Networking',
        emoji: '🌐',
        description:
          'Eventos para conexão com profissionais e oportunidades de carreira.',
      },
    ],
  },
]
