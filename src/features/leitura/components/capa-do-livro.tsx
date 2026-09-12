"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Capa do livro, com reserva de espaço quando não há imagem — ou quando a
 * imagem falha.
 *
 * O fallback no erro não é zelo excessivo: a Open Library tem registro cujo
 * `cover_i` aponta para uma imagem que não existe mais, e sem isso a tela
 * ficaria com o ícone de imagem quebrada e o texto alternativo vazando.
 *
 * É componente de cliente só por causa do `onError`; o resto da tela de leitura
 * continua sendo Server Component.
 */
export function CapaDoLivro({
  url,
  titulo,
  corDeFundo,
  className,
}: {
  url: string | null
  titulo: string
  /** Usada quando não há capa — mantém a identidade visual do card. */
  corDeFundo?: string
  className?: string
}) {
  const [falhou, setFalhou] = useState(false)

  if (!url || falhou) {
    return (
      <div
        className={cn("shrink-0 rounded-sm bg-muted", className)}
        style={
          corDeFundo
            ? {
                backgroundColor: corDeFundo,
                boxShadow:
                  "inset -4px 0 8px -4px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.15)",
              }
            : undefined
        }
        aria-hidden
      />
    )
  }

  // next/image exigiria liberar o domínio das capas na configuração, e a URL
  // vem de um catálogo de terceiro que pode mudar de host.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={`Capa de ${titulo}`}
      loading="lazy"
      onError={() => setFalhou(true)}
      className={cn("shrink-0 rounded-sm object-cover shadow-sm", className)}
    />
  )
}
