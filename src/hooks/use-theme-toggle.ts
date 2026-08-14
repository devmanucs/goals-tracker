"use client"

import { useCallback } from "react"
import { useTheme } from "next-themes"

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => { ready: Promise<void> }
  }
}

const STYLE_ID = "theme-transition-styles"

function createCircleRevealCss() {
  return `
    ::view-transition-group(root) {
      animation-duration: 0.6s;
      animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    }
    ::view-transition-new(root) {
      animation-name: reveal-theme;
    }
    ::view-transition-old(root),
    .dark::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }
    @keyframes reveal-theme {
      from {
        clip-path: circle(0% at 100% 0%);
      }
      to {
        clip-path: circle(150% at 100% 0%);
      }
    }
  `
}

// Adapted from Skiper UI's "Skiper 26" theme toggle (skiper-ui.com) — the
// circle-reveal View Transition, without its framer-motion demo scaffolding.
export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark"

    if (typeof document === "undefined" || !document.startViewTransition) {
      setTheme(next)
      return
    }

    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null
    if (!styleEl) {
      styleEl = document.createElement("style")
      styleEl.id = STYLE_ID
      document.head.appendChild(styleEl)
    }
    styleEl.textContent = createCircleRevealCss()

    document.startViewTransition(() => setTheme(next))
  }, [resolvedTheme, setTheme])

  return { toggleTheme }
}
