import * as React from "react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"

export type DsAttachmentProps = React.ComponentProps<typeof Attachment>
export function DsAttachment(props: DsAttachmentProps) {
  return <Attachment {...props} />
}

export type DsAttachmentGroupProps = React.ComponentProps<typeof AttachmentGroup>
export function DsAttachmentGroup(props: DsAttachmentGroupProps) {
  return <AttachmentGroup {...props} />
}

export type DsAttachmentMediaProps = React.ComponentProps<typeof AttachmentMedia>
export function DsAttachmentMedia(props: DsAttachmentMediaProps) {
  return <AttachmentMedia {...props} />
}

export type DsAttachmentContentProps = React.ComponentProps<typeof AttachmentContent>
export function DsAttachmentContent(props: DsAttachmentContentProps) {
  return <AttachmentContent {...props} />
}

export type DsAttachmentTitleProps = React.ComponentProps<typeof AttachmentTitle>
export function DsAttachmentTitle(props: DsAttachmentTitleProps) {
  return <AttachmentTitle {...props} />
}

export type DsAttachmentDescriptionProps = React.ComponentProps<typeof AttachmentDescription>
export function DsAttachmentDescription(props: DsAttachmentDescriptionProps) {
  return <AttachmentDescription {...props} />
}

export type DsAttachmentActionsProps = React.ComponentProps<typeof AttachmentActions>
export function DsAttachmentActions(props: DsAttachmentActionsProps) {
  return <AttachmentActions {...props} />
}

export type DsAttachmentActionProps = React.ComponentProps<typeof AttachmentAction>
export function DsAttachmentAction(props: DsAttachmentActionProps) {
  return <AttachmentAction {...props} />
}

export type DsAttachmentTriggerProps = React.ComponentProps<typeof AttachmentTrigger>
export function DsAttachmentTrigger(props: DsAttachmentTriggerProps) {
  return <AttachmentTrigger {...props} />
}
