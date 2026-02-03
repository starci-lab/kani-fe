"use client"
import React, { PropsWithChildren, useMemo } from "react"
import { createContext } from "react"
import {
    useConnectDisclosureCore,
    useExportPrivateKeyDisclosureCore,
    useConfirmTOTPDisclosureCore,
    useDepositDisclosureCore,
    useUpdateExplorerDisclosureCore,
    useUpdateRpcsDisclosureCore,
    useSelectPoolsDisclosureCore,
    useSelectTokenDisclosureCore,
    useSignInDisclosureCore,
    useEnableMFADisclosureCore,
    useVerifyDisclosureCore,
    usePositionDisclosureCore,
    useMenuDisclosureCore,
    useUpdatePoolsDisclosureCore,
    useSortByDisclosureCore,
    useWithdrawDisclosureCore,
} from "./core"

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
    withdraw: ReturnType<typeof useWithdrawDisclosureCore>
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
    const withdraw = useWithdrawDisclosureCore()
    const value = useMemo(() => ({
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
        sortBy,
        withdraw
    }), [
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
        sortBy,
        withdraw
    ])
    return (
        <DiscloresureContext.Provider value={value}>
            {children}
        </DiscloresureContext.Provider>
    )
}