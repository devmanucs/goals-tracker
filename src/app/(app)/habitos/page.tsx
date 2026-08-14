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
import { HabitoCard } from "@/features/habitos/components/habito-card"
import { HabitoFormDialog } from "@/features/habitos/components/habito-form-dialog"
import type { Habito } from "@/features/habitos/data"
import { habitos as habitosIniciais } from "@/features/habitos/data"

export default function HabitosPage() {
  const [habitos, setHabitos] = useState<Habito[]>(habitosIniciais)

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader items={[{ label: "Hábitos" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-xl font-medium">Hábitos</h1>
          {habitos.length > 0 && (
            <HabitoFormDialog onAdd={(h) => setHabitos((prev) => [h, ...prev])} />
          )}
        </div>
        {habitos.length === 0 ? (
          <DsEmpty className="py-16">
            <DsEmptyHeader>
              <DsEmptyMedia variant="default">
                <Illustration name="habits" />
              </DsEmptyMedia>
              <DsEmptyTitle>Nenhum hábito cadastrado</DsEmptyTitle>
              <DsEmptyDescription>Crie um hábito com meta numérica para começar a acompanhar seu streak.</DsEmptyDescription>
            </DsEmptyHeader>
            <DsEmptyContent>
              <HabitoFormDialog onAdd={(h) => setHabitos((prev) => [h, ...prev])} />
            </DsEmptyContent>
          </DsEmpty>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {habitos.map((habito) => (
              <HabitoCard key={habito.id} habito={habito} />
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
