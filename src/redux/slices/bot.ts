import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BotSchema } from "@/modules/types"

export interface BotSlice {
    id?: string
    bot?: BotSchema
}

const initialState: BotSlice = {
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
    },
})

export const botReducer = botSlice.reducer
export const { setBotId, setBot } = botSlice.actions