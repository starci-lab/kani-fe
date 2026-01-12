import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BotSchema, DexId, PositionSchema, TransactionSchema } from "@/modules/types"
import { QueryHistoryResponse } from "@/modules"
import { ChartInterval, ChartUnit, LiquidityPools2SortBy } from "@/modules/api"

export enum BotTab {
    Overview = "overview",
    Wallet = "wallet",
    Activity = "activity",
    Settings = "settings",
}

export type UpdatePoolsFilters = Partial<{
    dexIds?: Array<DexId>
    sortBy?: LiquidityPools2SortBy
    asc?: boolean
    watchlist?: boolean
    pageNumber?: number
    incentivized?: boolean
    liquidityPools?: Array<string>
}>

export type TransactionsFilters = Partial<{
    pageNumber?: number
}>

export type PositionsFilters = Partial<{
    pageNumber?: number
}>

export interface TransactionsPages {
    currentPage: number
    totalPages: number
}

export interface PositionsPages {
    currentPage: number
    totalPages: number
}
export interface BotSlice {
    id?: string
    bot?: BotSchema
    tab: BotTab
    transactions?: Array<TransactionSchema>
    transactionsCursor?: string
    positions?: Array<PositionSchema>
    positionsCursor?: string
    chartInterval: ChartInterval
    chartUnit?: ChartUnit
    historyResponse?: QueryHistoryResponse
    selectedPosition?: PositionSchema
    bots?: Array<BotSchema>
    pageNumber?: number
    updatePoolsFilters: UpdatePoolsFilters
    transactionsFilters: TransactionsFilters
    positionsFilters: PositionsFilters
    transactionsPages: TransactionsPages
    positionsPages: PositionsPages
}

const initialState: BotSlice = {
    tab: BotTab.Wallet,
    chartInterval: ChartInterval.OneHour,
    updatePoolsFilters: {
        asc: false,
        sortBy: LiquidityPools2SortBy.Apr,
        pageNumber: 1,
        watchlist: false,
        incentivized: false,
    },
    transactionsFilters: {
        pageNumber: 1,
    },
    positionsFilters: {
        pageNumber: 1,
    },
    transactionsPages: {
        currentPage: 1,
        totalPages: 1,
    },
    positionsPages: {
        currentPage: 1,
        totalPages: 1,
    },
}

export const botSlice = createSlice({
    name: "bot",
    initialState,
    reducers: {
        setBotId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
        setBot: (state, action: PayloadAction<BotSchema>) => {
            state.bot = action.payload
        },
        setBotTab: (state, action: PayloadAction<BotTab>) => {
            state.tab = action.payload
        },
        setTransactions: (state, action: PayloadAction<Array<TransactionSchema>>) => {
            state.transactions = action.payload
        },
        setTransactionsCursor: (state, action: PayloadAction<string>) => {
            state.transactionsCursor = action.payload
        },
        setPositions: (state, action: PayloadAction<Array<PositionSchema>>) => {
            state.positions = action.payload
        },
        setPositionsCursor: (state, action: PayloadAction<string>) => {
            state.positionsCursor = action.payload
        },
        setTransactionsPages: (state, action: PayloadAction<Partial<TransactionsPages>>) => {
            // update partial pages
            state.transactionsPages = {
                ...state.transactionsPages,
                ...action.payload
            }
        },
        setPositionsPages: (state, action: PayloadAction<Partial<PositionsPages>>) => {
            // update partial pages
            state.positionsPages = {
                ...state.positionsPages,
                ...action.payload
            }
        },
        setSelectedPosition: (state, action: PayloadAction<PositionSchema>) => {
            state.selectedPosition = action.payload
        },
        setChartInterval: (state, action: PayloadAction<ChartInterval>) => {
            state.chartInterval = action.payload
        },
        setChartUnit: (state, action: PayloadAction<ChartUnit>) => {
            state.chartUnit = action.payload
        },
        setHistoryResponse: (state, action: PayloadAction<QueryHistoryResponse>) => {
            state.historyResponse = action.payload
        },
        setBots: (state, action: PayloadAction<Array<BotSchema>>) => {
            state.bots = action.payload
        },
        setBotsPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
        setUpdatePoolsFilters: (state, action: PayloadAction<UpdatePoolsFilters>) => {
            // update partial filters
            state.updatePoolsFilters = {
                ...state.updatePoolsFilters,
                ...action.payload
            }
        },
        setBotIsExitToUsdc: (state, action: PayloadAction<boolean>) => {
            if (state.bot) {
                state.bot = {
                    ...state.bot,
                    isExitToUsdc: action.payload,
                }
            }
        },
        setTransactionsFilters: (state, action: PayloadAction<TransactionsFilters>) => {
            state.transactionsFilters = action.payload
        },
        setPositionsFilters: (state, action: PayloadAction<PositionsFilters>) => {
            state.positionsFilters = action.payload
        },
    },
})

export const botReducer = botSlice.reducer
export const { 
    setBotId, 
    setBot, 
    setBotTab, 
    setTransactions, 
    setTransactionsCursor,
    setTransactionsFilters,
    setPositions,
    setPositionsCursor,
    setTransactionsPages,
    setPositionsFilters,
    setPositionsPages,
    setSelectedPosition,
    setChartInterval,
    setChartUnit,
    setHistoryResponse,
    setBots,
    setBotsPageNumber,
    setUpdatePoolsFilters,
    setBotIsExitToUsdc
} = botSlice.actions