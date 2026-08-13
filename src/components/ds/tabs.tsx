import * as React from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
} from "@/components/ui/tabs"

export type DsTabsProps = React.ComponentProps<typeof Tabs>
export function DsTabs(props: DsTabsProps) {
  return <Tabs {...props} />
}

export type DsTabsListProps = React.ComponentProps<typeof TabsList>
export function DsTabsList(props: DsTabsListProps) {
  return <TabsList {...props} />
}

export type DsTabsTriggerProps = React.ComponentProps<typeof TabsTrigger>
export function DsTabsTrigger(props: DsTabsTriggerProps) {
  return <TabsTrigger {...props} />
}

export type DsTabsContentProps = React.ComponentProps<typeof TabsContent>
export function DsTabsContent(props: DsTabsContentProps) {
  return <TabsContent {...props} />
}

export { tabsListVariants }
