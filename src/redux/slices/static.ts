import { TokenSchema, LiquidityPoolSchema, DexSchema, AccountLimitsConfig, GasConfig, BalanceConfig } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface StaticSlice {
    tokens: Array<TokenSchema>
    liquidityPools: Array<LiquidityPoolSchema>
    dexes: Array<DexSchema>
    accountLimits?: AccountLimitsConfig
    gasConfig?: GasConfig
    balanceConfig?: BalanceConfig
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
        setAccountLimits: (state, action: PayloadAction<AccountLimitsConfig>) => {
            state.accountLimits = action.payload
        },
        setGasConfig: (state, action: PayloadAction<GasConfig>) => {
            state.gasConfig = action.payload
        },
        setBalanceConfig: (state, action: PayloadAction<BalanceConfig>) => {
            state.balanceConfig = action.payload
        },
    },
})

export const staticReducer = staticSlice.reducer
export const { setTokens, setLiquidityPools, setDexes, setAccountLimits, setGasConfig, setBalanceConfig } = staticSlice.actions