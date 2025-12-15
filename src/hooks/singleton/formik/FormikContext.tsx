"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useEnableMFAFormikCore } from "./useEnableMFAFormik"
import { useInitializeLiquidityProvisionBotFormikCore } from "./useInitializeLiquidityProvisionBotFormik"
import { useConfirmTotpFormikCore } from "./useConfirmTotpFormik"
import { useUpdateExplorerFormikCore } from "./useUpdateExplorerFormik"
import { useUpdateRpcsFormikCore } from "./useUpdateRpcsFormik"
import { useCreateBotFormikCore } from "./useCreateBotFormik"
import { useSignInFormikCore } from "./useSignInFormik"
import { useVerifyFormikCore } from "./useVerifyFormik"

export interface FormikContextType {
    enableMFAFormik: ReturnType<typeof useEnableMFAFormikCore>
    initializeLiquidityProvisionBotFormik: ReturnType<typeof useInitializeLiquidityProvisionBotFormikCore>
    confirmTotpFormik: ReturnType<typeof useConfirmTotpFormikCore>
    updateExplorerFormik: ReturnType<typeof useUpdateExplorerFormikCore>
    updateRpcsFormik: ReturnType<typeof useUpdateRpcsFormikCore>
    createBotFormik: ReturnType<typeof useCreateBotFormikCore>
    signInFormik: ReturnType<typeof useSignInFormikCore>
    verifyFormik: ReturnType<typeof useVerifyFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableMFAFormik = useEnableMFAFormikCore()
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormikCore()
    const confirmTotpFormik = useConfirmTotpFormikCore()
    const updateExplorerFormik = useUpdateExplorerFormikCore()
    const updateRpcsFormik = useUpdateRpcsFormikCore()
    const createBotFormik = useCreateBotFormikCore()
    const signInFormik = useSignInFormikCore()
    const verifyFormik = useVerifyFormikCore()
    return (
        <FormikContext.Provider value={{ 
            enableMFAFormik, 
            initializeLiquidityProvisionBotFormik, 
            confirmTotpFormik, 
            updateExplorerFormik, 
            updateRpcsFormik,
            createBotFormik,
            signInFormik,
            verifyFormik
        }}>
            {children}
        </FormikContext.Provider>
    )
}