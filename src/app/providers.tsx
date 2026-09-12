"use client"

import { useState, type ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

/**
 * O app é quase todo Server Components, então o React Query existe para um caso
 * só: a busca no catálogo externo, que é digitada e precisa de cache por termo,
 * deduplicação e estado de carregando no cliente.
 *
 * O client é criado no estado, e não em módulo: em módulo ele seria
 * compartilhado entre requisições no servidor, vazando cache de um usuário para
 * outro.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // O catálogo é dado público e estável: não vale revalidar a cada
            // foco de janela nem repetir busca que acabou de ser feita.
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
