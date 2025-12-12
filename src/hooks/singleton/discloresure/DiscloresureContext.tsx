"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useConnectModalDisclosureCore } from "./useConnectModalDiscloresure"
import { useExportPrivateKeyModalDisclosureCore } from "./useExportPrivateKeyDiscloresure"
import { useConfirmTOTPDisclosureCore } from "./useConfirmTOTPDiscloresure"
import { useDepositModalDisclosureCore } from "./useDepositModalDiscloreusre"
import { useUpdateExplorerDisclosureCore } from "./useUpdateExplorerDiscloresure"
import { useUpdateRpcsDisclosureCore } from "./useUpdateRpcsDiscloresure"
import { useSelectPoolsDisclosureCore } from "./useSelectPoolsDiscloresure"
import { useSelectTokenDisclosureCore } from "./useSelectTokenDiscloresure"

export interface DiscloresureContextType {
    connectModal: ReturnType<typeof useConnectModalDisclosureCore>
    exportPrivateKeyModal: ReturnType<typeof useExportPrivateKeyModalDisclosureCore>
    confirmTOTPModal: ReturnType<typeof useConfirmTOTPDisclosureCore>
    depositModal: ReturnType<typeof useDepositModalDisclosureCore>
    updateExplorerModal: ReturnType<typeof useUpdateExplorerDisclosureCore>
    updateRpcsModal: ReturnType<typeof useUpdateRpcsDisclosureCore>
    selectPoolsModal: ReturnType<typeof useSelectPoolsDisclosureCore>
    selectTokenModal: ReturnType<typeof useSelectTokenDisclosureCore>
}

export const DiscloresureContext = createContext<DiscloresureContextType | null>(null)

export const DiscloresureProvider = ({ children }: PropsWithChildren) => {
    const connectModal = useConnectModalDisclosureCore()
    const exportPrivateKeyModal = useExportPrivateKeyModalDisclosureCore()
    const confirmTOTPModal = useConfirmTOTPDisclosureCore()
    const depositModal = useDepositModalDisclosureCore()
    const updateExplorerModal = useUpdateExplorerDisclosureCore()
    const updateRpcsModal = useUpdateRpcsDisclosureCore()
    const selectPoolsModal = useSelectPoolsDisclosureCore()
    const selectTokenModal = useSelectTokenDisclosureCore()
    return (
        <DiscloresureContext.Provider value={{ 
            connectModal, 
            exportPrivateKeyModal, 
            confirmTOTPModal, 
            depositModal, 
            updateExplorerModal, 
            updateRpcsModal,
            selectPoolsModal,
            selectTokenModal
        }}>
            {children}
        </DiscloresureContext.Provider>
    )
}