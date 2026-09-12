"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Crumb = { label: string; href?: string }

/**
 * O breadcrumb vive no topbar, que fica no layout — acima das páginas. Como
 * Server Component não consegue passar dado "para cima", cada página registra
 * suas migalhas por contexto, com <DefinirBreadcrumb>.
 */
const BreadcrumbContext = createContext<{
  items: Crumb[]
  definir: (items: Crumb[]) => void
}>({ items: [], definir: () => {} })

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Crumb[]>([])

  return (
    <BreadcrumbContext.Provider value={{ items, definir: setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext).items
}

/**
 * Registra as migalhas da página atual. Não renderiza nada — quem desenha é o
 * topbar. Use uma vez por página, no topo do JSX.
 */
export function DefinirBreadcrumb({ items }: { items: Crumb[] }) {
  const { definir } = useContext(BreadcrumbContext)

  // A chave serializada evita re-disparar o efeito a cada render com um array
  // novo mas de conteúdo igual.
  const chave = JSON.stringify(items)

  useEffect(() => {
    definir(JSON.parse(chave) as Crumb[])
  }, [chave, definir])

  return null
}
