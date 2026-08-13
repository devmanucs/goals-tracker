import * as React from "react"

import { Slider } from "@/components/ui/slider"

export type DsSliderProps = React.ComponentProps<typeof Slider>
export function DsSlider(props: DsSliderProps) {
  return <Slider {...props} />
}
