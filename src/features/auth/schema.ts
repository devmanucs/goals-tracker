import { z } from "zod"

// Mesmas regras do backend (auth.schema.ts). Validar dos dois lados evita uma
// ida ao servidor para erro óbvio, mas quem manda é sempre o backend.

export const entrarSchema = z.object({
  email: z.string().email("O email é inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export const registrarSchema = entrarSchema.extend({
  nome: z.string().min(1, "O nome é obrigatório"),
})

export type EntrarInput = z.infer<typeof entrarSchema>
export type RegistrarInput = z.infer<typeof registrarSchema>
