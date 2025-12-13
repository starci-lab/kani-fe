"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useEnableTotpFormikCore } from "./useEnableTotpFormik"
import { useInitializeLiquidityProvisionBotFormikCore } from "./useInitializeLiquidityProvisionBotFormik"
import { useConfirmTotpFormikCore } from "./useConfirmTotpFormik"
import { useUpdateExplorerFormikCore } from "./useUpdateExplorerFormik"
import { useUpdateRpcsFormikCore } from "./useUpdateRpcsFormik"
import { useCreateBotFormikCore } from "./useCreateBotFormik"
import { useSignInFormikCore } from "./useSignInFormik"
export interface FormikContextType {
    enableTotpFormik: ReturnType<typeof useEnableTotpFormikCore>
    initializeLiquidityProvisionBotFormik: ReturnType<typeof useInitializeLiquidityProvisionBotFormikCore>
    confirmTotpFormik: ReturnType<typeof useConfirmTotpFormikCore>
    updateExplorerFormik: ReturnType<typeof useUpdateExplorerFormikCore>
    updateRpcsFormik: ReturnType<typeof useUpdateRpcsFormikCore>
    createBotFormik: ReturnType<typeof useCreateBotFormikCore>
    signInFormik: ReturnType<typeof useSignInFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableTotpFormik = useEnableTotpFormikCore()
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormikCore()
    const confirmTotpFormik = useConfirmTotpFormikCore()
    const updateExplorerFormik = useUpdateExplorerFormikCore()
    const updateRpcsFormik = useUpdateRpcsFormikCore()
    const createBotFormik = useCreateBotFormikCore()
    const signInFormik = useSignInFormikCore()
    return (
        <FormikContext.Provider value={{ 
            enableTotpFormik, 
            initializeLiquidityProvisionBotFormik, 
            confirmTotpFormik, 
            updateExplorerFormik, 
            updateRpcsFormik,
            createBotFormik,
            signInFormik
        }}>
            {children}
        </FormikContext.Provider>
    )
}