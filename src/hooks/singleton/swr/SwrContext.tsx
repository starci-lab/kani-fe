"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useQueryUserSwrMutationCore, useQueryUserWithoutRetrySwrMutationCore, useConfirmOtpSwrMutationCore, useAddLiquidityProvisionBotSwrMutationCore } from "./api"

export interface SwrContextType {
    queryUserMutation: ReturnType<typeof useQueryUserSwrMutationCore>
    queryUserWithoutRetryMutation: ReturnType<typeof useQueryUserWithoutRetrySwrMutationCore>
    confirmOtpMutation: ReturnType<typeof useConfirmOtpSwrMutationCore>
    addLiquidityProvisionBotMutation: ReturnType<typeof useAddLiquidityProvisionBotSwrMutationCore>
}

export const SwrContext = createContext<SwrContextType | null>(null)

export const SwrProvider = ({ children }: PropsWithChildren) => {
    const queryUserMutation = useQueryUserSwrMutationCore()
    const queryUserWithoutRetryMutation = useQueryUserWithoutRetrySwrMutationCore()
    const confirmOtpMutation = useConfirmOtpSwrMutationCore()
    const addLiquidityProvisionBotMutation = useAddLiquidityProvisionBotSwrMutationCore()
    return (
        <SwrContext.Provider value={{ queryUserMutation, queryUserWithoutRetryMutation, confirmOtpMutation, addLiquidityProvisionBotMutation }}>
            {children}
        </SwrContext.Provider>
    )
}