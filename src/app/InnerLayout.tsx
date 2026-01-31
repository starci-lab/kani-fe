"use client"
import { 
    DrawerContainer,
    HeroUIProvider, 
    ModalContainer, 
    NextThemesProvider,
    PrivyProvider,
    SwrProvider,
    WorkersContainer
} from "@/components"
import { SingletonHookProvider } from "@/hooks/singleton"
import { ReduxProvider } from "@/redux"
import { ToastProvider } from "@heroui/react"
import React, { PropsWithChildren, Suspense } from "react"

export const InnerLayout = ({ children }: PropsWithChildren) => {
    return (
        <Suspense>
            <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="kani-theme">
                <HeroUIProvider> 
                    <SwrProvider>
                        <PrivyProvider>
                            <ReduxProvider>
                                <SingletonHookProvider>
                                    {children}
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