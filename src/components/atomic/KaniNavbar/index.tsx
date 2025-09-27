import React from "react"
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    NavbarProps,
    NavbarBrandProps,
    NavbarContentProps,
    NavbarItemProps,
    NavbarMenuProps,
    NavbarMenuItemProps,
    NavbarMenuToggleProps,
} from "@heroui/react"

export const KaniNavbar = (props: NavbarProps) => {
    return <Navbar {...props} />
}

export const KaniNavbarBrand = (props: NavbarBrandProps) => {
    return <NavbarBrand {...props} />
}

export const KaniNavbarContent = (props: NavbarContentProps) => {
    return <NavbarContent {...props} />
}

export const KaniNavbarItem = (props: NavbarItemProps) => {
    return <NavbarItem {...props} />
}

export const KaniNavbarMenu = (props: NavbarMenuProps) => {
    return <NavbarMenu {...props} />
}

export const KaniNavbarMenuItem = (props: NavbarMenuItemProps) => {
    return <NavbarMenuItem {...props} />
}

export const KaniNavbarMenuToggle = (props: NavbarMenuToggleProps) => {
    return <NavbarMenuToggle {...props} />
}
