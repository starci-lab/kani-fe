"use client"
import React, { PropsWithChildren, useMemo } from "react"
import { createContext } from "react"
import {
    useQueryUserSwrMutationCore,
    useQueryUserWithoutRetrySwrMutationCore,
    useQueryStaticSwrCore,
    useQueryUserSwrCore,
    useQueryDynamicLiquidityPoolInfoSwrCore,
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
    useQueryReservesSwrCore,
    useQueryUserV2SwrCore,
    useCreateBotV2SwrMutationCore,
    useQueryBots2V2SwrCore,
    useQueryBotV2SwrCore,
    useQueryPositionsV2SwrCore,
    useQueryPositions2V2SwrCore,
    useQueryTransactions2V2SwrCore,
    useQueryTransactionsV2SwrCore,
} from "./api"

export interface SwrContextType {
    queryUserSwrMutation: ReturnType<typeof useQueryUserSwrMutationCore>;
    queryUserWithoutRetrySwrMutation: ReturnType<
        typeof useQueryUserWithoutRetrySwrMutationCore
    >;
    queryStaticSwr: ReturnType<typeof useQueryStaticSwrCore>;
    queryUserSwr: ReturnType<typeof useQueryUserSwrCore>;
    createBotSwrMutation: ReturnType<typeof useCreateBotSwrMutationCore>;
    queryDynamicLiquidityPoolInfoSwr: ReturnType<typeof useQueryDynamicLiquidityPoolInfoSwrCore>;
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
    queryReservesSwr: ReturnType<typeof useQueryReservesSwrCore>;
    queryUserV2Swr: ReturnType<typeof useQueryUserV2SwrCore>;
    createBotV2SwrMutation: ReturnType<typeof useCreateBotV2SwrMutationCore>;
    queryBots2V2Swr: ReturnType<typeof useQueryBots2V2SwrCore>;
    queryBotV2Swr: ReturnType<typeof useQueryBotV2SwrCore>;
    queryTransactions2V2Swr: ReturnType<typeof useQueryTransactions2V2SwrCore>;
    queryPositions2V2Swr: ReturnType<typeof useQueryPositions2V2SwrCore>;
    queryPositionsV2Swr: ReturnType<typeof useQueryPositionsV2SwrCore>;
    queryTransactionsV2Swr: ReturnType<typeof useQueryTransactionsV2SwrCore>;
}

export const SwrContext = createContext<SwrContextType | null>(null)

export const SwrProvider = ({ children }: PropsWithChildren) => {
    const queryUserSwrMutation = useQueryUserSwrMutationCore()
    const queryUserWithoutRetrySwrMutation = useQueryUserWithoutRetrySwrMutationCore()
    const queryStaticSwr = useQueryStaticSwrCore()
    const queryUserSwr = useQueryUserSwrCore()
    const queryUserV2Swr = useQueryUserV2SwrCore()
    const createBotV2SwrMutation = useCreateBotV2SwrMutationCore()
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
    const queryBots2V2Swr = useQueryBots2V2SwrCore()
    const createBotSwrMutation = useCreateBotSwrMutationCore()
    const toggleBotSwrMutation = useToggleBotSwrMutationCore()
    const queryFeesSwr = useQueryFeesSwrCore()
    const queryReservesSwr = useQueryReservesSwrCore()
    const queryDynamicLiquidityPoolInfoSwr = useQueryDynamicLiquidityPoolInfoSwrCore()
    const queryBotV2Swr = useQueryBotV2SwrCore()
    const queryTransactions2V2Swr = useQueryTransactions2V2SwrCore()
    const queryPositions2V2Swr = useQueryPositions2V2SwrCore()
    const queryPositionsV2Swr = useQueryPositionsV2SwrCore()
    const queryTransactionsV2Swr = useQueryTransactionsV2SwrCore()
    const values = useMemo(() => ({
        queryUserSwrMutation,
        queryUserWithoutRetrySwrMutation,
        queryStaticSwr,
        queryUserSwr,
        queryDynamicLiquidityPoolInfoSwr,
        queryUserV2Swr,
        queryBots2V2Swr,
        queryBotV2Swr,
        createBotV2SwrMutation,
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
        queryTransactions2V2Swr,
        queryPositions2V2Swr,
        queryPositionsV2Swr,
        queryTransactionsV2Swr,
        queryHistorySwr,
        queryBots2Swr,
        createBotSwrMutation,
        toggleBotSwrMutation,
        queryFeesSwr,
        queryReservesSwr,
    }), [
        queryUserSwrMutation,
        queryUserWithoutRetrySwrMutation,
        queryStaticSwr,
        queryUserSwr,
        queryDynamicLiquidityPoolInfoSwr,
        queryUserV2Swr,
        createBotV2SwrMutation,
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
        queryTransactions2V2Swr,
        queryPositions2V2Swr,
        queryPositionsV2Swr,
        queryTransactionsV2Swr,
        queryHistorySwr,
        queryBots2Swr,
        queryBots2V2Swr,
        queryBotV2Swr,
        createBotSwrMutation,
        toggleBotSwrMutation,
        queryFeesSwr,
        queryReservesSwr,
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
