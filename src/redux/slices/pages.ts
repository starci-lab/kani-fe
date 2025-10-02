
import { createSlice } from "@reduxjs/toolkit"


export enum EnableTOTPCardPage {
    ScanTOTP = "scanTOTP",
    VerifyTOTP = "verifyTOTP",
}

export enum InitializeLiquidityProvisionBotCardPage {
    SelectPriorityToken = "selectPriorityToken",
    SelectLiquidityPools = "selectLiquidityPools",
    ProvideMetadata = "provideMetadata",
}

export interface PageSlice {
    enableTOTPCard: EnableTOTPCardPage
    initializeLiquidityProvisionBotCard: InitializeLiquidityProvisionBotCardPage
}

const initialState: PageSlice = {
    enableTOTPCard: EnableTOTPCardPage.ScanTOTP,
    initializeLiquidityProvisionBotCard: InitializeLiquidityProvisionBotCardPage.SelectPriorityToken,
}

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setEnableTOTPCard: (state, action) => {
            state.enableTOTPCard = action.payload
        },
        setInitializeLiquidityProvisionBotCard: (state, action) => {
            state.initializeLiquidityProvisionBotCard = action.payload
        },
    },
})

export const pageReducer = pageSlice.reducer
export const { setEnableTOTPCard, setInitializeLiquidityProvisionBotCard } = pageSlice.actions