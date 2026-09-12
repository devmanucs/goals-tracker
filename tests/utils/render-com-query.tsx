import type { ReactElement, ReactNode } from "react"
import { render } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

/**
 * Renderiza um componente que usa React Query com um client próprio por teste.
 *
 * Um client por teste evita que o cache de um vaze para o outro; `retry: false`
 * faz o erro aparecer na primeira falha, em vez de o teste esperar as tentativas.
 */
export function renderComQuery(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } },
  })

  function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }

  return { ...render(ui, { wrapper: Wrapper }), queryClient }
}
