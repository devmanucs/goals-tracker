"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons"

import { DsButton } from "@/components/ds/button"
import { useThemeToggle } from "@/hooks/use-theme-toggle"

export function ThemeToggle() {
  const { toggleTheme } = useThemeToggle()

  return (
    <DsButton variant="ghost" size="icon-sm" onClick={toggleTheme}>
      {/* Visibility is pure CSS (matches the `.dark` class set before hydration), so
          the icon that's actually painted never depends on client-only theme state. */}
      <HugeiconsIcon icon={Sun01Icon} strokeWidth={2} className="hidden dark:block" />
      <HugeiconsIcon icon={Moon02Icon} strokeWidth={2} className="block dark:hidden" />
      <span className="sr-only">Alternar tema</span>
    </DsButton>
  )
}
