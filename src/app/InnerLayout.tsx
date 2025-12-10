"use client"
import { 
    HeroUIProvider, 
    ModalContainer, 
    Navbar 
} from "@/components"
import { SingletonHookProvider } from "@/hooks/singleton"
import { ReduxProvider } from "@/redux"
import React, { PropsWithChildren, Suspense } from "react"
import {ToastProvider} from "@heroui/toast"
import { PrivyProvider } from "@privy-io/react-auth"
import { publicEnv } from "@/modules/env"

export const InnerLayout = ({ children }: PropsWithChildren) => {
    return (
        <Suspense>
            <PrivyProvider
                appId={publicEnv().privy.appId}
                clientId={publicEnv().privy.clientId}
                config={{
                    embeddedWallets: {
                        ethereum: {
                            createOnLogin: "off",
                        },
                    },
                    loginMethods: ["email"],
                    captchaEnabled: true,
                }}
            >
                <HeroUIProvider> 
                    <ReduxProvider>
                        <SingletonHookProvider>
                            <Navbar />
                            {children}
                            <ModalContainer />
                            <ToastProvider />
                        </SingletonHookProvider>
                    </ReduxProvider>
                </HeroUIProvider>
            </PrivyProvider>
        </Suspense>
    )
}
