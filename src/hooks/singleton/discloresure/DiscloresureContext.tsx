"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useConnectDisclosureCore } from "./useConnectDiscloresure"
import { useExportPrivateKeyDisclosureCore } from "./useExportPrivateKeyDiscloresure"
import { useConfirmTOTPDisclosureCore } from "./useConfirmTOTPDiscloresure"
import { useDepositDisclosureCore } from "./useDepositDiscloreusre"
import { useUpdateExplorerDisclosureCore } from "./useUpdateExplorerDiscloresure"
import { useUpdateRpcsDisclosureCore } from "./useUpdateRpcsDiscloresure"
import { useSelectPoolsDisclosureCore } from "./useSelectPoolsDiscloresure"
import { useSelectTokenDisclosureCore } from "./useSelectTokenDiscloresure"
import { useSignInDisclosureCore } from "./useSignInDiscloresure"
import { useEnableMFADisclosureCore } from "./useEnableMFADiscloresure"
import { useVerifyDisclosureCore } from "./useVerifyDiscloresure"
import { usePositionDisclosureCore } from "./usePosition"
import { useMenuDisclosureCore } from "./useMenuDisclosure"
import { useUpdatePoolsDisclosureCore } from "./useUpdatePoolsDiscloresure"
import { useSortByDisclosureCore } from "./useSortByDiscloresure"

export interface DiscloresureContextType {
    connect: ReturnType<typeof useConnectDisclosureCore>
    exportPrivateKey: ReturnType<typeof useExportPrivateKeyDisclosureCore>
    confirmTOTP: ReturnType<typeof useConfirmTOTPDisclosureCore>
    deposit: ReturnType<typeof useDepositDisclosureCore>
    updateExplorer: ReturnType<typeof useUpdateExplorerDisclosureCore>
    updateRpcs: ReturnType<typeof useUpdateRpcsDisclosureCore>
    selectPools: ReturnType<typeof useSelectPoolsDisclosureCore>
    selectToken: ReturnType<typeof useSelectTokenDisclosureCore>
    signIn: ReturnType<typeof useSignInDisclosureCore>
    enableMFA: ReturnType<typeof useEnableMFADisclosureCore>
    verify: ReturnType<typeof useVerifyDisclosureCore>
    position: ReturnType<typeof usePositionDisclosureCore>
    menu: ReturnType<typeof useMenuDisclosureCore>
    updatePools: ReturnType<typeof useUpdatePoolsDisclosureCore>
    sortBy: ReturnType<typeof useSortByDisclosureCore>
}

export const DiscloresureContext = createContext<DiscloresureContextType | null>(null)

export const DiscloresureProvider = ({ children }: PropsWithChildren) => {
    const connect = useConnectDisclosureCore()
    const exportPrivateKey = useExportPrivateKeyDisclosureCore()
    const confirmTOTP = useConfirmTOTPDisclosureCore()
    const deposit = useDepositDisclosureCore()
    const updateExplorer = useUpdateExplorerDisclosureCore()
    const updateRpcs = useUpdateRpcsDisclosureCore()
    const selectPools = useSelectPoolsDisclosureCore()
    const selectToken = useSelectTokenDisclosureCore()
    const signIn = useSignInDisclosureCore()
    const enableMFA = useEnableMFADisclosureCore()
    const verify = useVerifyDisclosureCore()
    const position = usePositionDisclosureCore()
    const menu = useMenuDisclosureCore()
    const updatePools = useUpdatePoolsDisclosureCore()
    const sortBy = useSortByDisclosureCore()
    return (
        <DiscloresureContext.Provider value={{ 
            connect, 
            exportPrivateKey, 
            confirmTOTP, 
            deposit, 
            updateExplorer, 
            updateRpcs,
            selectPools,
            selectToken,
            signIn,
            enableMFA,
            verify,
            position,
            menu,
            updatePools,
            sortBy
        }}>
            {children}
        </DiscloresureContext.Provider>
    )
}