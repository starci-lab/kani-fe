"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useEnableTotpFormikCore } from "./useEnableTotpFormik"
import { useInitializeLiquidityProvisionBotFormikCore } from "./useInitializeLiquidityProvisionBotFormik"
import { useConfirmTotpFormikCore } from "./useConfirmTotpFormik"

export interface FormikContextType {
    enableTotpFormik: ReturnType<typeof useEnableTotpFormikCore>
    initializeLiquidityProvisionBotFormik: ReturnType<typeof useInitializeLiquidityProvisionBotFormikCore>
    confirmTotpFormik: ReturnType<typeof useConfirmTotpFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableTotpFormik = useEnableTotpFormikCore()
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormikCore()
    const confirmTotpFormik = useConfirmTotpFormikCore()
    return (
        <FormikContext.Provider value={{ enableTotpFormik, initializeLiquidityProvisionBotFormik, confirmTotpFormik }}>
            {children}
        </FormikContext.Provider>
    )
}