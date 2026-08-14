"use client"

import { useInView, useMotionValue, useSpring } from "motion/react"
import { useCallback, useEffect, useRef } from "react"

interface CountUpProps {
  to: number
  from?: number
  decimals?: number
  delay?: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function CountUp({
  to,
  from = 0,
  decimals = 0,
  delay = 0,
  duration = 1.2,
  className = "",
  suffix = "",
  prefix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)

  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)

  const springValue = useSpring(motionValue, { damping, stiffness })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  const formatValue = useCallback(
    (latest: number) =>
      new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(latest),
    [decimals]
  )

  useEffect(() => {
    if (ref.current) ref.current.textContent = `${prefix}${formatValue(from)}${suffix}`
  }, [from, formatValue, prefix, suffix])

  useEffect(() => {
    if (!isInView) return
    const timeoutId = setTimeout(() => motionValue.set(to), delay * 1000)
    return () => clearTimeout(timeoutId)
  }, [isInView, motionValue, to, delay])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${formatValue(latest)}${suffix}`
    })
    return () => unsubscribe()
  }, [springValue, formatValue, prefix, suffix])

  return <span className={className} ref={ref} />
}
