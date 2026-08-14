import Link from "next/link"

import { DsButton } from "@/components/ds/button"
import { Illustration } from "@/components/illustration"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <Illustration name="empty" size={180} />
      <div>
        <h1 className="font-heading text-lg font-medium">Página não encontrada</h1>
        <p className="mt-1 text-sm text-muted-foreground">O que você procura não existe ou foi removido.</p>
      </div>
      <DsButton render={<Link href="/" />}>Voltar ao início</DsButton>
    </div>
  )
}
