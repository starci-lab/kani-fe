"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useEnableTotpFormikCore } from "./useEnableTotpFormik"

export interface FormikContextType {
    enableTotpFormik: ReturnType<typeof useEnableTotpFormikCore>
}

export const FormikContext = createContext<FormikContextType | null>(null)

export const FormikProvider = ({ children }: PropsWithChildren) => {
    const enableTotpFormik = useEnableTotpFormikCore()
    return (
        <FormikContext.Provider value={{ enableTotpFormik }}>
            {children}
        </FormikContext.Provider>
    )
}