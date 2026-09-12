/** Usuário como o backend devolve em GET /auth/me. */
export interface Usuario {
  id: string
  nome: string
  email: string
  createdAt: string
}
