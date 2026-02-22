import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import BN from "bn.js"
import { Dayjs } from "dayjs"

export interface SnapshotCacheResult {
    snapshotAt: Dayjs
}

export interface DynamicClmmRewardInfo {
    tokenAddress: string
    emissionPerSecond: BN
    growthGlobal: BN
    vaultAddress?: string
}

export interface DynamicClmmLiquidityPoolInfoCacheResult extends SnapshotCacheResult {
    tickCurrent: BN
    liquidity: BN
    sqrtPriceX64: BN
    rewards: Array<DynamicClmmRewardInfo>
    feeGrowthGlobalA: BN
    feeGrowthGlobalB: BN
}

export interface DynamicDlmmRewardInfo {
    tokenAddress: string
    vault: string
    funder: string
    rewardDuration: BN
    rewardDurationEnd: BN
    rewardRate: BN
    lastUpdateTime: BN
    cumulativeSecondsWithEmptyLiquidityReward: BN
}

export interface DynamicDlmmLiquidityPoolInfoCacheResult extends SnapshotCacheResult {
    activeId: BN
    rewards: Array<DynamicDlmmRewardInfo>
}

export type DynamicLiquidityPoolInfoCacheResult = DynamicClmmLiquidityPoolInfoCacheResult | DynamicDlmmLiquidityPoolInfoCacheResult

export type PublicationDynamicLiquidityPoolInfo = DynamicLiquidityPoolInfoCacheResult

export interface PublicationDynamicLiquidityPoolsInfoEventPayload {
    results: Record<string, PublicationDynamicLiquidityPoolInfo>
}

// Publication price
export interface PublicationPrice {
    price: number
}

export interface PublicationPriceEventPayload {
    results: Record<string, PublicationPrice>
}

export interface SubscribeDynamicLiquidityPoolsInfoEventPayload {
    ids: Array<string>
}

export interface SubscribePricesEventPayload {
    ids: Array<string>
}

// Publication price
export interface PublicationPrice {
    price: number
}

// Publication price event payload
export interface PublicationPriceEventPayload {
    results: Record<string, PublicationPrice>
}

// Received token
export interface ReceivedToken {
    id: string
    amount: string
}

// Publication confirm withdrawal
export interface PublicationConfirmWithdrawal {
    botId: string
    txHashes: Array<string>
    receivedTokens: Array<ReceivedToken>
}

// Set confirm withdrawal payload
export interface SetConfirmWithdrawalPayload {
    botId: string
    txHashes: Array<string>
    receivedTokens: Array<ReceivedToken>
}

export interface SocketSlice {
    dynamicLiquidityPoolInfos: Record<string, DynamicLiquidityPoolInfoCacheResult>
    prices: Record<string, PublicationPrice>
    liquidityPoolIds: Array<string>
    tokenIds: Array<string>
    confirmWithdrawal?: PublicationConfirmWithdrawal
    showWithdrawalExecuting: boolean
}

// Set dynamic liquidity pool info payload
export interface SetDynamicLiquidityPoolInfoPayload {
    id: string
    dynamicLiquidityPoolInfo: DynamicLiquidityPoolInfoCacheResult
}

// Set price payload
export interface SetPricePayload {
    id: string
    price: PublicationPrice
}


const initialState: SocketSlice = {
    dynamicLiquidityPoolInfos: {},
    prices: {},
    liquidityPoolIds: [],
    tokenIds: [],
    showWithdrawalExecuting: false,
}

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setDynamicLiquidityPoolInfos: (state, action: PayloadAction<Record<string, DynamicLiquidityPoolInfoCacheResult>>) => {
            state.dynamicLiquidityPoolInfos = action.payload
        },
        setPrices: (state, action: PayloadAction<Record<string, PublicationPrice>>) => {
            state.prices = action.payload
        },
        setDynamicLiquidityPoolInfo: (state, action: PayloadAction<SetDynamicLiquidityPoolInfoPayload>) => {
            state.dynamicLiquidityPoolInfos[action.payload.id] = action.payload.dynamicLiquidityPoolInfo
        },
        setPrice: (state, action: PayloadAction<SetPricePayload>) => {
            state.prices[action.payload.id] = action.payload.price
        },
        setSocketLiquidityPoolIds: (state, action: PayloadAction<Array<string>>) => {
            state.liquidityPoolIds = action.payload
        },
        setSocketTokenIds: (state, action: PayloadAction<Array<string>>) => {
            state.tokenIds = action.payload
        },
        addSocketLiquidityPoolId: (state, action: PayloadAction<string>) => {
            state.liquidityPoolIds.push(action.payload)
        },
        addSocketTokenId: (state, action: PayloadAction<string>) => {
            state.tokenIds.push(action.payload)
        },
        removeSocketLiquidityPoolId: (state, action: PayloadAction<string>) => {
            state.liquidityPoolIds = state.liquidityPoolIds.filter(id => id !== action.payload)
        },
        removeSocketTokenId: (state, action: PayloadAction<string>) => {
            state.tokenIds = state.tokenIds.filter(id => id !== action.payload)
        },
        setConfirmWithdrawal: (state, action: PayloadAction<SetConfirmWithdrawalPayload>) => {
            state.confirmWithdrawal = action.payload
        },
        setShowWithdrawalExecuting: (state, action: PayloadAction<boolean>) => {
            state.showWithdrawalExecuting = action.payload
        },
    },
})
export const socketReducer = socketSlice.reducer
export const { 
    setDynamicLiquidityPoolInfos, 
    setPrices, 
    setDynamicLiquidityPoolInfo, 
    setPrice,
    setSocketLiquidityPoolIds,
    setSocketTokenIds,
    addSocketLiquidityPoolId,
    addSocketTokenId,
    removeSocketLiquidityPoolId,
    removeSocketTokenId,
    setConfirmWithdrawal,
    setShowWithdrawalExecuting,
} = socketSlice.actions
