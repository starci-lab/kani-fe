import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum BotDisplayMode {
    List = "list",
    Grid = "grid",
}

export interface BotsPageSlice {
    displayMode: BotDisplayMode
}

const initialState: BotsPageSlice = {
    displayMode: BotDisplayMode.List,
}

export const botsSlice = createSlice({
    name: "bots",
    initialState,
    reducers: {
        setDisplayMode: (state, action: PayloadAction<BotDisplayMode>) => {
            state.displayMode = action.payload
        },
    },
})

export const botsReducer = botsSlice.reducer
export const { setDisplayMode } = botsSlice.actions