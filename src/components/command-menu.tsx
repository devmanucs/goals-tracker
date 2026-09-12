"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics01Icon,
  Book02Icon,
  GraduationCapIcon,
  Home01Icon,
  Search01Icon,
  Target01Icon,
} from "@hugeicons/core-free-icons"

import { DsButton } from "@/components/ds/button"
import {
  DsCommand,
  DsCommandDialog,
  DsCommandEmpty,
  DsCommandGroup,
  DsCommandInput,
  DsCommandItem,
  DsCommandList,
} from "@/components/ds/command"
import { DsKbd } from "@/components/ds/kbd"

const SECOES = [
  { href: "/", label: "Dashboard", icon: Home01Icon },
  { href: "/leitura", label: "Leitura", icon: Book02Icon },
  { href: "/estudos", label: "Estudos", icon: GraduationCapIcon },
  { href: "/habitos", label: "Hábitos", icon: Target01Icon },
  { href: "/retrospectiva", label: "Retrospectiva", icon: Analytics01Icon },
]

interface Indice {
  livros: { id: string; titulo: string; autor: string }[]
  concursos: { id: string; titulo: string; banca: string }[]
  habitos: { id: string; nome: string }[]
}

const VAZIO: Indice = { livros: [], concursos: [], habitos: [] }

export function CommandMenu() {
  const router = useRouter()
  const [aberto, setAberto] = useState(false)
  const [indice, setIndice] = useState<Indice>(VAZIO)
  const [carregado, setCarregado] = useState(false)

  // Ctrl/Cmd + K abre e fecha.
  useEffect(() => {
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "k" && (evento.metaKey || evento.ctrlKey)) {
        evento.preventDefault()
        setAberto((estava) => !estava)
      }
    }
    document.addEventListener("keydown", aoTeclar)
    return () => document.removeEventListener("keydown", aoTeclar)
  }, [])

  // O índice é buscado na primeira abertura, não em toda navegação.
  useEffect(() => {
    if (!aberto || carregado) return

    let cancelado = false
    fetch("/api/busca")
      .then((r) => (r.ok ? r.json() : VAZIO))
      .then((dados) => {
        if (!cancelado) {
          setIndice(dados)
          setCarregado(true)
        }
      })
      .catch(() => setCarregado(true))

    return () => {
      cancelado = true
    }
  }, [aberto, carregado])

  const ir = useCallback(
    (href: string) => {
      setAberto(false)
      router.push(href)
    },
    [router],
  )

  return (
    <>
      <DsButton
        variant="outline"
        size="sm"
        className="h-7 gap-2 px-2 text-xs font-normal text-muted-foreground"
        onClick={() => setAberto(true)}
      >
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="size-3.5" />
        <span className="hidden sm:inline">Buscar...</span>
        <DsKbd className="ml-2 hidden sm:inline-flex">Ctrl K</DsKbd>
      </DsButton>

      <DsCommandDialog
        open={aberto}
        onOpenChange={setAberto}
        title="Buscar"
        description="Navegue pelo app ou vá direto para um livro, concurso ou hábito."
      >
        <DsCommand>
          <DsCommandInput placeholder="Buscar seção, livro, concurso ou hábito..." />
          <DsCommandList>
            <DsCommandEmpty>Nada encontrado.</DsCommandEmpty>

            <DsCommandGroup heading="Ir para">
              {SECOES.map((secao) => (
                <DsCommandItem
                  key={secao.href}
                  value={`secao ${secao.label}`}
                  onSelect={() => ir(secao.href)}
                >
                  <HugeiconsIcon icon={secao.icon} strokeWidth={2} className="size-4" />
                  {secao.label}
                </DsCommandItem>
              ))}
            </DsCommandGroup>

            {indice.livros.length > 0 && (
              <DsCommandGroup heading="Livros">
                {indice.livros.map((livro) => (
                  <DsCommandItem
                    key={livro.id}
                    value={`livro ${livro.titulo} ${livro.autor}`}
                    onSelect={() => ir(`/leitura/${livro.id}`)}
                  >
                    <HugeiconsIcon icon={Book02Icon} strokeWidth={2} className="size-4" />
                    <span className="truncate">{livro.titulo}</span>
                    <span className="ml-auto truncate text-xs text-muted-foreground">
                      {livro.autor}
                    </span>
                  </DsCommandItem>
                ))}
              </DsCommandGroup>
            )}

            {indice.concursos.length > 0 && (
              <DsCommandGroup heading="Concursos">
                {indice.concursos.map((concurso) => (
                  <DsCommandItem
                    key={concurso.id}
                    value={`concurso ${concurso.titulo} ${concurso.banca}`}
                    onSelect={() => ir(`/estudos/${concurso.id}`)}
                  >
                    <HugeiconsIcon icon={GraduationCapIcon} strokeWidth={2} className="size-4" />
                    <span className="truncate">{concurso.titulo}</span>
                    <span className="ml-auto truncate text-xs text-muted-foreground">
                      {concurso.banca}
                    </span>
                  </DsCommandItem>
                ))}
              </DsCommandGroup>
            )}

            {indice.habitos.length > 0 && (
              <DsCommandGroup heading="Hábitos">
                {indice.habitos.map((habito) => (
                  <DsCommandItem
                    key={habito.id}
                    value={`habito ${habito.nome}`}
                    onSelect={() => ir(`/habitos/${habito.id}`)}
                  >
                    <HugeiconsIcon icon={Target01Icon} strokeWidth={2} className="size-4" />
                    <span className="truncate">{habito.nome}</span>
                  </DsCommandItem>
                ))}
              </DsCommandGroup>
            )}
          </DsCommandList>
        </DsCommand>
      </DsCommandDialog>
    </>
  )
}
