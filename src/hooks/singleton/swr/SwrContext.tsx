"use client"
import React, { PropsWithChildren, useMemo } from "react"
import { createContext } from "react"
import {
    useQueryStaticSwrCore,
    useCreateBotSwrMutationCore,
    useRequestSignInOtpSwrMutationCore,
    useVerifySignInOtpSwrMutationCore,
    useEnableMFASwrMutationCore,
    useRequestSend2FactorOtpSwrMutationCore,
    useBackupBotPrivateKeySwrMutationCore,
    useToggleBotSwrMutationCore,
    useQueryUserV2SwrCore,
    useCreateBotV2SwrMutationCore,
    useQueryFeesV2SwrCore,
    useQueryReservesV2SwrCore,
    useUpdateBotSettingsV2SwrMutationCore,
    useToggleBotV2SwrMutationCore,
    useUpdateBotLiquidityPoolsV2SwrMutationCore,
    useQueryLiquidityPoolsActivePositionSwrCore,
    useQueryLiquidityPoolsBotSwrCore,
    useQueryLiquidityPoolsUpdatePoolsSwrCore,
    useQueryLiquidityPoolsSelectPoolsSwrCore,
    useQueryTransactionsSwrCore,
    useQueryPositionsSwrCore,
    useQueryTransactionsV2SwrCore,
    useQueryBotsV2SwrCore,
    useQueryFundingSnapshotV2SwrCore,
    useQueryHistoryV2SwrCore,
    useQueryTotpSecretSwrMutationCore,
    useQueryBotV2SwrCore,
    useQueryLiquidityPoolsSelectedPoolsSwrCore,
    useQueryPositionsV2SwrCore,
    useBackupBotPrivateKeyV2SwrMutationCore,
} from "./core"

export interface SwrContextType {
    queryStaticSwr: ReturnType<typeof useQueryStaticSwrCore>;
    createBotSwrMutation: ReturnType<typeof useCreateBotSwrMutationCore>;
    requestSignInOtpSwrMutation: ReturnType<typeof useRequestSignInOtpSwrMutationCore>;
    verifySignInOtpSwrMutation: ReturnType<typeof useVerifySignInOtpSwrMutationCore>;
    enableMFASwrMutation: ReturnType<typeof useEnableMFASwrMutationCore>;
    requestSend2FactorOtpSwrMutation: ReturnType<typeof useRequestSend2FactorOtpSwrMutationCore>;
    backupBotPrivateKeySwrMutation: ReturnType<typeof useBackupBotPrivateKeySwrMutationCore>;
    backupBotPrivateKeyV2SwrMutation: ReturnType<typeof useBackupBotPrivateKeyV2SwrMutationCore>;
    toggleBotSwrMutation: ReturnType<typeof useToggleBotSwrMutationCore>;
    queryUserV2Swr: ReturnType<typeof useQueryUserV2SwrCore>;
    createBotV2SwrMutation: ReturnType<typeof useCreateBotV2SwrMutationCore>;
    queryFeesV2Swr: ReturnType<typeof useQueryFeesV2SwrCore>;
    queryReservesV2Swr: ReturnType<typeof useQueryReservesV2SwrCore>;
    queryFundingSnapshotV2Swr: ReturnType<typeof useQueryFundingSnapshotV2SwrCore>;
    queryHistoryV2Swr: ReturnType<typeof useQueryHistoryV2SwrCore>;
    queryTotpSecretSwrMutation: ReturnType<typeof useQueryTotpSecretSwrMutationCore>;
    queryLiquidityPoolsActivePositionSwr: ReturnType<typeof useQueryLiquidityPoolsActivePositionSwrCore>;
    queryLiquidityPoolsBotSwr: ReturnType<typeof useQueryLiquidityPoolsBotSwrCore>;
    queryLiquidityPoolsUpdatePoolsSwr: ReturnType<typeof useQueryLiquidityPoolsUpdatePoolsSwrCore>;
    queryLiquidityPoolsSelectPoolsSwr: ReturnType<typeof useQueryLiquidityPoolsSelectPoolsSwrCore>;
    queryLiquidityPoolsSelectedPoolsSwr: ReturnType<typeof useQueryLiquidityPoolsSelectedPoolsSwrCore>;
    toggleBotV2SwrMutation: ReturnType<typeof useToggleBotV2SwrMutationCore>;
    updateBotLiquidityPoolsV2SwrMutation: ReturnType<typeof useUpdateBotLiquidityPoolsV2SwrMutationCore>;
    updateBotSettingsV2SwrMutation: ReturnType<typeof useUpdateBotSettingsV2SwrMutationCore>;
    queryBotsV2Swr: ReturnType<typeof useQueryBotsV2SwrCore>;
    queryBotV2Swr: ReturnType<typeof useQueryBotV2SwrCore>;
    queryPositionsSwr: ReturnType<typeof useQueryPositionsSwrCore>;
    queryPositionsV2Swr: ReturnType<typeof useQueryPositionsV2SwrCore>;
    queryTransactionsSwr: ReturnType<typeof useQueryTransactionsSwrCore>;
    queryTransactionsV2Swr: ReturnType<typeof useQueryTransactionsV2SwrCore>;
}

export const SwrContext = createContext<SwrContextType | null>(null)

export const SwrProvider = ({ children }: PropsWithChildren) => {
    const queryStaticSwr = useQueryStaticSwrCore()
    const queryUserV2Swr = useQueryUserV2SwrCore()
    const createBotV2SwrMutation = useCreateBotV2SwrMutationCore()
    const requestSignInOtpSwrMutation = useRequestSignInOtpSwrMutationCore()
    const verifySignInOtpSwrMutation = useVerifySignInOtpSwrMutationCore()
    const enableMFASwrMutation = useEnableMFASwrMutationCore()
    const requestSend2FactorOtpSwrMutation = useRequestSend2FactorOtpSwrMutationCore()
    const backupBotPrivateKeySwrMutation = useBackupBotPrivateKeySwrMutationCore()
    const backupBotPrivateKeyV2SwrMutation = useBackupBotPrivateKeyV2SwrMutationCore()
    const queryTotpSecretSwrMutation = useQueryTotpSecretSwrMutationCore()
    const createBotSwrMutation = useCreateBotSwrMutationCore()
    const toggleBotSwrMutation = useToggleBotSwrMutationCore()
    const queryPositionsV2Swr = useQueryPositionsV2SwrCore()
    const queryTransactionsV2Swr = useQueryTransactionsV2SwrCore()
    const queryFundingSnapshotV2Swr = useQueryFundingSnapshotV2SwrCore()
    const queryHistoryV2Swr = useQueryHistoryV2SwrCore()
    const toggleBotV2SwrMutation = useToggleBotV2SwrMutationCore()
    const updateBotLiquidityPoolsV2SwrMutation = useUpdateBotLiquidityPoolsV2SwrMutationCore()
    const updateBotSettingsV2SwrMutation = useUpdateBotSettingsV2SwrMutationCore()
    const queryFeesV2Swr = useQueryFeesV2SwrCore()
    const queryReservesV2Swr = useQueryReservesV2SwrCore()
    const queryLiquidityPoolsActivePositionSwr = useQueryLiquidityPoolsActivePositionSwrCore()
    const queryLiquidityPoolsBotSwr = useQueryLiquidityPoolsBotSwrCore()
    const queryLiquidityPoolsUpdatePoolsSwr = useQueryLiquidityPoolsUpdatePoolsSwrCore()
    const queryLiquidityPoolsSelectPoolsSwr = useQueryLiquidityPoolsSelectPoolsSwrCore()
    const queryBotsV2Swr = useQueryBotsV2SwrCore()
    const queryBotV2Swr = useQueryBotV2SwrCore()
    const queryLiquidityPoolsSelectedPoolsSwr = useQueryLiquidityPoolsSelectedPoolsSwrCore()
    const queryPositionsSwr = useQueryPositionsSwrCore()    
    const queryTransactionsSwr = useQueryTransactionsSwrCore()

    const values = useMemo(() => ({
        queryStaticSwr,
        queryUserV2Swr,
        createBotV2SwrMutation,
        requestSignInOtpSwrMutation,
        verifySignInOtpSwrMutation,
        enableMFASwrMutation,
        requestSend2FactorOtpSwrMutation,
        backupBotPrivateKeySwrMutation,
        backupBotPrivateKeyV2SwrMutation,
        queryTotpSecretSwrMutation,
        queryTransactionsSwr,
        queryPositionsSwr,
        queryPositionsV2Swr,
        queryTransactionsV2Swr,
        createBotSwrMutation,
        toggleBotSwrMutation,
        queryFeesV2Swr,
        queryReservesV2Swr,
        queryFundingSnapshotV2Swr,
        queryHistoryV2Swr,
        toggleBotV2SwrMutation,
        updateBotLiquidityPoolsV2SwrMutation,
        updateBotSettingsV2SwrMutation,
        queryLiquidityPoolsActivePositionSwr,
        queryLiquidityPoolsBotSwr,
        queryLiquidityPoolsUpdatePoolsSwr,
        queryLiquidityPoolsSelectPoolsSwr,
        queryBotsV2Swr,
        queryBotV2Swr,
        queryLiquidityPoolsSelectedPoolsSwr,
    }), [
        queryStaticSwr,
        queryUserV2Swr,
        createBotV2SwrMutation,
        requestSignInOtpSwrMutation,
        verifySignInOtpSwrMutation,
        enableMFASwrMutation,
        requestSend2FactorOtpSwrMutation,
        backupBotPrivateKeySwrMutation,
        backupBotPrivateKeyV2SwrMutation,
        queryTotpSecretSwrMutation,
        queryTransactionsSwr,
        queryPositionsSwr,
        queryPositionsV2Swr,
        queryTransactionsV2Swr,
        createBotSwrMutation,
        toggleBotSwrMutation,
        queryFeesV2Swr,
        queryReservesV2Swr,
        queryFundingSnapshotV2Swr,
        queryHistoryV2Swr,
        toggleBotV2SwrMutation,
        updateBotLiquidityPoolsV2SwrMutation,
        updateBotSettingsV2SwrMutation,
        queryLiquidityPoolsActivePositionSwr,
        queryLiquidityPoolsBotSwr,
        queryLiquidityPoolsUpdatePoolsSwr,
        queryLiquidityPoolsSelectPoolsSwr,
        queryBotsV2Swr,
        queryBotV2Swr,
        queryLiquidityPoolsSelectedPoolsSwr,
        queryPositionsSwr,
        queryPositionsV2Swr,
        queryTransactionsSwr,
    ])
    return (
        <SwrContext.Provider
            value={values}
        >
            {children}
        </SwrContext.Provider>
    )
}
