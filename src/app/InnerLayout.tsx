"use client"
import { 
    HeroUIProvider, 
    ModalContainer, 
    Navbar,
    WorkersContainer
} from "@/components"
import { SingletonHookProvider } from "@/hooks/singleton"
import { ReduxProvider } from "@/redux"
import React, { PropsWithChildren, Suspense } from "react"
import {ToastProvider} from "@heroui/toast"
import { Sidebar } from "@/components/layouts"

export const InnerLayout = ({ children }: PropsWithChildren) => {
    return (
        <Suspense>
            <HeroUIProvider> 
                <ReduxProvider>
                    <SingletonHookProvider>
                        <Navbar />
                        <div className="flex mx-auto max-w-[1024px]">
                            <Sidebar />
                            <div className="flex-1 p-6">
                                {children}
                            </div>
                        </div>  
                        <ModalContainer />
                        <ToastProvider />
                        <WorkersContainer />
                    </SingletonHookProvider>
                </ReduxProvider>
            </HeroUIProvider>
        </Suspense>
    )
}