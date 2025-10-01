"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useConnectModalDisclosureCore } from "./useConnectModalDiscloresure"
import { useExportPrivateKeyModalDisclosureCore } from "./useExportPrivateKeyDiscloresure"

export interface DiscloresureContextType {
    connectModal: ReturnType<typeof useConnectModalDisclosureCore>
    exportPrivateKeyModal: ReturnType<typeof useExportPrivateKeyModalDisclosureCore>
}

export const DiscloresureContext = createContext<DiscloresureContextType | null>(null)

export const DiscloresureProvider = ({ children }: PropsWithChildren) => {
    const connectModal = useConnectModalDisclosureCore()
    const exportPrivateKeyModal = useExportPrivateKeyModalDisclosureCore()
    return (
        <DiscloresureContext.Provider value={{ connectModal, exportPrivateKeyModal }}>
            {children}
        </DiscloresureContext.Provider>
    )
}