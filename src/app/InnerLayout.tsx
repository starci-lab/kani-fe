"use client"
import { 
    HeroUIProvider, 
    DrawerContainer,
    ModalContainer, 
    Navbar,
    NextThemesProvider,
    PrivyProvider,
    WorkersContainer,
    SwrProvider
} from "@/components"
import { SingletonHookProvider } from "@/hooks/singleton"
import { ReduxProvider } from "@/redux"
import React, { PropsWithChildren, Suspense } from "react"
import {ToastProvider} from "@heroui/toast"
import { Sidebar } from "@/components/layouts"

export const InnerLayout = ({ children }: PropsWithChildren) => {
    return (
        <Suspense>
            <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="kani-theme">
                <HeroUIProvider> 
                    <SwrProvider>
                        <PrivyProvider>
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
                                    <DrawerContainer />
                                    <ToastProvider />
                                    <WorkersContainer />
                                </SingletonHookProvider>
                            </ReduxProvider>
                        </PrivyProvider>
                    </SwrProvider>
                </HeroUIProvider>
            </NextThemesProvider>
        </Suspense>
    )
}