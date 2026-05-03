/** Dados mock para Gestão de Usuários (admin). */

export type PerfilUsuario = 'estudante' | 'docente' | 'responsavel' | 'prestador' | 'administrador'
export type StatusUsuario = 'ativo' | 'inativo'

export type UsuarioAdminRow = {
  id: string
  nome: string
  email: string
  perfil: PerfilUsuario
  cpf: string
  telefone: string
  status: StatusUsuario
  ultimoAcesso: string
  cadastroISO: string
  unidade: string
  atribuicao: string
}

export const USUARIOS_KPIS = {
  total: 1247,
  estudantesAtivos: 556,
  docentesAtivos: 45,
  responsaveis: 722,
  novosHoje: 14,
} as const

/** Crescimento por mês: [estudantes, responsáveis, docentes] somados ao cadastro (valores fictícios). */
export const USUARIOS_CRESCIMENTO_MENSAL: { mes: string; estudantes: number; responsaveis: number; docentes: number }[] = [
  { mes: 'Jan', estudantes: 42, responsaveis: 28, docentes: 2 },
  { mes: 'Fev', estudantes: 48, responsaveis: 31, docentes: 1 },
  { mes: 'Mar', estudantes: 55, responsaveis: 35, docentes: 3 },
  { mes: 'Abr', estudantes: 51, responsaveis: 33, docentes: 2 },
  { mes: 'Mai', estudantes: 62, responsaveis: 40, docentes: 2 },
  { mes: 'Jun', estudantes: 58, responsaveis: 38, docentes: 4 },
  { mes: 'Jul', estudantes: 71, responsaveis: 44, docentes: 3 },
  { mes: 'Ago', estudantes: 66, responsaveis: 41, docentes: 2 },
  { mes: 'Set', estudantes: 74, responsaveis: 46, docentes: 5 },
  { mes: 'Out', estudantes: 69, responsaveis: 43, docentes: 3 },
  { mes: 'Nov', estudantes: 78, responsaveis: 48, docentes: 4 },
  { mes: 'Dez', estudantes: 82, responsaveis: 52, docentes: 3 },
]

export const USUARIOS_DISTRIBUICAO_PCT: { perfil: PerfilUsuario; pct: number; cor: string }[] = [
  { perfil: 'estudante', pct: 44.6, cor: '#3b82f6' },
  { perfil: 'responsavel', pct: 38.2, cor: '#f97316' },
  { perfil: 'docente', pct: 10.1, cor: '#8b5cf6' },
  { perfil: 'prestador', pct: 4.8, cor: '#ec4899' },
  { perfil: 'administrador', pct: 2.3, cor: '#64748b' },
]

export type UltimoCadastroItem = { id: string; nome: string; perfil: PerfilUsuario; status: StatusUsuario }

export const USUARIOS_ULTIMOS_CADASTROS: UltimoCadastroItem[] = [
  { id: 'uc1', nome: 'Maria Clara Oliveira', perfil: 'estudante', status: 'ativo' },
  { id: 'uc2', nome: 'João Pedro Silva', perfil: 'estudante', status: 'ativo' },
  { id: 'uc3', nome: 'Ana Paula Ferreira', perfil: 'responsavel', status: 'ativo' },
  { id: 'uc4', nome: 'Carlos Eduardo Mendes', perfil: 'docente', status: 'ativo' },
  { id: 'uc5', nome: 'Fernanda Costa', perfil: 'estudante', status: 'ativo' },
]

export type OuvidoriaItem = {
  id: string
  usuario: string
  perfil: PerfilUsuario
  status: 'pendente' | 'resolvido'
  titulo: string
}

export const USUARIOS_OUVIDORIA: OuvidoriaItem[] = [
  { id: 'ov1', usuario: 'Lucas Martins', perfil: 'responsavel', status: 'pendente', titulo: 'Dúvida sobre fatura' },
  { id: 'ov2', usuario: 'Beatriz Souza', perfil: 'estudante', status: 'resolvido', titulo: 'Acesso ao curso' },
  { id: 'ov3', usuario: 'Ricardo Alves', perfil: 'docente', status: 'pendente', titulo: 'Material didático' },
  { id: 'ov4', usuario: 'Juliana Rocha', perfil: 'estudante', status: 'resolvido', titulo: 'Certificado' },
]

export const MOCK_CURSOS_DOCENTE = [
  {
    id: 'c1',
    titulo: 'Aventuras no Mundo dos Animais',
    area: 'Ciências',
    areaCor: '#b45309',
    nivel: 'Básico',
    faixa: '5-7 anos',
  },
  {
    id: 'c2',
    titulo: 'Robótica para Iniciantes',
    area: 'Tecnologia',
    areaCor: '#7c3aed',
    nivel: 'Básico',
    faixa: '8-10 anos',
  },
  {
    id: 'c3',
    titulo: 'Programação com Scratch',
    area: 'Tecnologia',
    areaCor: '#7c3aed',
    nivel: 'Intermediário',
    faixa: '8-10 anos',
  },
  {
    id: 'c4',
    titulo: 'Teatro e Expressão',
    area: 'Artes',
    areaCor: '#ea580c',
    nivel: 'Básico',
    faixa: '5-7 anos',
  },
  {
    id: 'c5',
    titulo: 'Matemática Divertida',
    area: 'Ciências',
    areaCor: '#b45309',
    nivel: 'Básico',
    faixa: '8-10 anos',
  },
] as const

export const FAIXAS_ETARIAS_OPCOES = ['5-7 anos', '8-10 anos', '10-12 anos', '13-15 anos'] as const

export const USUARIOS_MOCK_ROWS: UsuarioAdminRow[] = [
  {
    id: 'USR-1001',
    nome: 'Ana Carolina Santos',
    email: 'ana.santos@email.com.br',
    perfil: 'estudante',
    cpf: '123.456.789-00',
    telefone: '(11) 91234-5678',
    status: 'ativo',
    ultimoAcesso: '2024-11-14 10:20',
    cadastroISO: '2023-01-14',
    unidade: 'Unidade Paulista',
    atribuicao: 'Plano Mensal · 12 cursos',
  },
  {
    id: 'USR-1002',
    nome: 'Bruno Henrique Lima',
    email: 'bruno.lima@outlook.com',
    perfil: 'docente',
    cpf: '234.567.890-11',
    telefone: '(21) 99876-5432',
    status: 'ativo',
    ultimoAcesso: '2024-11-13 16:45',
    cadastroISO: '2022-08-03',
    unidade: 'Unidade Centro',
    atribuicao: '8 cursos · Disponível',
  },
  {
    id: 'USR-1003',
    nome: 'Carla Mendes Ribeiro',
    email: 'carla.mendes@gmail.com',
    perfil: 'responsavel',
    cpf: '345.678.901-22',
    telefone: '(31) 98765-4321',
    status: 'ativo',
    ultimoAcesso: '2024-11-12 09:10',
    cadastroISO: '2023-05-22',
    unidade: 'Unidade BH',
    atribuicao: '2 estudantes',
  },
  {
    id: 'USR-1004',
    nome: 'Daniel Costa Pereira',
    email: 'daniel.costa@empresa.com.br',
    perfil: 'prestador',
    cpf: '456.789.012-33',
    telefone: '(41) 97654-3210',
    status: 'inativo',
    ultimoAcesso: '2024-09-01 14:00',
    cadastroISO: '2021-11-10',
    unidade: 'Matriz',
    atribuicao: 'Suporte técnico',
  },
  {
    id: 'USR-1005',
    nome: 'Eduarda Ferreira',
    email: 'eduarda.f@icloud.com',
    perfil: 'estudante',
    cpf: '567.890.123-44',
    telefone: '(51) 96543-2109',
    status: 'ativo',
    ultimoAcesso: '2024-11-14 08:05',
    cadastroISO: '2024-02-01',
    unidade: 'Unidade Sul',
    atribuicao: 'Plano Semestral · 4 cursos',
  },
  {
    id: 'USR-1006',
    nome: 'Felipe Augusto Nunes',
    email: 'felipe.nunes@edu.br',
    perfil: 'docente',
    cpf: '678.901.234-55',
    telefone: '(61) 95432-1098',
    status: 'ativo',
    ultimoAcesso: '2024-11-11 11:30',
    cadastroISO: '2020-04-18',
    unidade: 'Unidade Brasília',
    atribuicao: '5 cursos',
  },
  {
    id: 'USR-1007',
    nome: 'Gabriela Martins Silva',
    email: 'gabriela.martins@yahoo.com.br',
    perfil: 'responsavel',
    cpf: '789.012.345-66',
    telefone: '(71) 94321-0987',
    status: 'ativo',
    ultimoAcesso: '2024-11-10 19:22',
    cadastroISO: '2023-09-09',
    unidade: 'Unidade Nordeste',
    atribuicao: '1 estudante',
  },
  {
    id: 'USR-1008',
    nome: 'Helena Prado',
    email: 'helena.prado@edenicos.com',
    perfil: 'administrador',
    cpf: '890.123.456-77',
    telefone: '(11) 93210-9876',
    status: 'ativo',
    ultimoAcesso: '2024-11-14 07:55',
    cadastroISO: '2019-01-05',
    unidade: 'Matriz',
    atribuicao: 'Acesso total',
  },
  {
    id: 'USR-1009',
    nome: 'Igor Vieira',
    email: 'igor.vieira@proton.me',
    perfil: 'estudante',
    cpf: '901.234.567-88',
    telefone: '(85) 92109-8765',
    status: 'inativo',
    ultimoAcesso: '2024-06-20 13:40',
    cadastroISO: '2023-12-01',
    unidade: 'Unidade Fortaleza',
    atribuicao: 'Trial',
  },
  {
    id: 'USR-1010',
    nome: 'Juliana Rocha',
    email: 'juliana.rocha@live.com',
    perfil: 'estudante',
    cpf: '012.345.678-99',
    telefone: '(19) 91098-7654',
    status: 'ativo',
    ultimoAcesso: '2024-11-13 21:15',
    cadastroISO: '2024-06-15',
    unidade: 'Unidade Campinas',
    atribuicao: 'Plano Anual · 6 cursos',
  },
  {
    id: 'USR-1011',
    nome: 'Kleber Dias',
    email: 'kleber.dias@email.com',
    perfil: 'docente',
    cpf: '111.222.333-44',
    telefone: '(27) 99988-7766',
    status: 'ativo',
    ultimoAcesso: '2024-11-09 10:00',
    cadastroISO: '2021-03-12',
    unidade: 'Unidade Vitória',
    atribuicao: '10 cursos',
  },
  {
    id: 'USR-1012',
    nome: 'Larissa Monteiro',
    email: 'larissa.monteiro@uol.com.br',
    perfil: 'responsavel',
    cpf: '222.333.444-55',
    telefone: '(48) 98877-6655',
    status: 'ativo',
    ultimoAcesso: '2024-11-08 08:12',
    cadastroISO: '2022-07-07',
    unidade: 'Unidade Sul',
    atribuicao: '3 estudantes',
  },
  {
    id: 'USR-1013',
    nome: 'Marcos Antônio Teixeira',
    email: 'marcos.teixeira@corp.br',
    perfil: 'prestador',
    cpf: '333.444.555-66',
    telefone: '(62) 97766-5544',
    status: 'ativo',
    ultimoAcesso: '2024-11-07 15:30',
    cadastroISO: '2023-03-28',
    unidade: 'Goiânia',
    atribuicao: 'Conteúdo audiovisual',
  },
  {
    id: 'USR-1014',
    nome: 'Natália Borges',
    email: 'natalia.borges@gmail.com',
    perfil: 'estudante',
    cpf: '444.555.666-77',
    telefone: '(81) 96655-4433',
    status: 'ativo',
    ultimoAcesso: '2024-11-14 12:00',
    cadastroISO: '2024-01-10',
    unidade: 'Unidade Recife',
    atribuicao: 'Plano Mensal',
  },
  {
    id: 'USR-1015',
    nome: 'Otávio Ramos',
    email: 'otavio.ramos@edu.br',
    perfil: 'docente',
    cpf: '555.666.777-88',
    telefone: '(51) 95544-3322',
    status: 'inativo',
    ultimoAcesso: '2024-01-15 09:00',
    cadastroISO: '2018-09-01',
    unidade: 'Unidade Sul',
    atribuicao: '—',
  },
  {
    id: 'USR-1016',
    nome: 'Patrícia Gomes',
    email: 'patricia.gomes@icloud.com',
    perfil: 'responsavel',
    cpf: '666.777.888-99',
    telefone: '(11) 94433-2211',
    status: 'ativo',
    ultimoAcesso: '2024-11-05 18:40',
    cadastroISO: '2023-11-20',
    unidade: 'Unidade Paulista',
    atribuicao: '2 estudantes',
  },
  {
    id: 'USR-1017',
    nome: 'Quésia Almeida',
    email: 'quesia.almeida@hotmail.com',
    perfil: 'estudante',
    cpf: '777.888.999-00',
    telefone: '(92) 93322-1100',
    status: 'ativo',
    ultimoAcesso: '2024-11-04 07:20',
    cadastroISO: '2024-03-03',
    unidade: 'Unidade Norte',
    atribuicao: 'Plano Trimestral',
  },
  {
    id: 'USR-1018',
    nome: 'Rafael Duarte',
    email: 'rafael.duarte@edenicos.com',
    perfil: 'administrador',
    cpf: '888.999.000-11',
    telefone: '(11) 92211-0099',
    status: 'ativo',
    ultimoAcesso: '2024-11-14 06:10',
    cadastroISO: '2020-02-14',
    unidade: 'Matriz',
    atribuicao: 'Financeiro + Usuários',
  },
  {
    id: 'USR-1019',
    nome: 'Sabrina Lopes',
    email: 'sabrina.lopes@email.com.br',
    perfil: 'estudante',
    cpf: '999.000.111-22',
    telefone: '(35) 91100-9988',
    status: 'ativo',
    ultimoAcesso: '2024-11-03 14:55',
    cadastroISO: '2024-04-22',
    unidade: 'Unidade Sul de Minas',
    atribuicao: '8 cursos',
  },
  {
    id: 'USR-1020',
    nome: 'Thiago Barcelos',
    email: 'thiago.barcelos@outlook.com',
    perfil: 'docente',
    cpf: '000.111.222-33',
    telefone: '(47) 90099-8877',
    status: 'ativo',
    ultimoAcesso: '2024-11-02 16:18',
    cadastroISO: '2022-01-30',
    unidade: 'Unidade Joinville',
    atribuicao: 'Robótica · 4 turmas',
  },
  {
    id: 'USR-1021',
    nome: 'Úrsia Campos',
    email: 'ursia.campos@gmail.com',
    perfil: 'responsavel',
    cpf: '121.232.343-44',
    telefone: '(67) 99988-7766',
    status: 'ativo',
    ultimoAcesso: '2024-11-01 12:30',
    cadastroISO: '2023-06-01',
    unidade: 'Unidade MS',
    atribuicao: '1 estudante',
  },
  {
    id: 'USR-1022',
    nome: 'Vinícius Moura',
    email: 'vinicius.moura@proton.me',
    perfil: 'prestador',
    cpf: '232.343.454-55',
    telefone: '(84) 98877-6655',
    status: 'ativo',
    ultimoAcesso: '2024-10-31 09:45',
    cadastroISO: '2024-07-12',
    unidade: 'Remoto',
    atribuicao: 'Design instrucional',
  },
]

export const PERFIS_LABEL: Record<PerfilUsuario, string> = {
  estudante: 'Estudante',
  docente: 'Docente',
  responsavel: 'Responsável',
  prestador: 'Prestador',
  administrador: 'Administrador',
}

export function iniciaisNome(nome: string) {
  const p = nome.trim().split(/\s+/).filter(Boolean)
  if (p.length === 0) return '??'
  if (p.length === 1) return p[0].slice(0, 2).toUpperCase()
  return `${p[0][0] ?? ''}${p[p.length - 1][0] ?? ''}`.toUpperCase()
}
