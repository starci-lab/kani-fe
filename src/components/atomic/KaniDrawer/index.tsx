import {
    Drawer, 
    DrawerContent, 
    DrawerHeader, 
    DrawerBody, 
    DrawerFooter, 
    DrawerProps,
    DrawerHeaderProps,
    DrawerBodyProps,
    cn
} from "@heroui/react"
import React from "react"

export const KaniDrawer = (props: DrawerProps) => {
    return <Drawer {...props} />
}

export const KaniDrawerContent = DrawerContent
export const KaniDrawerHeader = (props: DrawerHeaderProps) => {
    return <DrawerHeader className="text-lg font-bold" {...props} />
}
export const KaniDrawerBody = (props: DrawerBodyProps) => {
    return <DrawerBody {...props} className={cn("overflow-visible", props.className)} />
}
export const KaniDrawerFooter = DrawerFooter