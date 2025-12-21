"use client"
import { 
    HeroUIProvider, 
    ModalContainer, 
    Navbar,
    WorkersContainer
} from "@/components"
import { SingletonHookProvider } from "@/hooks/singleton"
import { ReduxProvider } from "@/redux"
import React, { PropsWithChildren, Suspense, useEffect } from "react"
import {ToastProvider} from "@heroui/toast"
import { Sidebar } from "@/components/layouts"

export const InnerLayout = ({ children }: PropsWithChildren) => {
    
    useEffect(() => {
        if (!document.getElementById("cf-turnstile-script")) {
            const script = document.createElement("script")
            script.id = "cf-turnstile-script"
            script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
            script.async = true
            script.defer = true
            document.body.appendChild(script)
        }
    }, [])

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
