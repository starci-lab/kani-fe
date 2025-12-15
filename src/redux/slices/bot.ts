import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BotSchema } from "@/modules/types"

export enum BotTab {
    Investment = "investment",
    Wallet = "wallet",
}

export interface BotSlice {
    id?: string
    bot?: BotSchema
    tab: BotTab
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
    },
})

export const botReducer = botSlice.reducer
export const { setBotId, setBot, setBotTab } = botSlice.actions