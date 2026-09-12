import "server-only"

import { api } from "@/lib/api"
import type { Retrospectiva } from "./types"

export function retrospectiva(meses: number) {
  return api.get<Retrospectiva>(`/retrospectiva?meses=${meses}`)
}
