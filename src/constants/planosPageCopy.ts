export const PLANOS_DONATION = {
  titleLine1: 'Apoie esta nova era da',
  titleHighlight: 'Educação',
  subtitle:
    'Sua contribuição financia conteúdo de qualidade, tecnologia acessível e o impacto positivo da metodologia STARS em milhares de estudantes.',
  donationUnique: 'Doação Única',
  donationRecurring: 'Doação Recorrente',
  amounts: ['R$ 50', 'R$ 100', 'R$ 200', 'R$ 500'] as const,
  currencyLabel: 'Moeda',
  currencyOption: 'R$ — Real Brasileiro',
  otherLabel: 'Outro valor',
  otherPlaceholder: 'R$ 0,00',
  ctaRecurring: 'Doar Mensalmente',
  ctaOnce: 'Doar agora',
  rightTitle: 'Ajude-nos a fazer mais',
  quote:
    '“Cada doação amplifica nossa capacidade de levar educação de excelência a quem mais precisa.”',
  quoteAuthor: '— CEO, Edênicos Academy',
  stats: [
    { value: '15K+', label: 'Estudantes', tone: 'blue' as const },
    { value: '95%', label: 'Satisfação', tone: 'pink' as const },
    { value: '500+', label: 'Doadores', tone: 'pinkHeart' as const },
  ],
} as const

export const PLANOS_CONSULTING = {
  tag: 'Consultoria Personalizada',
  title: 'Precisa de orientação personalizada?',
  subtitle:
    'Nossa equipa ajuda instituições e famílias a integrar a metodologia STARS com planos sob medida.',
  benefits: [
    {
      title: 'Diagnóstico claro',
      text: 'Mapeamos necessidades e prioridades em sessões guiadas.',
      tone: 'green' as const,
    },
    {
      title: 'Equipe dedicada',
      text: 'Especialistas acompanham implementação e formação.',
      tone: 'blue' as const,
    },
    {
      title: 'Suporte contínuo',
      text: 'Canais diretos para dúvidas e ajustes ao longo do tempo.',
      tone: 'purple' as const,
    },
  ],
  cta: 'Fale com o Consultor',
  ctaHint: 'Resposta em até 2 dias úteis.',
} as const

export const PLANOS_PRICING = {
  title: 'Escolha seu Plano',
  subtitle: 'Acesso completo à plataforma, missões e relatórios — cancele quando quiser.',
  monthly: 'Mensal',
  annual: 'Anual',
  annualHint: 'Economize com o plano anual',
  popular: 'Mais Popular',
  acquire: 'Adquirir Plano',
  plans: [
    {
      id: 'basico',
      name: 'Básico',
      description: 'Ideal para começar com o essencial.',
      priceMonthly: 29.9,
      priceAnnual: 24.9,
      icon: 'blue' as const,
      featured: false,
      features: [
        'Acesso ao app e conteúdos base',
        'Missões semanais ilimitadas',
        'Relatório de progresso mensal',
        'Suporte por e-mail',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'O equilíbrio perfeito entre recurso e valor.',
      priceMonthly: 59.9,
      priceAnnual: 49.9,
      icon: 'purple' as const,
      featured: true,
      features: [
        'Tudo do Básico',
        'Trilhas personalizadas STARS',
        'Desafios e recompensas extras',
        'Relatórios detalhados',
        'Suporte prioritário',
      ],
    },
    {
      id: 'premium_plus',
      name: 'Premium+',
      description: 'Máximo desempenho para famílias e escolas.',
      priceMonthly: 99.9,
      priceAnnual: 83.9,
      icon: 'rose' as const,
      featured: false,
      features: [
        'Tudo do Premium',
        'Consultoria trimestral incluída',
        'API e integrações escolares',
        'Gestor de conta dedicado',
        'SLA de suporte estendido',
      ],
    },
  ],
} as const
