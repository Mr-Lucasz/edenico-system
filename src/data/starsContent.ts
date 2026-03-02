import type { ReactNode } from 'react'
import type { IconBaseProps } from 'react-icons/lib'
import { FiActivity, FiCpu, FiMusic, FiHeart, FiHelpCircle } from 'react-icons/fi'

type IconType = (props: IconBaseProps) => ReactNode

export type StarsCategoryId = 'science' | 'technology' | 'arts' | 'relationship' | 'service'

export interface StarsCard {
  title: string
  description: string
  icon?: string
}

export interface StarsCategory {
  id: StarsCategoryId
  letter: string
  title: string
  /** Título exibido na landing (ex.: "Relations" no Figma); se não definido, usa title */
  landingTitle?: string
  subtitle: string
  leftColumnTitle: string
  rightColumnTitle: string
  leftCards: StarsCard[]
  rightCards: StarsCard[]
  icon: IconType
  color: string
  /** Cor em hex para aba ativa, título e botão na landing (Figma) */
  colorHex?: string
  /** Descrição longa para a landing (Figma/Gemini) */
  description?: string
  /** Tags "Áreas de Estudo" na landing (Figma) */
  areas?: string[]
  /** Caminho da imagem do mascote na landing (public) */
  image?: string
}

export const starsCategories: StarsCategory[] = [
  {
    id: 'science',
    letter: 'S',
    title: 'Science',
    subtitle: 'Descobrindo o mundo através da investigação científica',
    leftColumnTitle: 'Áreas de Estudo',
    rightColumnTitle: 'Atividades Práticas',
    icon: FiActivity,
    color: 'text-amber-700',
    colorHex: '#A66B46',
    description:
      'Na Edênicos Academy, a ciência é o caminho para despertar a curiosidade e compreender o funcionamento da vida e do universo. Por meio da observação, da investigação e da experimentação, os alunos desenvolvem uma mente analítica e crítica, aprendendo a valorizar a verdade e a buscar respostas fundamentadas. Acreditamos que a ciência abre portas para o conhecimento e inspira o desejo de explorar e transformar o mundo em um lugar melhor.',
    areas: ['Biologia Aplicada', 'Física Experimental', 'Química Sustentável', 'Ciências da Terra'],
    image: '/Science%20(Cat).png',
    leftCards: [
      { title: 'Biologia', description: 'Estudo da vida e organismos vivos' },
      { title: 'Química', description: 'Propriedades e transformações da matéria' },
      { title: 'Física', description: 'Leis fundamentais do universo' },
      { title: 'Sustentabilidade', description: 'Preservação do meio ambiente' },
    ],
    rightCards: [
      { title: 'Experimentos Laboratoriais', description: 'Experiências práticas com materiais seguros para compreender conceitos científicos fundamentais' },
      { title: 'Projeto de Jardim Científico', description: 'Cultivo de plantas para estudar fotossíntese, ciclos de vida e ecossistemas' },
      { title: 'Feira de Ciências Interativa', description: 'Apresentação de projetos científicos com demonstrações práticas e explicações' },
      { title: 'Investigação de Fenômenos', description: 'Análise de eventos naturais usando método científico e registro de observações' },
    ],
  },
  {
    id: 'technology',
    letter: 'T',
    title: 'Technology',
    subtitle: 'Inovação tecnológica para solucionar problemas reais',
    leftColumnTitle: 'Áreas de Desenvolvimento',
    rightColumnTitle: 'Projetos Tecnológicos',
    icon: FiCpu,
    color: 'text-purple-600',
    colorHex: '#A855F7',
    description:
      'Na Edênicos Academy, a tecnologia é entendida como uma ferramenta criativa para solucionar problemas e melhorar a vida em comunidade. Ao explorar a programação, a robótica e as inovações digitais, os alunos desenvolvem não apenas competências técnicas, mas também pensamento lógico, colaboração e visão empreendedora. Ensinamos que a tecnologia deve estar a serviço do ser humano e da natureza, promovendo avanços sustentáveis e éticos.',
    areas: ['Programação Criativa', 'Robótica Educacional', 'Design de Games', 'IA Ética'],
    image: '/Technology%20(Beaver)%202.png',
    leftCards: [
      { title: 'Matemática Aplicada', description: 'Resolução de problemas reais usando lógica matemática e cálculos práticos' },
      { title: 'Programação Criativa', description: 'Desenvolvimento de jogos, aplicativos e soluções digitais inovadoras' },
      { title: 'Engenharia Maker', description: 'Construção de protótipos e invenções usando tecnologia e criatividade' },
    ],
    rightCards: [
      { title: 'Desenvolvimento de Apps', description: 'Criação de aplicações móveis para resolver problemas da comunidade escolar' },
      { title: 'Robótica Educativa', description: 'Montagem e programação de robôs para competições e projetos colaborativos' },
      { title: 'Game Design', description: 'Desenho e desenvolvimento de jogos educativos com propósito social' },
      { title: 'Laboratório Maker', description: 'Uso de impressoras 3D e ferramentas digitais para materializar ideias' },
    ],
  },
  {
    id: 'arts',
    letter: 'A',
    title: 'Arts',
    subtitle: 'Expressão criativa e comunicação através das artes',
    leftColumnTitle: 'Modalidades Artísticas',
    rightColumnTitle: 'Projetos Artísticos',
    icon: FiMusic,
    color: 'text-orange-600',
    colorHex: '#F97316',
    description:
      'Na Edênicos Academy, a arte é uma linguagem viva que desperta criatividade, sensibilidade e expressão individual. Por meio da música, desenho, pintura, teatro e outras formas artísticas, os alunos desenvolvem não apenas habilidades técnicas, mas também a capacidade de comunicar valores, emoções e ideias de forma autêntica. Acreditamos que a arte educa o olhar, amplia o pensamento e conecta o ser humano com o belo e o transcendente.',
    areas: ['Pintura Digital', 'Música Moderna', 'Teatro Criativo', 'Literatura'],
    image: '/A%20Zorro%201.png',
    leftCards: [
      { title: 'Oratória e Teatro', description: 'Desenvolvimento da comunicação oral e expressão corporal' },
      { title: 'Escrita Criativa', description: 'Produção literária, poesia e narrativas autorais' },
      { title: 'Artes Visuais', description: 'Pintura, desenho, escultura e artes digitais' },
      { title: 'Música e Som', description: 'Composição, performance e produção musical' },
      { title: 'Idiomas Vivos', description: 'Comunicação multicultural e expressão linguística' },
    ],
    rightCards: [
      { title: 'Festival Multicultural', description: 'Evento anual com apresentações teatrais, musicais e exposições artísticas dos estudantes' },
      { title: 'Revista Literária Edênica', description: 'Publicação estudantil com contos, poemas, artigos e ilustrações autorais' },
      { title: 'Murais Colaborativos', description: 'Criação de obras de arte coletivas que decoram e transformam os espaços escolares' },
      { title: 'TED Talks Estudantis', description: 'Apresentações inspiradoras onde estudantes compartilham suas paixões e descobertas' },
    ],
  },
  {
    id: 'relationship',
    letter: 'R',
    title: 'Relationship',
    landingTitle: 'Relations',
    subtitle: 'Construindo conexões significativas e inteligência emocional',
    leftColumnTitle: 'Dimensões Relacionais',
    rightColumnTitle: 'Atividades Relacionais',
    icon: FiHeart,
    color: 'text-green-600',
    colorHex: '#22C55E',
    description:
      'Na Edênicos Academy, as relações humanas são o coração da formação integral. Acreditamos que aprender a conviver, dialogar e respeitar a diversidade é essencial para a vida em sociedade. Por meio de experiências de cooperação, liderança e empatia, os alunos constroem vínculos saudáveis e desenvolvem habilidades socioemocionais que fortalecem o caráter e a convivência comunitária. O ser humano cresce quando aprende a viver em relação.',
    areas: ['Comunicação e Oratória', 'Liderança Colaborativa', 'Inteligência Emocional', 'Mediação de Conflitos'],
    image: '/Relations%20(Panda).png',
    leftCards: [
      { title: 'Autoconhecimento', description: 'Desenvolvimento da consciência sobre si mesmo e suas emoções' },
      { title: 'Família e Casa', description: 'Fortalecimento dos vínculos familiares e responsabilidades domésticas' },
      { title: 'Comunidade Escolar', description: 'Colaboração, liderança e trabalho em equipe no ambiente educativo' },
      { title: 'Sociedade e Cidadania', description: 'Participação ativa na comunidade e consciência social' },
      { title: 'Natureza e Planeta', description: 'Conexão com o meio ambiente e sustentabilidade global' },
    ],
    rightCards: [
      { title: 'Círculos de Diálogo', description: 'Conversas estruturadas sobre emoções, conflitos e experiências pessoais' },
      { title: 'Projeto Família Edênica', description: 'Atividades que envolvem famílias na jornada educativa dos estudantes' },
      { title: 'Mentoria Entre Pares', description: 'Estudantes mais experientes orientam novatos em desenvolvimento pessoal' },
      { title: 'Grupos de Apoio Emocional', description: 'Espaços seguros para compartilhar desafios e celebrar conquistas' },
    ],
  },
  {
    id: 'service',
    letter: 'S',
    title: 'Service',
    subtitle: 'Serviço à comunidade e desenvolvimento de habilidades para a vida',
    leftColumnTitle: 'Áreas de Serviço',
    rightColumnTitle: 'Projetos de Impacto',
    icon: FiHelpCircle,
    color: 'text-red-600',
    colorHex: '#EF4444',
    description:
      'Na Edênicos Academy, o serviço é a expressão prática do amor ao próximo. Incentivamos os alunos a se engajar em projetos sociais, ambientais e comunitários, colocando seus talentos a favor de causas maiores. O serviço desperta a solidariedade, a humildade e a responsabilidade cidadã, formando indivíduos comprometidos em transformar a realidade ao seu redor com gestos concretos de bondade e justiça.',
    areas: ['Projetos Comunitários', 'Educação Ambiental', 'Voluntariado Social', 'Empreendedorismo'],
    image: '/Service%20(Dog).png',
    leftCards: [
      { title: 'Serviço Doméstico', description: 'Responsabilidades em casa: organização, cuidado e colaboração familiar' },
      { title: 'Ação Comunitária', description: 'Projetos sociais, voluntariado e impacto positivo na comunidade' },
      { title: 'Empreendedorismo Social', description: 'Criação de negócios com propósito e impacto social positivo' },
      { title: 'Educação Financeira', description: 'Gestão de recursos, planejamento e economia consciente' },
      { title: 'Liderança Colaborativa', description: 'Formação de líderes que inspiram e trabalham em equipe' },
    ],
    rightCards: [
      { title: 'Adote uma Família', description: "Estudantes 'adotam' famílias da comunidade para prestar auxílio e apoio contínuo" },
      { title: 'StartUp Estudantil', description: 'Incubadora de negócios gerenciada por estudantes com mentoria profissional' },
      { title: 'Banco Escolar Edênico', description: 'Sistema financeiro simulado para ensinar gestão de dinheiro e investimentos' },
      { title: 'Líderes do Amanhã', description: 'Programa de formação de líderes com projetos reais de transformação social' },
    ],
  },
]
