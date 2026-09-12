import { DefinirBreadcrumb } from "@/components/breadcrumb-context"
import {
  DsEmpty,
  DsEmptyContent,
  DsEmptyDescription,
  DsEmptyHeader,
  DsEmptyMedia,
  DsEmptyTitle,
} from "@/components/ds/empty"
import { Illustration } from "@/components/illustration"
import { listarHabitos } from "@/features/habitos/api"
import { HabitoCard } from "@/features/habitos/components/habito-card"
import { HabitoFormDialog } from "@/features/habitos/components/habito-form-dialog"

export default async function HabitosPage() {
  // A API já devolve progresso, streak e registros recentes de cada hábito.
  const habitos = await listarHabitos()

  return (
    <div className="flex flex-1 flex-col">
      <DefinirBreadcrumb items={[{ label: "Hábitos" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-xl font-medium">Hábitos</h1>
          {habitos.length > 0 && <HabitoFormDialog />}
        </div>
        {habitos.length === 0 ? (
          <DsEmpty className="py-16">
            <DsEmptyHeader>
              <DsEmptyMedia variant="default">
                <Illustration name="habits" />
              </DsEmptyMedia>
              <DsEmptyTitle>Nenhum hábito cadastrado</DsEmptyTitle>
              <DsEmptyDescription>
                Crie um hábito com meta numérica para começar a acompanhar seu streak.
              </DsEmptyDescription>
            </DsEmptyHeader>
            <DsEmptyContent>
              <HabitoFormDialog />
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
