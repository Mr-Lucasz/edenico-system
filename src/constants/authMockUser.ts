/**
 * Credenciais de demonstração para testar Login e fluxos (sem backend real).
 * Use estes valores nos campos ao testar localmente.
 */
export const AUTH_MOCK_USER = {
  /** CPF aceito no login mock (com ou sem máscara) */
  cpf: '123.456.789-09',
  cpfNormalized: '12345678909',
  email: 'demo@edenicos.academy',
  /** Senha para o login mock */
  password: 'Teste@123',
  nome: 'Usuário Demo',
} as const

/** Painel administrativo (demo) — redireciona para `/admin`. */
export const AUTH_MOCK_ADMIN = {
  cpf: '529.982.247-25',
  cpfNormalized: '52998224725',
  email: 'admin@edenicos.com',
  password: 'Admin@123',
  nome: 'Administrador',
} as const

export type AuthMockRole = 'student' | 'admin'

/** Mensagem exibida na UI (dev) para lembrar o usuário mock estudante */
export const AUTH_MOCK_HINT_STUDENT =
  'Demo estudante: CPF 123.456.789-09 · senha Teste@123 · e-mail demo@edenicos.academy'

/** Demo painel admin */
export const AUTH_MOCK_HINT_ADMIN =
  'Demo admin: CPF 529.982.247-25 · senha Admin@123 · e-mail admin@edenicos.com'
