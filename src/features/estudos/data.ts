import { diasEntre, HOJE } from "@/lib/dates"

export type StatusTopico = "pendente" | "estudando" | "estudado" | "revisao"

export interface Concurso {
  id: string
  titulo: string
  banca: string
  dataProva: string
  status: "planejando" | "estudando" | "encerrado"
}

export interface TopicoEstudo {
  id: string
  concursoId: string
  titulo: string
  materia: string
  peso: number
  dataAgendada: string
  status: StatusTopico
}

export const STATUS_TOPICO_LABEL: Record<StatusTopico, string> = {
  pendente: "Pendente",
  estudando: "Estudando",
  estudado: "Estudado",
  revisao: "Revisão",
}

export const concursos: Concurso[] = [
  {
    id: "c1",
    titulo: "Analista Judiciário — TRT",
    banca: "FGV",
    dataProva: "2026-11-22",
    status: "estudando",
  },
  {
    id: "c2",
    titulo: "Técnico do Seguro Social — INSS",
    banca: "Cebraspe",
    dataProva: "2027-02-14",
    status: "planejando",
  },
]

export const topicos: TopicoEstudo[] = [
  { id: "t1", concursoId: "c1", titulo: "Crase e regência verbal", materia: "Língua Portuguesa", peso: 9, dataAgendada: "2026-08-13", status: "estudando" },
  { id: "t2", concursoId: "c1", titulo: "Atos administrativos", materia: "Direito Administrativo", peso: 10, dataAgendada: "2026-08-14", status: "pendente" },
  { id: "t3", concursoId: "c1", titulo: "Controle de constitucionalidade", materia: "Direito Constitucional", peso: 8, dataAgendada: "2026-08-15", status: "pendente" },
  { id: "t4", concursoId: "c1", titulo: "Interpretação de texto", materia: "Língua Portuguesa", peso: 7, dataAgendada: "2026-08-10", status: "estudado" },
  { id: "t5", concursoId: "c1", titulo: "Licitações — Lei 14.133", materia: "Direito Administrativo", peso: 10, dataAgendada: "2026-08-07", status: "estudado" },
  { id: "t6", concursoId: "c1", titulo: "Processo administrativo", materia: "Direito Administrativo", peso: 6, dataAgendada: "2026-08-05", status: "revisao" },
  { id: "t7", concursoId: "c1", titulo: "Organização dos poderes", materia: "Direito Constitucional", peso: 7, dataAgendada: "2026-08-18", status: "pendente" },
  { id: "t8", concursoId: "c1", titulo: "Raciocínio lógico — proposições", materia: "Raciocínio Lógico", peso: 5, dataAgendada: "2026-08-20", status: "pendente" },
  { id: "t9", concursoId: "c1", titulo: "Direitos fundamentais", materia: "Direito Constitucional", peso: 9, dataAgendada: "2026-08-22", status: "pendente" },
  { id: "t10", concursoId: "c1", titulo: "Concordância verbal e nominal", materia: "Língua Portuguesa", peso: 6, dataAgendada: "2026-08-03", status: "estudado" },
  { id: "t11", concursoId: "c2", titulo: "Regimes previdenciários", materia: "Direito Previdenciário", peso: 10, dataAgendada: "2026-09-02", status: "pendente" },
  { id: "t12", concursoId: "c2", titulo: "Benefícios do RGPS", materia: "Direito Previdenciário", peso: 9, dataAgendada: "2026-09-08", status: "pendente" },
]

export function getConcursos() {
  return concursos
}

export function getConcurso(id: string) {
  return concursos.find((c) => c.id === id)
}

export function getTopicosDoConcurso(concursoId: string) {
  return topicos.filter((t) => t.concursoId === concursoId)
}

export function getTopicosPorPeso(concursoId: string) {
  return getTopicosDoConcurso(concursoId).sort((a, b) => b.peso - a.peso)
}

export function proximoTopico() {
  return topicos
    .filter((t) => t.status !== "estudado" && diasEntre(HOJE, t.dataAgendada) >= 0)
    .sort((a, b) => diasEntre(a.dataAgendada, b.dataAgendada))[0]
}

export function progressoConcurso(concursoId: string) {
  const lista = getTopicosDoConcurso(concursoId)
  const estudados = lista.filter((t) => t.status === "estudado" || t.status === "revisao").length
  return lista.length ? Math.round((estudados / lista.length) * 100) : 0
}

export function diasAteProva(concursoId: string) {
  const concurso = getConcurso(concursoId)
  if (!concurso) return null
  return diasEntre(HOJE, concurso.dataProva)
}
