import { Link, LinkProps, cn } from "@heroui/react"
import React from "react"

export const KaniLink = (props: LinkProps) => {
    return <Link {...props} as="button" className={cn(props.className, "text-xs text-foreground-500 cursor-pointer")} />
}