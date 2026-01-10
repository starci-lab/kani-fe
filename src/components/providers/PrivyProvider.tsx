"use client"
import React, { PropsWithChildren } from "react"
import { PrivyProvider as Provider } from "@privy-io/react-auth"
import { publicEnv } from "@/modules/env"
import { useTheme } from "next-themes"

export const PrivyProvider = ({ children }: PropsWithChildren) => {
    const theme = useTheme()
    return (
        <Provider
            config={{
                appearance: {
                    theme: theme.theme === "dark" ? "dark" : "light",
                },
            }}
            appId={publicEnv().privy.appId}
            clientId={publicEnv().privy.clientId}
        >
            {children}
        </Provider>
    )
}