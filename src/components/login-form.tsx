"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { DsButton } from "@/components/ds/button"
import { DsCard, DsCardContent, DsCardDescription, DsCardHeader, DsCardTitle } from "@/components/ds/card"
import { DsField, DsFieldDescription, DsFieldGroup, DsFieldLabel } from "@/components/ds/field"
import { DsInput } from "@/components/ds/input"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [entrando, setEntrando] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setEntrando(true)
    setTimeout(() => router.push("/"), 400)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <DsCard>
        <DsCardHeader className="text-center">
          <DsCardTitle className="text-xl">Bem-vinda de volta</DsCardTitle>
          <DsCardDescription>Entre com seu e-mail para acompanhar seus objetivos</DsCardDescription>
        </DsCardHeader>
        <DsCardContent>
          <form onSubmit={handleSubmit}>
            <DsFieldGroup>
              <DsField>
                <DsFieldLabel htmlFor="email">E-mail</DsFieldLabel>
                <DsInput id="email" type="email" placeholder="voce@exemplo.com" required />
              </DsField>
              <DsField>
                <div className="flex items-center">
                  <DsFieldLabel htmlFor="password">Senha</DsFieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <DsInput id="password" type="password" required />
              </DsField>
              <DsField>
                <DsButton type="submit" loading={entrando}>
                  Entrar
                </DsButton>
                <DsFieldDescription className="text-center">
                  Ainda não tem conta? <a href="#">Criar conta</a>
                </DsFieldDescription>
              </DsField>
            </DsFieldGroup>
          </form>
        </DsCardContent>
      </DsCard>
    </div>
  )
}
