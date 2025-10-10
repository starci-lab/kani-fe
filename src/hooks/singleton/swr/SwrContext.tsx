"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import {
    useQueryUserSwrMutationCore,
    useQueryUserWithoutRetrySwrMutationCore,
    useConfirmOtpSwrMutationCore,
    useAddLiquidityProvisionBotSwrMutationCore,
    useQueryStaticSwrMutationCore,
    useInitializeLiquidityProvisionBotSwrMutationCore,
    useQueryLiquidityProvisionSwrCore,
    useQueryExportedAccountSwrMutationCore,
    useUpdateLiquidityProvisionBotExplorerIdSwrMutationCore,
    useUpdateLiquidityProvisionBotLiquidityPoolsSwrMutationCore,
    useUpdateLiquidityProvisionBotRpcsSwrMutationCore,
    useRunLiquidityProvisionBotSwrMutationCore,
    useStopLiquidityProvisionBotSwrMutationCore,
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
  initializeLiquidityProvisionBotMutation: ReturnType<typeof useInitializeLiquidityProvisionBotSwrMutationCore>;
  queryLiquidityProvision: ReturnType<typeof useQueryLiquidityProvisionSwrCore>;
  queryExportedAccount: ReturnType<typeof useQueryExportedAccountSwrMutationCore>;
  updateLiquidityProvisionBotExplorerIdMutation: ReturnType<typeof useUpdateLiquidityProvisionBotExplorerIdSwrMutationCore>;
  updateLiquidityProvisionBotLiquidityPoolsMutation: ReturnType<typeof useUpdateLiquidityProvisionBotLiquidityPoolsSwrMutationCore>;
  updateLiquidityProvisionBotRpcsMutation: ReturnType<typeof useUpdateLiquidityProvisionBotRpcsSwrMutationCore>;
  runLiquidityProvisionBotMutation: ReturnType<typeof useRunLiquidityProvisionBotSwrMutationCore>;
  stopLiquidityProvisionBotMutation: ReturnType<typeof useStopLiquidityProvisionBotSwrMutationCore>;
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
    const initializeLiquidityProvisionBotMutation = useInitializeLiquidityProvisionBotSwrMutationCore()
    const queryLiquidityProvision = useQueryLiquidityProvisionSwrCore()
    const queryExportedAccount = useQueryExportedAccountSwrMutationCore()
    const updateLiquidityProvisionBotExplorerIdMutation = useUpdateLiquidityProvisionBotExplorerIdSwrMutationCore()
    const updateLiquidityProvisionBotLiquidityPoolsMutation = useUpdateLiquidityProvisionBotLiquidityPoolsSwrMutationCore()
    const updateLiquidityProvisionBotRpcsMutation = useUpdateLiquidityProvisionBotRpcsSwrMutationCore()
    const runLiquidityProvisionBotMutation = useRunLiquidityProvisionBotSwrMutationCore()
    const stopLiquidityProvisionBotMutation = useStopLiquidityProvisionBotSwrMutationCore()
    return (
        <SwrContext.Provider
            value={{
                queryUserMutation,
                queryUserWithoutRetryMutation,
                confirmOtpMutation,
                addLiquidityProvisionBotMutation,
                queryStaticMutation,
                initializeLiquidityProvisionBotMutation,
                queryLiquidityProvision,
                queryExportedAccount,
                updateLiquidityProvisionBotExplorerIdMutation,
                updateLiquidityProvisionBotLiquidityPoolsMutation,
                updateLiquidityProvisionBotRpcsMutation,
                runLiquidityProvisionBotMutation,
                stopLiquidityProvisionBotMutation,
            }}
        >
            {children}
        </SwrContext.Provider>
    )
}
