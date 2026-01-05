"use client"
import React, { PropsWithChildren, useMemo } from "react"
import { createContext } from "react"
import {
    useQueryUserSwrMutationCore,
    useQueryUserWithoutRetrySwrMutationCore,
    useQueryStaticSwrCore,
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
    useQueryTransactionsSwrCore,
    useQueryPositionsSwrCore,
    useQueryPositions2SwrCore,
    useQueryTransactions2SwrCore,
    useQueryHistorySwrCore,
    useQueryBots2SwrCore,
    useToggleBotSwrMutationCore,
    useQueryFeesSwrCore,
} from "./api"

export interface SwrContextType {
  queryUserSwrMutation: ReturnType<typeof useQueryUserSwrMutationCore>;
  queryUserWithoutRetrySwrMutation: ReturnType<
    typeof useQueryUserWithoutRetrySwrMutationCore
  >;
  queryStaticSwr: ReturnType<typeof useQueryStaticSwrCore>;
  queryUserSwr: ReturnType<typeof useQueryUserSwrCore>;
  createBotSwrMutation: ReturnType<typeof useCreateBotSwrMutationCore>;
  queryDynamicLiquidityPoolInfoSwrMutation: ReturnType<typeof useQueryDynamicLiquidityPoolInfoSwrMutationCore>;
  requestSignInOtpSwrMutation: ReturnType<typeof useRequestSignInOtpSwrMutationCore>;
  verifySignInOtpSwrMutation: ReturnType<typeof useVerifySignInOtpSwrMutationCore>;
  queryTotpSecretSwrMutation: ReturnType<typeof useQueryTotpSecretSwrMutationCore>;
  enableMFASwrMutation: ReturnType<typeof useEnableMFASwrMutationCore>;
  queryBotSwr: ReturnType<typeof useQueryBotSwrCore>;
  requestSend2FactorOtpSwrMutation: ReturnType<typeof useRequestSend2FactorOtpSwrMutationCore>;
  backupBotPrivateKeySwrMutation: ReturnType<typeof useBackupBotPrivateKeySwrMutationCore>;
  queryTransactionsSwr: ReturnType<typeof useQueryTransactionsSwrCore>;
  queryPositionsSwr: ReturnType<typeof useQueryPositionsSwrCore>;
  queryPositions2Swr: ReturnType<typeof useQueryPositions2SwrCore>;
  queryTransactions2Swr: ReturnType<typeof useQueryTransactions2SwrCore>;
  queryHistorySwr: ReturnType<typeof useQueryHistorySwrCore>;
  queryBots2Swr: ReturnType<typeof useQueryBots2SwrCore>;
  toggleBotSwrMutation: ReturnType<typeof useToggleBotSwrMutationCore>;
  queryFeesSwr: ReturnType<typeof useQueryFeesSwrCore>;
}

export const SwrContext = createContext<SwrContextType | null>(null)

export const SwrProvider = ({ children }: PropsWithChildren) => {
    const queryUserSwrMutation = useQueryUserSwrMutationCore()
    const queryUserWithoutRetrySwrMutation =
    useQueryUserWithoutRetrySwrMutationCore()
    const queryStaticSwr = useQueryStaticSwrCore()
    const queryUserSwr = useQueryUserSwrCore()
    const queryDynamicLiquidityPoolInfoSwrMutation = useQueryDynamicLiquidityPoolInfoSwrMutationCore()
    const requestSignInOtpSwrMutation = useRequestSignInOtpSwrMutationCore()
    const verifySignInOtpSwrMutation = useVerifySignInOtpSwrMutationCore()
    const queryTotpSecretSwrMutation = useQueryTotpSecretSwrMutationCore()
    const enableMFASwrMutation = useEnableMFASwrMutationCore()
    const queryBotSwr = useQueryBotSwrCore()
    const requestSend2FactorOtpSwrMutation = useRequestSend2FactorOtpSwrMutationCore()
    const backupBotPrivateKeySwrMutation = useBackupBotPrivateKeySwrMutationCore()
    const queryTransactionsSwr = useQueryTransactionsSwrCore()
    const queryPositionsSwr = useQueryPositionsSwrCore()
    const queryPositions2Swr = useQueryPositions2SwrCore()
    const queryTransactions2Swr = useQueryTransactions2SwrCore()
    const queryHistorySwr = useQueryHistorySwrCore()
    const queryBots2Swr = useQueryBots2SwrCore()
    const createBotSwrMutation = useCreateBotSwrMutationCore()
    const toggleBotSwrMutation = useToggleBotSwrMutationCore()
    const queryFeesSwr = useQueryFeesSwrCore()
    const values = useMemo(() => ({
        queryUserSwrMutation,
        queryUserWithoutRetrySwrMutation,
        queryStaticSwr,
        queryUserSwr,
        queryDynamicLiquidityPoolInfoSwrMutation,
        requestSignInOtpSwrMutation,
        verifySignInOtpSwrMutation,
        queryTotpSecretSwrMutation,
        enableMFASwrMutation,
        queryBotSwr,
        requestSend2FactorOtpSwrMutation,
        backupBotPrivateKeySwrMutation,
        queryTransactionsSwr,
        queryPositionsSwr,
        queryPositions2Swr,
        queryTransactions2Swr,
        queryHistorySwr,
        queryBots2Swr,
        createBotSwrMutation,
        toggleBotSwrMutation,
        queryFeesSwr,
    }), [
        queryUserSwrMutation,
        queryUserWithoutRetrySwrMutation,
        queryStaticSwr,
        queryUserSwr,
        queryDynamicLiquidityPoolInfoSwrMutation,
        requestSignInOtpSwrMutation,
        verifySignInOtpSwrMutation,
        queryTotpSecretSwrMutation,
        enableMFASwrMutation,
        queryBotSwr,
        requestSend2FactorOtpSwrMutation,
        backupBotPrivateKeySwrMutation,
        queryTransactionsSwr,
        queryPositionsSwr,
        queryPositions2Swr,
        queryTransactions2Swr,
        queryHistorySwr,
        queryBots2Swr,
        createBotSwrMutation,
        toggleBotSwrMutation,
        queryFeesSwr,
    ]
    )
    return (
        <SwrContext.Provider
            value={values}
        >
            {children}
        </SwrContext.Provider>
    )
}
