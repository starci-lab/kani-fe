"use client"
import React, { PropsWithChildren, useMemo } from "react"
import { createContext } from "react"
import {
    useEnableMFAFormikCore,
    useConfirmTotpFormikCore,
    useCreateBotFormikCore,
    useSignInFormikCore,
    useVerifyFormikCore,
    useUpdateBotLiquidityPoolsFormikCore,
    useUpdateBotNameFormikCore,
} from "./core"

export interface FormikContextType {
    enableMFAFormik: ReturnType<typeof useEnableMFAFormikCore>
    confirmTotpFormik: ReturnType<typeof useConfirmTotpFormikCore>
    createBotFormik: ReturnType<typeof useCreateBotFormikCore>
    signInFormik: ReturnType<typeof useSignInFormikCore>
    verifyFormik: ReturnType<typeof useVerifyFormikCore>
    updateBotLiquidityPoolsFormik: ReturnType<typeof useUpdateBotLiquidityPoolsFormikCore>
    updateBotNameFormik: ReturnType<typeof useUpdateBotNameFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

// Lazy formik provider - only initializes hooks after mount
export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableMFAFormik = useEnableMFAFormikCore()
    const confirmTotpFormik = useConfirmTotpFormikCore()
    const createBotFormik = useCreateBotFormikCore()
    const signInFormik = useSignInFormikCore()
    const verifyFormik = useVerifyFormikCore()
    const updateBotLiquidityPoolsFormik = useUpdateBotLiquidityPoolsFormikCore()
    const updateBotNameFormik = useUpdateBotNameFormikCore()
    const value = useMemo(
        () => (
            {
                enableMFAFormik, 
                confirmTotpFormik, 
                createBotFormik,
                signInFormik,
                verifyFormik,
                updateBotLiquidityPoolsFormik,
                updateBotNameFormik
            }), [
            enableMFAFormik, 
            confirmTotpFormik, 
            createBotFormik, 
            signInFormik, 
            verifyFormik,
            updateBotLiquidityPoolsFormik,
            updateBotNameFormik
        ]
    )

    return (
        <FormikContext.Provider value={value}>
            {children}
        </FormikContext.Provider>
    )
}