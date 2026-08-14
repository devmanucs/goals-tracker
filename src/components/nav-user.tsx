"use client"

import { useRouter } from "next/navigation"

import { DsAvatar, DsAvatarFallback } from "@/components/ds/avatar"
import {
  DsDropdownMenu,
  DsDropdownMenuContent,
  DsDropdownMenuGroup,
  DsDropdownMenuItem,
  DsDropdownMenuLabel,
  DsDropdownMenuSeparator,
  DsDropdownMenuTrigger,
} from "@/components/ds/dropdown-menu"
import { DsSidebarMenu, DsSidebarMenuButton, DsSidebarMenuItem, useDsSidebar } from "@/components/ds/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Logout01Icon, MoreVerticalCircle01Icon, Settings05Icon } from "@hugeicons/core-free-icons"

export function NavUser({ user }: { user: { name: string; email: string } }) {
  const { isMobile } = useDsSidebar()
  const router = useRouter()
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <DsSidebarMenu>
      <DsSidebarMenuItem>
        <DsDropdownMenu>
          <DsDropdownMenuTrigger render={<DsSidebarMenuButton size="lg" className="aria-expanded:bg-sidebar-accent" />}>
            <DsAvatar className="size-8">
              <DsAvatarFallback className="text-xs">{initials}</DsAvatarFallback>
            </DsAvatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
            <HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} className="ml-auto size-4" />
          </DsDropdownMenuTrigger>
          <DsDropdownMenuContent className="min-w-56" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <DsDropdownMenuGroup>
              <DsDropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <DsAvatar className="size-8">
                    <DsAvatarFallback className="text-xs">{initials}</DsAvatarFallback>
                  </DsAvatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DsDropdownMenuLabel>
            </DsDropdownMenuGroup>
            <DsDropdownMenuSeparator />
            <DsDropdownMenuItem>
              <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />
              Configurações
            </DsDropdownMenuItem>
            <DsDropdownMenuSeparator />
            <DsDropdownMenuItem onClick={() => router.push("/login")}>
              <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
              Sair
            </DsDropdownMenuItem>
          </DsDropdownMenuContent>
        </DsDropdownMenu>
      </DsSidebarMenuItem>
    </DsSidebarMenu>
  )
}
