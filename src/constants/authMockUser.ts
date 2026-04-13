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

/** Mensagem exibida na UI (dev) para lembrar o utilizador mock */
export const AUTH_MOCK_HINT =
  'Demo: CPF 123.456.789-09 · senha Teste@123 · email demo@edenicos.academy'
