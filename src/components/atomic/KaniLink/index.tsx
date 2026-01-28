import { Link, LinkProps } from "@heroui/react"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import React from "react"

export const KaniLink = (props: LinkProps) => {
    return <Link anchorIcon={<ArrowSquareOutIcon className="ml-1" />} {...props} />
}