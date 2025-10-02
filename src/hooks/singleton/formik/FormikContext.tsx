"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useEnableTotpFormikCore } from "./useEnableTotpFormik"
import { useInitializeLiquidityProvisionBotFormikCore } from "./useInitializeLiquidityProvisionBotFormik"

export interface FormikContextType {
    enableTotpFormik: ReturnType<typeof useEnableTotpFormikCore>
    initializeLiquidityProvisionBotFormik: ReturnType<typeof useInitializeLiquidityProvisionBotFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableTotpFormik = useEnableTotpFormikCore()
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormikCore()
    return (
        <FormikContext.Provider value={{ enableTotpFormik, initializeLiquidityProvisionBotFormik }}>
            {children}
        </FormikContext.Provider>
    )
}