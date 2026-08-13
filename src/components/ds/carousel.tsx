import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export type DsCarouselProps = React.ComponentProps<typeof Carousel>
export function DsCarousel(props: DsCarouselProps) {
  return <Carousel {...props} />
}

export type DsCarouselContentProps = React.ComponentProps<typeof CarouselContent>
export function DsCarouselContent(props: DsCarouselContentProps) {
  return <CarouselContent {...props} />
}

export type DsCarouselItemProps = React.ComponentProps<typeof CarouselItem>
export function DsCarouselItem(props: DsCarouselItemProps) {
  return <CarouselItem {...props} />
}

export type DsCarouselPreviousProps = React.ComponentProps<typeof CarouselPrevious>
export function DsCarouselPrevious(props: DsCarouselPreviousProps) {
  return <CarouselPrevious {...props} />
}

export type DsCarouselNextProps = React.ComponentProps<typeof CarouselNext>
export function DsCarouselNext(props: DsCarouselNextProps) {
  return <CarouselNext {...props} />
}
