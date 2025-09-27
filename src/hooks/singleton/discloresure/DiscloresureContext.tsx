"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useConnectModalDisclosureCore } from "./useConnectModalDiscloresure"

export interface DiscloresureContextType {
    connectModal: ReturnType<typeof useConnectModalDisclosureCore>
}

export const DiscloresureContext = createContext<DiscloresureContextType | null>(null)

export const DiscloresureProvider = ({ children }: PropsWithChildren) => {
    const connectModal = useConnectModalDisclosureCore()
    return (
        <DiscloresureContext.Provider value={{ connectModal }}>
            {children}
        </DiscloresureContext.Provider>
    )
}