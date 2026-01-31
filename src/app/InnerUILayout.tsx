"use client"
import { 
    DrawerContainer,
    ModalContainer, 
    Navbar,
    WorkersContainer
} from "@/components"
import React from "react"
import {ToastProvider} from "@heroui/toast"
import { Sidebar } from "@/components/layouts"

export const InnerUILayout = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <Navbar />
            <div className="flex mx-auto max-w-[1024px]">
                <Sidebar />
                <div className="flex-1 p-6">
                    {children}
                </div>
            </div>  
        </>
    )
}
