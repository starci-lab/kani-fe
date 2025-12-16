import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BotSchema, PositionSchema, TransactionSchema } from "@/modules/types"

export enum BotTab {
    Investment = "investment",
    Wallet = "wallet",
    Activity = "activity",
}

export interface BotSlice {
    id?: string
    bot?: BotSchema
    tab: BotTab
    transactions?: Array<TransactionSchema>
    transactionsCursor?: string
    transactionsPage?: number
    positions?: Array<PositionSchema>
    positionsCursor?: string
    positionsPage?: number
    selectedPosition?: PositionSchema
}

const initialState: BotSlice = {
    tab: BotTab.Wallet,
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
        setTransactionsPage: (state, action: PayloadAction<number>) => {
            state.transactionsPage = action.payload
        },
        setPositionsPage: (state, action: PayloadAction<number>) => {
            state.positionsPage = action.payload
        },
        setSelectedPosition: (state, action: PayloadAction<PositionSchema>) => {
            state.selectedPosition = action.payload
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
    setPositions,
    setPositionsCursor,
    setTransactionsPage,
    setPositionsPage,
    setSelectedPosition
} = botSlice.actions