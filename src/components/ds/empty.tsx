import * as React from "react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export type DsEmptyProps = React.ComponentProps<typeof Empty>
export function DsEmpty(props: DsEmptyProps) {
  return <Empty {...props} />
}

export type DsEmptyHeaderProps = React.ComponentProps<typeof EmptyHeader>
export function DsEmptyHeader(props: DsEmptyHeaderProps) {
  return <EmptyHeader {...props} />
}

export type DsEmptyTitleProps = React.ComponentProps<typeof EmptyTitle>
export function DsEmptyTitle(props: DsEmptyTitleProps) {
  return <EmptyTitle {...props} />
}

export type DsEmptyDescriptionProps = React.ComponentProps<
  typeof EmptyDescription
>
export function DsEmptyDescription(props: DsEmptyDescriptionProps) {
  return <EmptyDescription {...props} />
}

export type DsEmptyContentProps = React.ComponentProps<typeof EmptyContent>
export function DsEmptyContent(props: DsEmptyContentProps) {
  return <EmptyContent {...props} />
}

export type DsEmptyMediaProps = React.ComponentProps<typeof EmptyMedia>
export function DsEmptyMedia(props: DsEmptyMediaProps) {
  return <EmptyMedia {...props} />
}
