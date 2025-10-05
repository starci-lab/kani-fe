import { LiquidityPoolId, LiquidityPoolSchema, TokenId, TokenSchema } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import BN from "bn.js"

export interface FetchedPool {
    poolAddress: string
    displayId: LiquidityPoolId
    currentTick: number
    currentSqrtPrice: BN
    tickSpacing: number
    liquidityPool: LiquidityPoolSchema
    token0: TokenSchema
    token1: TokenSchema
    liquidity: BN
    fee: number
    rewardTokens: Array<TokenSchema>
}

export interface SocketSlice {
    tokenPrices: Partial<Record<TokenId, number>>
    liquidityPools: Partial<Record<LiquidityPoolId, FetchedPool>>
}

const initialState: SocketSlice = {
    tokenPrices: {},
    liquidityPools: {},
}

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setTokenPrices: (state, action: PayloadAction<Record<TokenId, number>>) => {
            state.tokenPrices = action.payload
        },
        setTokenPrice: (state, action: PayloadAction<SetTokenPricePayload>) => {
            state.tokenPrices[action.payload.tokenId] = action.payload.price
        },
        setLiquidityPools: (state, action: PayloadAction<Record<LiquidityPoolId, FetchedPool>>) => {
            state.liquidityPools = action.payload
        },
        setLiquidityPool: (state, action: PayloadAction<SetLiquidityPoolPayload>) => {
            state.liquidityPools[action.payload.liquidityPoolId] = action.payload.fetchedPool
        },
    },
})

export interface SetTokenPricePayload {
    tokenId: TokenId
    price: number
}

export interface SetLiquidityPoolPayload {
    liquidityPoolId: LiquidityPoolId
    fetchedPool: FetchedPool
}

export const socketReducer = socketSlice.reducer
export const { 
    setTokenPrices, 
    setTokenPrice, 
    setLiquidityPools 
} = socketSlice.actions