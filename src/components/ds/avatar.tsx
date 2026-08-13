import * as React from "react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export type DsAvatarProps = React.ComponentProps<typeof Avatar>
export function DsAvatar(props: DsAvatarProps) {
  return <Avatar {...props} />
}

export type DsAvatarImageProps = React.ComponentProps<typeof AvatarImage>
export function DsAvatarImage(props: DsAvatarImageProps) {
  return <AvatarImage {...props} />
}

export type DsAvatarFallbackProps = React.ComponentProps<typeof AvatarFallback>
export function DsAvatarFallback(props: DsAvatarFallbackProps) {
  return <AvatarFallback {...props} />
}

export type DsAvatarGroupProps = React.ComponentProps<typeof AvatarGroup>
export function DsAvatarGroup(props: DsAvatarGroupProps) {
  return <AvatarGroup {...props} />
}

export type DsAvatarGroupCountProps = React.ComponentProps<typeof AvatarGroupCount>
export function DsAvatarGroupCount(props: DsAvatarGroupCountProps) {
  return <AvatarGroupCount {...props} />
}

export type DsAvatarBadgeProps = React.ComponentProps<typeof AvatarBadge>
export function DsAvatarBadge(props: DsAvatarBadgeProps) {
  return <AvatarBadge {...props} />
}
