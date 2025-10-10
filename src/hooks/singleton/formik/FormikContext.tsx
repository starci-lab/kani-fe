"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useEnableTotpFormikCore } from "./useEnableTotpFormik"
import { useInitializeLiquidityProvisionBotFormikCore } from "./useInitializeLiquidityProvisionBotFormik"
import { useConfirmTotpFormikCore } from "./useConfirmTotpFormik"
import { useUpdateExplorerFormikCore } from "./useUpdateExplorerFormik"
import { useUpdateRpcsFormikCore } from "./useUpdateRpcsFormik"

export interface FormikContextType {
    enableTotpFormik: ReturnType<typeof useEnableTotpFormikCore>
    initializeLiquidityProvisionBotFormik: ReturnType<typeof useInitializeLiquidityProvisionBotFormikCore>
    confirmTotpFormik: ReturnType<typeof useConfirmTotpFormikCore>
    updateExplorerFormik: ReturnType<typeof useUpdateExplorerFormikCore>
    updateRpcsFormik: ReturnType<typeof useUpdateRpcsFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableTotpFormik = useEnableTotpFormikCore()
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormikCore()
    const confirmTotpFormik = useConfirmTotpFormikCore()
    const updateExplorerFormik = useUpdateExplorerFormikCore()
    const updateRpcsFormik = useUpdateRpcsFormikCore()
    return (
        <FormikContext.Provider value={{ 
            enableTotpFormik, 
            initializeLiquidityProvisionBotFormik, 
            confirmTotpFormik, 
            updateExplorerFormik, 
            updateRpcsFormik 
        }}>
            {children}
        </FormikContext.Provider>
    )
}