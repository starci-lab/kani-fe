"use client"
import {
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem,
    DropdownSection,
    DropdownMenuProps,
} from "@heroui/react"
import React from "react"

export const KaniDropdown = Dropdown
export const KaniDropdownTrigger = DropdownTrigger
export const KaniDropdownMenu = ({ children, ...props }: DropdownMenuProps) => {
    return <DropdownMenu {...props}>{children}</DropdownMenu>
}
export const KaniDropdownItem = DropdownItem
export const KaniDropdownSection = DropdownSection