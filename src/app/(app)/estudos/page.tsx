"use client"

import { useState } from "react"

import { AppHeader } from "@/components/app-header"
import {
  DsEmpty,
  DsEmptyContent,
  DsEmptyDescription,
  DsEmptyHeader,
  DsEmptyMedia,
  DsEmptyTitle,
} from "@/components/ds/empty"
import { Illustration } from "@/components/illustration"
import { ConcursoCard } from "@/features/estudos/components/concurso-card"
import { ConcursoFormDialog } from "@/features/estudos/components/concurso-form-dialog"
import type { Concurso } from "@/features/estudos/data"
import { concursos as concursosIniciais } from "@/features/estudos/data"

export default function EstudosPage() {
  const [concursos, setConcursos] = useState<Concurso[]>(concursosIniciais)

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader items={[{ label: "Estudos" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-xl font-medium">Estudos</h1>
          {concursos.length > 0 && (
            <ConcursoFormDialog onAdd={(c) => setConcursos((prev) => [c, ...prev])} />
          )}
        </div>
        {concursos.length === 0 ? (
          <DsEmpty className="py-16">
            <DsEmptyHeader>
              <DsEmptyMedia variant="default">
                <Illustration name="studying" />
              </DsEmptyMedia>
              <DsEmptyTitle>Nenhum concurso cadastrado</DsEmptyTitle>
              <DsEmptyDescription>
                Cadastre um concurso para organizar os tópicos do edital por prioridade.
              </DsEmptyDescription>
            </DsEmptyHeader>
            <DsEmptyContent>
              <ConcursoFormDialog onAdd={(c) => setConcursos((prev) => [c, ...prev])} />
            </DsEmptyContent>
          </DsEmpty>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {concursos.map((concurso) => (
              <ConcursoCard key={concurso.id} concurso={concurso} />
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
