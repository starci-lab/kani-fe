"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import {
    useQueryUserSwrMutationCore,
    useQueryUserWithoutRetrySwrMutationCore,
    useConfirmOtpSwrMutationCore,
    useAddLiquidityProvisionBotSwrMutationCore,
    useQueryStaticSwrMutationCore,
} from "./api"

export interface SwrContextType {
  queryUserMutation: ReturnType<typeof useQueryUserSwrMutationCore>;
  queryUserWithoutRetryMutation: ReturnType<
    typeof useQueryUserWithoutRetrySwrMutationCore
  >;
  confirmOtpMutation: ReturnType<typeof useConfirmOtpSwrMutationCore>;
  addLiquidityProvisionBotMutation: ReturnType<
    typeof useAddLiquidityProvisionBotSwrMutationCore
  >;
  queryStaticMutation: ReturnType<typeof useQueryStaticSwrMutationCore>;
}

export const SwrContext = createContext<SwrContextType | null>(null)

export const SwrProvider = ({ children }: PropsWithChildren) => {
    const queryUserMutation = useQueryUserSwrMutationCore()
    const queryUserWithoutRetryMutation =
    useQueryUserWithoutRetrySwrMutationCore()
    const confirmOtpMutation = useConfirmOtpSwrMutationCore()
    const addLiquidityProvisionBotMutation =
    useAddLiquidityProvisionBotSwrMutationCore()
    const queryStaticMutation = useQueryStaticSwrMutationCore()
    return (
        <SwrContext.Provider
            value={{
                queryUserMutation,
                queryUserWithoutRetryMutation,
                confirmOtpMutation,
                addLiquidityProvisionBotMutation,
                queryStaticMutation,
            }}
        >
            {children}
        </SwrContext.Provider>
    )
}
