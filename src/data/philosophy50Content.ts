export interface Philosophy50Item {
  title: string
  description: string
}

export interface Philosophy50Dimension {
  id: string
  title: string
  subtitle: string
  color: string
  bgLight: string
  howWeCare: Philosophy50Item[]
  activities: Philosophy50Item[]
}

export const philosophy50Dimensions: Philosophy50Dimension[] = [
  {
    id: 'fisica',
    title: 'Dimensão Física',
    subtitle: 'Cuidado integral do corpo e promoção da saúde',
    color: 'text-rose-700',
    bgLight: 'bg-rose-50',
    howWeCare: [
      {
        title: 'Avaliação Nutricional Personalizada',
        description: 'Análise individual das necessidades nutricionais e criação de planos alimentares adequados para cada estudante.',
      },
      {
        title: 'Programa de Atividade Física Adaptada',
        description: 'Exercícios e esportes adequados às capacidades e interesses individuais de cada estudante.',
      },
      {
        title: 'Monitoramento de Saúde Preventiva',
        description: 'Acompanhamento regular com profissionais de saúde para prevenção e detecção precoce.',
      },
      {
        title: 'Educação sobre Autocuidado',
        description: 'Ensino de hábitos saudáveis, higiene pessoal e responsabilidade com o próprio corpo.',
      },
    ],
    activities: [
      {
        title: 'Esportes Aquáticos',
        description: 'Natação, polo aquático e atividades recreativas na água para desenvolvimento cardiovascular completo.',
      },
      {
        title: 'Oficinas Culinárias Saudáveis',
        description: 'Preparo de refeições nutritivas, aprendizado sobre ingredientes e técnicas de conservação.',
      },
      {
        title: 'Yoga e Mindfulness Corporal',
        description: 'Práticas de consciência corporal, flexibilidade e conexão mente-corpo.',
      },
      {
        title: 'Jardim Medicinal e Terapêutico',
        description: 'Cultivo de plantas medicinais e ervas aromáticas para chás e tratamentos naturais.',
      },
      {
        title: 'Primeiros Socorros e Segurança',
        description: 'Treinamento em procedimentos básicos de emergência e cuidados médicos essenciais.',
      },
    ],
  },
  {
    id: 'mental',
    title: 'Dimensão Mental',
    subtitle: 'Desenvolvimento cognitivo e bem-estar emocional',
    color: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    howWeCare: [
      { title: 'Acompanhamento Psicopedagógico', description: 'Suporte para dificuldades de aprendizagem e desenvolvimento de estratégias de estudo.' },
      { title: 'Programas de Inteligência Emocional', description: 'Atividades que fortalecem autoconhecimento, empatia e regulação emocional.' },
      { title: 'Orientação Vocacional', description: 'Apoio na descoberta de talentos e planejamento de carreira.' },
      { title: 'Prevenção ao Estresse', description: 'Técnicas de relaxamento e gestão da ansiedade no ambiente escolar.' },
    ],
    activities: [
      { title: 'Clube de Xadrez e Raciocínio', description: 'Jogos de estratégia para desenvolvimento do pensamento lógico.' },
      { title: 'Oficinas de Memória e Concentração', description: 'Exercícios práticos para melhorar foco e retenção.' },
      { title: 'Debates e Argumentação', description: 'Discussões guiadas sobre temas atuais e desenvolvimento do pensamento crítico.' },
      { title: 'Meditação e Atenção Plena', description: 'Práticas de mindfulness para calma e clareza mental.' },
    ],
  },
  {
    id: 'espiritual',
    title: 'Dimensão Espiritual',
    subtitle: 'Valores, propósito e conexão com o transcendente',
    color: 'text-amber-700',
    bgLight: 'bg-amber-50',
    howWeCare: [
      { title: 'Educação em Valores', description: 'Reflexão sobre ética, honestidade, respeito e responsabilidade.' },
      { title: 'Espaço para Reflexão', description: 'Momentos de silêncio e introspecção no cotidiano escolar.' },
      { title: 'Vivência de Princípios', description: 'Projetos que colocam valores em prática na comunidade.' },
      { title: 'Acompanhamento Pastoral/Orientativo', description: 'Suporte opcional para famílias que desejam aprofundar a dimensão espiritual.' },
    ],
    activities: [
      { title: 'Círculos de Valores', description: 'Conversas em grupo sobre temas como gratidão, perdão e solidariedade.' },
      { title: 'Projetos de Serviço Solidário', description: 'Ações concretas de ajuda ao próximo baseadas em valores.' },
      { title: 'Arte e Simbolismo', description: 'Expressão artística ligada a significados e narrativas de vida.' },
      { title: 'Celebrações e Rituais', description: 'Marcos que fortalecem identidade e sentido de pertencimento.' },
    ],
  },
  {
    id: 'social',
    title: 'Dimensão Social',
    subtitle: 'Relacionamentos saudáveis e cidadania',
    color: 'text-red-700',
    bgLight: 'bg-red-50',
    howWeCare: [
      { title: 'Mediação de Conflitos', description: 'Resolução pacífica de desentendimentos entre estudantes.' },
      { title: 'Programas de Liderança', description: 'Formação de representantes de turma e líderes positivos.' },
      { title: 'Inclusão e Diversidade', description: 'Atividades que promovem respeito às diferenças.' },
      { title: 'Parceria Família-Escola', description: 'Encontros e canais de comunicação com as famílias.' },
    ],
    activities: [
      { title: 'Assembleias de Turma', description: 'Espaço democrático para decisões coletivas e combinados.' },
      { title: 'Projetos Colaborativos', description: 'Trabalhos em equipe com objetivos comuns.' },
      { title: 'Simulações de Cidadania', description: 'Eleições, debates e noções de participação política.' },
      { title: 'Festivais e Eventos Comunitários', description: 'Celebrações que integram escola e comunidade.' },
    ],
  },
  {
    id: 'profissional',
    title: 'Dimensão Profissional',
    subtitle: 'Preparação para o mundo do trabalho e empreendedorismo',
    color: 'text-violet-700',
    bgLight: 'bg-violet-50',
    howWeCare: [
      { title: 'Orientação de Carreira', description: 'Informações sobre profissões e caminhos de formação.' },
      { title: 'Desenvolvimento de Competências', description: 'Comunicação, trabalho em equipe e resolução de problemas.' },
      { title: 'Contato com Profissionais', description: 'Palestras e visitas de pessoas de diferentes áreas.' },
      { title: 'Preparação para Mercado', description: 'Simulações de entrevistas e elaboração de currículo.' },
    ],
    activities: [
      { title: 'Feira de Profissões', description: 'Evento com stands e conversas sobre diversas carreiras.' },
      { title: 'Projetos de Empreendedorismo', description: 'Criação de miniempresas e soluções para problemas reais.' },
      { title: 'Estágios e Visitas Técnicas', description: 'Vivência em empresas e instituições parceiras.' },
      { title: 'Mentoria com Profissionais', description: 'Acompanhamento individual com voluntários do mercado.' },
    ],
  },
]
