"use client"
import { HeroUIProvider, ModalContainer, Navbar } from "@/components"
import { SingletonHookProvider } from "@/hooks/singleton"
import { ReduxProvider } from "@/redux"
import React, { Suspense } from "react"

export const InnerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense>
            <HeroUIProvider> 
                <ReduxProvider>
                    <SingletonHookProvider>
                        <Navbar />
                        {children}
                        <ModalContainer />
                    </SingletonHookProvider>
                </ReduxProvider>
            </HeroUIProvider>
        </Suspense>
    )
}
