"use client"
import { 
    DrawerContainer,
    Fallback,
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
import React, { PropsWithChildren, Suspense, useEffect, useState } from "react"

export const InnerLayout = ({ children }: PropsWithChildren) => {
    const [scale, setScale] = useState(1)
    useEffect(() => {
        const check = () => {
            if (window.innerWidth < 400) {
                setScale(0.85)
            } else {
                setScale(1)
            }
        }

        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])
    return (
        <Suspense fallback={<Fallback />}>
            <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="kani-theme">
                <HeroUIProvider> 
                    <SwrProvider>
                        <PrivyProvider>
                            <ReduxProvider>
                                <SingletonHookProvider>
                                    <div style={
                                        { 
                                            transform: `scale(${scale})`, 
                                            transformOrigin: "top left",
                                            width: `${100 / scale}%`,
                                        }}>
                                        {children}
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