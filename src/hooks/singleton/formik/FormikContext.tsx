"use client"
import React, { PropsWithChildren, useMemo } from "react"
import { createContext } from "react"
import {
    useEnableAuthenticatorAppFormikCore,
    useDisableAuthenticatorAppFormikCore,
    useVerifyAuthenticatorAppFormikCore,
    useConfirmTotpFormikCore,
    useCreateBotFormikCore,
    useSignInFormikCore,
    useUpdateBotLiquidityPoolsFormikCore,
    useUpdateBotNameFormikCore,
    usePercentageWithdrawFormikCore,
    useSingleAssetWithdrawFormikCore,
} from "./core"

export interface FormikContextType {
    enableAuthenticatorAppFormik: ReturnType<typeof useEnableAuthenticatorAppFormikCore>
    disableAuthenticatorAppFormik: ReturnType<typeof useDisableAuthenticatorAppFormikCore>
    verifyAuthenticatorAppFormik: ReturnType<typeof useVerifyAuthenticatorAppFormikCore>
    confirmTotpFormik: ReturnType<typeof useConfirmTotpFormikCore>
    createBotFormik: ReturnType<typeof useCreateBotFormikCore>
    signInFormik: ReturnType<typeof useSignInFormikCore>    
    updateBotLiquidityPoolsFormik: ReturnType<typeof useUpdateBotLiquidityPoolsFormikCore>
    updateBotNameFormik: ReturnType<typeof useUpdateBotNameFormikCore>
    percentageWithdrawFormik: ReturnType<typeof usePercentageWithdrawFormikCore>
    singleAssetWithdrawFormik: ReturnType<typeof useSingleAssetWithdrawFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

// Lazy formik provider - only initializes hooks after mount
export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableAuthenticatorAppFormik = useEnableAuthenticatorAppFormikCore()
    const disableAuthenticatorAppFormik = useDisableAuthenticatorAppFormikCore()
    const verifyAuthenticatorAppFormik = useVerifyAuthenticatorAppFormikCore()
    const confirmTotpFormik = useConfirmTotpFormikCore()
    const createBotFormik = useCreateBotFormikCore()
    const signInFormik = useSignInFormikCore()
    const updateBotLiquidityPoolsFormik = useUpdateBotLiquidityPoolsFormikCore()
    const updateBotNameFormik = useUpdateBotNameFormikCore()
    const percentageWithdrawFormik = usePercentageWithdrawFormikCore()
    const singleAssetWithdrawFormik = useSingleAssetWithdrawFormikCore()
    const value = useMemo(
        () => (
            {
                enableAuthenticatorAppFormik,
                disableAuthenticatorAppFormik,
                verifyAuthenticatorAppFormik,
                confirmTotpFormik, 
                createBotFormik,
                signInFormik,
                updateBotLiquidityPoolsFormik,
                updateBotNameFormik,
                percentageWithdrawFormik,
                singleAssetWithdrawFormik
            }), [
            enableAuthenticatorAppFormik,
            disableAuthenticatorAppFormik,
            verifyAuthenticatorAppFormik,
            confirmTotpFormik, 
            createBotFormik, 
            signInFormik, 
            updateBotLiquidityPoolsFormik,
            updateBotNameFormik,
            percentageWithdrawFormik,
            singleAssetWithdrawFormik
        ]
    )

    return (
        <FormikContext.Provider value={value}>
            {children}
        </FormikContext.Provider>
    )
}