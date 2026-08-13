import * as React from "react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export type DsCommandProps = React.ComponentProps<typeof Command>
export function DsCommand(props: DsCommandProps) {
  return <Command {...props} />
}

export type DsCommandDialogProps = React.ComponentProps<typeof CommandDialog>
export function DsCommandDialog(props: DsCommandDialogProps) {
  return <CommandDialog {...props} />
}

export type DsCommandInputProps = React.ComponentProps<typeof CommandInput>
export function DsCommandInput(props: DsCommandInputProps) {
  return <CommandInput {...props} />
}

export type DsCommandListProps = React.ComponentProps<typeof CommandList>
export function DsCommandList(props: DsCommandListProps) {
  return <CommandList {...props} />
}

export type DsCommandEmptyProps = React.ComponentProps<typeof CommandEmpty>
export function DsCommandEmpty(props: DsCommandEmptyProps) {
  return <CommandEmpty {...props} />
}

export type DsCommandGroupProps = React.ComponentProps<typeof CommandGroup>
export function DsCommandGroup(props: DsCommandGroupProps) {
  return <CommandGroup {...props} />
}

export type DsCommandItemProps = React.ComponentProps<typeof CommandItem>
export function DsCommandItem(props: DsCommandItemProps) {
  return <CommandItem {...props} />
}

export type DsCommandShortcutProps = React.ComponentProps<typeof CommandShortcut>
export function DsCommandShortcut(props: DsCommandShortcutProps) {
  return <CommandShortcut {...props} />
}

export type DsCommandSeparatorProps = React.ComponentProps<typeof CommandSeparator>
export function DsCommandSeparator(props: DsCommandSeparatorProps) {
  return <CommandSeparator {...props} />
}
