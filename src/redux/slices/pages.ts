
import { createSlice } from "@reduxjs/toolkit"


export enum EnableTOTPCardPage {
    ScanTOTP = "scanTOTP",
    VerifyTOTP = "verifyTOTP",
}

export enum SetupLiquidityProvisionBotCardPage {
    SelectYieldToken = "selectYieldToken",
    SelectLiquidityPools = "selectLiquidityPools",
    Continue = "continue",
}

export interface PageSlice {
    enableTOTPCard: EnableTOTPCardPage
    setupLiquidityProvisionBotCard: SetupLiquidityProvisionBotCardPage
}

const initialState: PageSlice = {
    enableTOTPCard: EnableTOTPCardPage.ScanTOTP,
    setupLiquidityProvisionBotCard: SetupLiquidityProvisionBotCardPage.SelectYieldToken,
}

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setEnableTOTPCard: (state, action) => {
            state.enableTOTPCard = action.payload
        },
        setSetupLiquidityProvisionBotCard: (state, action) => {
            state.setupLiquidityProvisionBotCard = action.payload
        },
    },
})

export const pageReducer = pageSlice.reducer
export const { setEnableTOTPCard, setSetupLiquidityProvisionBotCard } = pageSlice.actions