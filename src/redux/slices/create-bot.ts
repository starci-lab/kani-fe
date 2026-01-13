import { LiquidityPoolsSortBy } from "@/modules/api"
import { DexId, TokenId, TokenSchema } from "@/modules/types"
import { createSlice } from "@reduxjs/toolkit"

export type SelectPoolsFilters = Partial<{
    dexIds?: Array<DexId>
    sortBy?: LiquidityPoolsSortBy
    asc?: boolean
    watchlist?: boolean
    pageNumber?: number
    incentivized?: boolean
    liquidityPools?: Array<string>
}>


export interface CreateBotSlice {
    tokenSearchQuery: string
    filteredTokens: Array<TokenSchema>
    selectPoolsFilters: SelectPoolsFilters
    targetTokenId?: TokenId
    quoteTokenId?: TokenId
    liquidityPoolIds?: Array<string>
}

const initialState: CreateBotSlice = {
    tokenSearchQuery: "",
    filteredTokens: [],
    selectPoolsFilters: {
        asc: false,
        sortBy: LiquidityPoolsSortBy.Apr,
        pageNumber: 1,
        watchlist: false,
        incentivized: false,
    },
}

export const createBotSlice = createSlice({
    name: "createBot",
    initialState,
    reducers: {
        setTokenSearchQuery: (state, action) => {
            state.tokenSearchQuery = action.payload
        },
        setFilteredTokens: (state, action) => {
            state.filteredTokens = action.payload
        },
        setSelectPoolsFilters: (state, action) => {
            state.selectPoolsFilters = action.payload
        },
        setTargetTokenId: (state, action) => {
            state.targetTokenId = action.payload
        },
        setQuoteTokenId: (state, action) => {
            state.quoteTokenId = action.payload
        },
        setLiquidityPoolIds: (state, action) => {
            state.liquidityPoolIds = action.payload
        },
    },
})

export const createBotReducer = createBotSlice.reducer
export const { setTokenSearchQuery, setFilteredTokens, setSelectPoolsFilters, setTargetTokenId, setQuoteTokenId, setLiquidityPoolIds } = createBotSlice.actions