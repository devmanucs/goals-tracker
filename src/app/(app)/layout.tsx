import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { DsSidebarInset, DsSidebarProvider } from "@/components/ds/sidebar"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <DsSidebarProvider>
      <AppSidebar />
      <DsSidebarInset>{children}</DsSidebarInset>
    </DsSidebarProvider>
  )
}
