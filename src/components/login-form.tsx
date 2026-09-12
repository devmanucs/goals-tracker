"use client"

import { useActionState, useState } from "react"

import { cn } from "@/lib/utils"
import { DsAlert, DsAlertDescription } from "@/components/ds/alert"
import { DsButton } from "@/components/ds/button"
import { DsCard, DsCardContent, DsCardDescription, DsCardHeader, DsCardTitle } from "@/components/ds/card"
import { DsField, DsFieldDescription, DsFieldGroup, DsFieldLabel } from "@/components/ds/field"
import { DsInput } from "@/components/ds/input"
import { entrar, registrar, type EstadoDoFormulario } from "@/features/auth/actions"

const ESTADO_INICIAL: EstadoDoFormulario = {}

type Modo = "entrar" | "registrar"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [modo, setModo] = useState<Modo>("entrar")

  // Uma action por modo, cada uma com o próprio estado de erro: trocar de aba
  // não deve carregar o erro da outra.
  const [estadoEntrar, acaoEntrar, entrando] = useActionState(entrar, ESTADO_INICIAL)
  const [estadoRegistrar, acaoRegistrar, registrando] = useActionState(
    registrar,
    ESTADO_INICIAL,
  )

  const ehRegistro = modo === "registrar"
  const estado = ehRegistro ? estadoRegistrar : estadoEntrar
  const carregando = ehRegistro ? registrando : entrando

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <DsCard>
        <DsCardHeader className="text-center">
          <DsCardTitle className="text-xl">
            {ehRegistro ? "Criar sua conta" : "Bem-vinda de volta"}
          </DsCardTitle>
          <DsCardDescription>
            {ehRegistro
              ? "Seus dados são só seus — cada conta tem os próprios livros, estudos e hábitos"
              : "Entre com seu e-mail para acompanhar seus objetivos"}
          </DsCardDescription>
        </DsCardHeader>
        <DsCardContent>
          {/* key força o React a remontar o form ao trocar de modo, limpando os campos */}
          <form key={modo} action={ehRegistro ? acaoRegistrar : acaoEntrar}>
            <DsFieldGroup>
              {estado.mensagem && (
                <DsAlert variant="destructive">
                  <DsAlertDescription>{estado.mensagem}</DsAlertDescription>
                </DsAlert>
              )}

              {ehRegistro && (
                <DsField>
                  <DsFieldLabel htmlFor="nome">Nome</DsFieldLabel>
                  <DsInput
                    id="nome"
                    name="nome"
                    autoComplete="name"
                    placeholder="Como você quer ser chamada"
                    aria-invalid={Boolean(estado.erros?.nome)}
                    required
                  />
                  {estado.erros?.nome && (
                    <DsFieldDescription className="text-destructive">
                      {estado.erros.nome}
                    </DsFieldDescription>
                  )}
                </DsField>
              )}

              <DsField>
                <DsFieldLabel htmlFor="email">E-mail</DsFieldLabel>
                <DsInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  aria-invalid={Boolean(estado.erros?.email)}
                  required
                />
                {estado.erros?.email && (
                  <DsFieldDescription className="text-destructive">
                    {estado.erros.email}
                  </DsFieldDescription>
                )}
              </DsField>

              <DsField>
                <DsFieldLabel htmlFor="senha">Senha</DsFieldLabel>
                <DsInput
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete={ehRegistro ? "new-password" : "current-password"}
                  aria-invalid={Boolean(estado.erros?.senha)}
                  required
                />
                {estado.erros?.senha && (
                  <DsFieldDescription className="text-destructive">
                    {estado.erros.senha}
                  </DsFieldDescription>
                )}
                {ehRegistro && !estado.erros?.senha && (
                  <DsFieldDescription>Mínimo de 6 caracteres.</DsFieldDescription>
                )}
              </DsField>

              <DsField>
                <DsButton type="submit" loading={carregando}>
                  {ehRegistro ? "Criar conta" : "Entrar"}
                </DsButton>
                <DsFieldDescription className="text-center">
                  {ehRegistro ? "Já tem conta? " : "Ainda não tem conta? "}
                  <button
                    type="button"
                    className="underline underline-offset-4"
                    onClick={() => setModo(ehRegistro ? "entrar" : "registrar")}
                  >
                    {ehRegistro ? "Entrar" : "Criar conta"}
                  </button>
                </DsFieldDescription>
              </DsField>
            </DsFieldGroup>
          </form>
        </DsCardContent>
      </DsCard>
    </div>
  )
}
