import "server-only"

import { api } from "@/lib/api"
import type { ResumoDashboard } from "./types"

export function resumoDashboard() {
  return api.get<ResumoDashboard>("/dashboard")
}
