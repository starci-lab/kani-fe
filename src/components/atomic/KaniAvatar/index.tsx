import { Avatar, AvatarGroup, AvatarGroupProps, AvatarProps } from "@heroui/react"
import React from "react"

export const KaniAvatar = (props: AvatarProps) => {
    return <Avatar {...props} />
}

export const KaniAvatarGroup = (props: AvatarGroupProps) => {
    return <AvatarGroup {...props} />
}