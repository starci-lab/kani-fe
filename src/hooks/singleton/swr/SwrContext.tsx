"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import {
    useQueryUserSwrMutationCore,
    useQueryUserWithoutRetrySwrMutationCore,
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
    useVerifyPrivyAuthTokenSwrMutationCore,
    useQueryUserSwrCore,
    useQueryDynamicLiquidityPoolInfoSwrMutationCore,
    useCreateBotSwrMutationCore,
    useRequestSignInOtpSwrMutationCore,
    useVerifySignInOtpSwrMutationCore,
    useQueryTotpSecretSwrMutationCore,
    useEnableMFASwrMutationCore,
    useQueryBotSwrCore,
    useRequestSend2FactorOtpSwrMutationCore,
    useBackupBotPrivateKeySwrMutationCore,
} from "./api"

export interface SwrContextType {
  queryUserMutation: ReturnType<typeof useQueryUserSwrMutationCore>;
  queryUserWithoutRetryMutation: ReturnType<
    typeof useQueryUserWithoutRetrySwrMutationCore
  >;
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
  verifyPrivyAuthTokenMutation: ReturnType<typeof useVerifyPrivyAuthTokenSwrMutationCore>;
  queryUser: ReturnType<typeof useQueryUserSwrCore>;
  queryDynamicLiquidityPoolInfoMutation: ReturnType<typeof useQueryDynamicLiquidityPoolInfoSwrMutationCore>;
  createBotMutation: ReturnType<typeof useCreateBotSwrMutationCore>;
  requestSignInOtpMutation: ReturnType<typeof useRequestSignInOtpSwrMutationCore>;
  verifySignInOtpMutation: ReturnType<typeof useVerifySignInOtpSwrMutationCore>;
  queryTotpSecretMutation: ReturnType<typeof useQueryTotpSecretSwrMutationCore>;
  enableMFAMutation: ReturnType<typeof useEnableMFASwrMutationCore>;
  queryBot: ReturnType<typeof useQueryBotSwrCore>;
  requestSend2FactorOtpMutation: ReturnType<typeof useRequestSend2FactorOtpSwrMutationCore>;
  backupBotPrivateKeyMutation: ReturnType<typeof useBackupBotPrivateKeySwrMutationCore>;
}

export const SwrContext = createContext<SwrContextType | null>(null)

export const SwrProvider = ({ children }: PropsWithChildren) => {
    const queryUserMutation = useQueryUserSwrMutationCore()
    const queryUserWithoutRetryMutation =
    useQueryUserWithoutRetrySwrMutationCore()
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
    const verifyPrivyAuthTokenMutation = useVerifyPrivyAuthTokenSwrMutationCore()
    const queryUser = useQueryUserSwrCore()
    const queryDynamicLiquidityPoolInfoMutation = useQueryDynamicLiquidityPoolInfoSwrMutationCore()
    const createBotMutation = useCreateBotSwrMutationCore()
    const requestSignInOtpMutation = useRequestSignInOtpSwrMutationCore()
    const verifySignInOtpMutation = useVerifySignInOtpSwrMutationCore()
    const queryTotpSecretMutation = useQueryTotpSecretSwrMutationCore()
    const enableMFAMutation = useEnableMFASwrMutationCore()
    const queryBot = useQueryBotSwrCore()
    const requestSend2FactorOtpMutation = useRequestSend2FactorOtpSwrMutationCore()
    const backupBotPrivateKeyMutation = useBackupBotPrivateKeySwrMutationCore()
    return (
        <SwrContext.Provider
            value={{
                queryUserMutation,
                queryUserWithoutRetryMutation,
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
                verifyPrivyAuthTokenMutation,
                queryUser,
                queryDynamicLiquidityPoolInfoMutation,
                createBotMutation,
                requestSignInOtpMutation,
                verifySignInOtpMutation,
                queryTotpSecretMutation,
                enableMFAMutation,
                queryBot,
                requestSend2FactorOtpMutation,
                backupBotPrivateKeyMutation,
            }}
        >
            {children}
        </SwrContext.Provider>
    )
}
