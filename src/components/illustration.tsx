import { cn } from "@/lib/utils"

const ILLUSTRATIONS = {
  reading: "/illustrations/reading.svg",
  studying: "/illustrations/studying.svg",
  habits: "/illustrations/habits.svg",
  progress: "/illustrations/progress.svg",
  winners: "/illustrations/winners.svg",
  empty: "/illustrations/empty.svg",
} as const

export function Illustration({
  name,
  className,
  size = 160,
}: {
  name: keyof typeof ILLUSTRATIONS
  className?: string
  size?: number
}) {
  // undraw.co SVGs — served locally, no next/image (SVG optimization is unnecessary here).
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={ILLUSTRATIONS[name]} alt="" width={size} height={size} className={cn("select-none", className)} />
}
