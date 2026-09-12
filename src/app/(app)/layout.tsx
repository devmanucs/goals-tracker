import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { DsSidebarInset, DsSidebarProvider } from "@/components/ds/sidebar"
import { usuarioLogado } from "@/features/auth/data"

export default async function AppLayout({ children }: { children: ReactNode }) {
  // Proteção de verdade das rotas do app: valida o token contra o backend e
  // redireciona para /login se ele expirou ou foi revogado. O proxy.ts só faz a
  // checagem otimista de presença do cookie.
  const usuario = await usuarioLogado()

  return (
    <DsSidebarProvider>
      <AppSidebar usuario={usuario} />
      <DsSidebarInset>{children}</DsSidebarInset>
    </DsSidebarProvider>
  )
}
