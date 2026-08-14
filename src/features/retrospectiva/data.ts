import { diasEntre, parseDate } from "@/lib/dates"
import { livros, registrosLeitura } from "@/features/leitura/data"
import { topicos } from "@/features/estudos/data"
import { getHabitos, getRegistrosDoHabito, streakDoHabito } from "@/features/habitos/data"

const MESES_LABEL = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

function chaveDoMes(iso: string) {
  return iso.slice(0, 7)
}

function labelDoMes(chave: string) {
  const [, mes] = chave.split("-")
  return MESES_LABEL[Number(mes) - 1]
}

function ultimosMeses(quantidade: number) {
  const hoje = parseDate("2026-08-13")
  const chaves: string[] = []
  for (let i = quantidade - 1; i >= 0; i--) {
    const d = new Date(hoje)
    d.setMonth(d.getMonth() - i)
    chaves.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`)
  }
  return chaves
}

export function paginasLidasPorMes(quantidade = 6) {
  const paginasPorRegistro = registrosLeitura.map((r, _i, arr) => {
    const anterior = arr
      .filter((o) => o.livroId === r.livroId && o.data < r.data)
      .sort((a, b) => diasEntre(a.data, b.data))
      .at(-1)
    return { mes: chaveDoMes(r.data), paginas: Math.max(0, r.paginaAtual - (anterior?.paginaAtual ?? 0)) }
  })

  return ultimosMeses(quantidade).map((chave) => ({
    mes: labelDoMes(chave),
    paginas: paginasPorRegistro.filter((p) => p.mes === chave).reduce((acc, p) => acc + p.paginas, 0),
  }))
}

export function topicosEstudadosPorMes(quantidade = 6) {
  const estudados = topicos.filter((t) => t.status === "estudado" || t.status === "revisao")

  return ultimosMeses(quantidade).map((chave) => ({
    mes: labelDoMes(chave),
    topicos: estudados.filter((t) => chaveDoMes(t.dataAgendada) === chave).length,
  }))
}

export function habitosConcluidosPorMes(quantidade = 6) {
  const habitos = getHabitos()

  return ultimosMeses(quantidade).map((chave) => {
    let cumpridos = 0
    let total = 0
    for (const habito of habitos) {
      const registrosDoMes = getRegistrosDoHabito(habito.id).filter((r) => chaveDoMes(r.data) === chave)
      if (registrosDoMes.length === 0) continue
      total += 1
      const soma = registrosDoMes.reduce((acc, r) => acc + r.valor, 0)
      const multiplicador = habito.frequencia === "diaria" ? registrosDoMes.length : 1
      if (soma >= habito.metaValor * Math.max(multiplicador, 1)) cumpridos += 1
    }
    return { mes: labelDoMes(chave), percentual: total ? Math.round((cumpridos / total) * 100) : 0 }
  })
}

export function resumoRetrospectiva() {
  const livrosLidos = livros.filter((l) => l.status === "lido").length
  const paginasLidas = registrosLeitura.reduce((acc, r, _i, arr) => {
    const anterior = arr
      .filter((o) => o.livroId === r.livroId && o.data < r.data)
      .sort((a, b) => diasEntre(a.data, b.data))
      .at(-1)
    return acc + Math.max(0, r.paginaAtual - (anterior?.paginaAtual ?? 0))
  }, 0)
  const topicosEstudados = topicos.filter((t) => t.status === "estudado" || t.status === "revisao").length
  const maiorStreak = Math.max(0, ...getHabitos().map((h) => streakDoHabito(h.id)))

  return { livrosLidos, paginasLidas, topicosEstudados, maiorStreak }
}
