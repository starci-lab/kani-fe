
import { createSlice } from "@reduxjs/toolkit"


export enum EnableTOTPCardPage {
    ScanTOTP = "scanTOTP",
    VerifyTOTP = "verifyTOTP",
}

export interface PageSlice {
    enableTOTPCard: EnableTOTPCardPage
}

const initialState: PageSlice = {
    enableTOTPCard: EnableTOTPCardPage.ScanTOTP,
}

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setEnableTOTPCard: (state, action) => {
            state.enableTOTPCard = action.payload
        },
    },
})

export const pageReducer = pageSlice.reducer
export const { setEnableTOTPCard } = pageSlice.actions