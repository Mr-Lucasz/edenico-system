export type DocenteAdmin = {
  id: string
  iniciais: string
  nome: string
  email: string
  especialidade: string
}

export const ADMIN_CURSOS_DOCENTES_MOCK: DocenteAdmin[] = [
  {
    id: 'd1',
    iniciais: 'PRA',
    nome: 'Prof. Ricardo Almeida',
    email: 'ricardo.almeida@edenicos.com',
    especialidade: 'Matemática e Física',
  },
  {
    id: 'd2',
    iniciais: 'PJS',
    nome: 'Prof. Julia Santos',
    email: 'julia.santos@edenicos.com',
    especialidade: 'Artes Visuais',
  },
  {
    id: 'd3',
    iniciais: 'PEL',
    nome: 'Prof. Eduardo Lima',
    email: 'eduardo.lima@edenicos.com',
    especialidade: 'Tecnologia',
  },
  {
    id: 'd4',
    iniciais: 'PMC',
    nome: 'Prof. Mariana Costa',
    email: 'mariana.costa@edenicos.com',
    especialidade: 'Ciências Naturais',
  },
  {
    id: 'd5',
    iniciais: 'PFO',
    nome: 'Prof. Fernanda Oliveira',
    email: 'fernanda.oliveira@edenicos.com',
    especialidade: 'Língua Portuguesa',
  },
  {
    id: 'd6',
    iniciais: 'PRC',
    nome: 'Prof. Rafael Carvalho',
    email: 'rafael.carvalho@edenicos.com',
    especialidade: 'História e Geografia',
  },
  {
    id: 'd7',
    iniciais: 'PAN',
    nome: 'Prof. Ana Nunes',
    email: 'ana.nunes@edenicos.com',
    especialidade: 'Educação Física',
  },
  {
    id: 'd8',
    iniciais: 'PLM',
    nome: 'Prof. Lucas Mendes',
    email: 'lucas.mendes@edenicos.com',
    especialidade: 'Programação e Robótica',
  },
  {
    id: 'd9',
    iniciais: 'PCT',
    nome: 'Prof. Camila Torres',
    email: 'camila.torres@edenicos.com',
    especialidade: 'Música e Teatro',
  },
  {
    id: 'd10',
    iniciais: 'PBG',
    nome: 'Prof. Bruno Gomes',
    email: 'bruno.gomes@edenicos.com',
    especialidade: 'Filosofia e Sociologia',
  },
]

export const ADMIN_CURSOS_DOCENTES_PAGE_SIZE = 5
