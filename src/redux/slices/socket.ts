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

export interface PublicationPrice {
    price: number
}

export interface PublicationPriceEventPayload {
    results: Record<string, PublicationPrice>
}


export interface SocketSlice {
    dynamicLiquidityPoolInfos: Record<string, DynamicLiquidityPoolInfoCacheResult>
    prices: Record<string, PublicationPrice>
}

const initialState: SocketSlice = {
    dynamicLiquidityPoolInfos: {},
    prices: {},
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
    },
})
export const socketReducer = socketSlice.reducer
export const { 
    setDynamicLiquidityPoolInfos, 
    setPrices, 
    setDynamicLiquidityPoolInfo, 
    setPrice,
} = socketSlice.actions

export interface SetDynamicLiquidityPoolInfoPayload {
    id: string
    dynamicLiquidityPoolInfo: DynamicLiquidityPoolInfoCacheResult
}

export interface SetPricePayload {
    id: string
    price: PublicationPrice
}