import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"
import { BreadcrumbProvider } from "@/components/breadcrumb-context"
import { DsSidebarInset, DsSidebarProvider } from "@/components/ds/sidebar"
import { usuarioLogado } from "@/features/auth/data"

export default async function AppLayout({ children }: { children: ReactNode }) {
  // Proteção de verdade das rotas do app: valida o token contra o backend e
  // redireciona para /login se ele expirou ou foi revogado. O proxy.ts só faz a
  // checagem otimista de presença do cookie.
  const usuario = await usuarioLogado()

  return (
    <BreadcrumbProvider>
      {/*
        O provider da sidebar precisa envolver o topbar também — é lá que fica o
        gatilho de recolher. Por isso ele vira coluna: topbar em cima,
        atravessando a largura toda, e a linha sidebar + conteúdo embaixo.
      */}
      <DsSidebarProvider className="flex-col">
        <AppTopbar />
        <div className="flex min-h-0 w-full flex-1">
          <AppSidebar usuario={usuario} />
          <DsSidebarInset className="min-h-0">{children}</DsSidebarInset>
        </div>
      </DsSidebarProvider>
    </BreadcrumbProvider>
  )
}
