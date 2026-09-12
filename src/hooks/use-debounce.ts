"use client"

import { useEffect, useState } from "react"

/**
 * Atrasa a propagação de um valor que muda a cada tecla.
 *
 * Serve para a busca no catálogo não disparar uma requisição por caractere —
 * ela consulta uma API pública de terceiro, que tem cota.
 */
export function useDebounce<T>(valor: T, atrasoMs = 350): T {
  const [atrasado, setAtrasado] = useState(valor)

  useEffect(() => {
    const timer = setTimeout(() => setAtrasado(valor), atrasoMs)
    return () => clearTimeout(timer)
  }, [valor, atrasoMs])

  return atrasado
}
