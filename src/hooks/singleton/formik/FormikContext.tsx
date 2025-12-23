"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useEnableMFAFormikCore } from "./useEnableMFAFormik"
import { useConfirmTotpFormikCore } from "./useConfirmTotpFormik"
import { useCreateBotFormikCore } from "./useCreateBotFormik"
import { useSignInFormikCore } from "./useSignInFormik"
import { useVerifyFormikCore } from "./useVerifyFormik"

export interface FormikContextType {
    enableMFAFormik: ReturnType<typeof useEnableMFAFormikCore>
    confirmTotpFormik: ReturnType<typeof useConfirmTotpFormikCore>
    createBotFormik: ReturnType<typeof useCreateBotFormikCore>
    signInFormik: ReturnType<typeof useSignInFormikCore>
    verifyFormik: ReturnType<typeof useVerifyFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableMFAFormik = useEnableMFAFormikCore()
    const confirmTotpFormik = useConfirmTotpFormikCore()
    const createBotFormik = useCreateBotFormikCore()
    const signInFormik = useSignInFormikCore()
    const verifyFormik = useVerifyFormikCore()
    return (
        <FormikContext.Provider value={{ 
            enableMFAFormik, 
            confirmTotpFormik, 
            createBotFormik,
            signInFormik,
            verifyFormik
        }}>
            {children}
        </FormikContext.Provider>
    )
}