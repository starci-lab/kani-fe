import { TokenSchema, LiquidityPoolSchema, DexSchema, ConfigSchema } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface StaticSlice {
    tokens: Array<TokenSchema>
    liquidityPools: Array<LiquidityPoolSchema>
    dexes: Array<DexSchema>
    config?: ConfigSchema
}

const initialState: StaticSlice = {
    tokens: [],
    liquidityPools: [],
    dexes: [],
}

export const staticSlice = createSlice({
    name: "static",
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Array<TokenSchema>>) => {
            state.tokens = action.payload
        },
        setLiquidityPools: (state, action: PayloadAction<Array<LiquidityPoolSchema>>) => {
            state.liquidityPools = action.payload
        },
        setDexes: (state, action: PayloadAction<Array<DexSchema>>) => {
            state.dexes = action.payload
        },
        setConfig: (state, action: PayloadAction<ConfigSchema>) => {
            state.config = action.payload
        },
    },
})

export const staticReducer = staticSlice.reducer
export const { setTokens, setLiquidityPools, setDexes, setConfig } = staticSlice.actions