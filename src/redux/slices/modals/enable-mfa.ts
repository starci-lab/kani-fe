import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum EnableMFAPage {
    ScanQR = "scanQR",
    InputTOTP = "inputTOTP",
}
export interface EnableMFAModalSlice {
    page: EnableMFAPage
}

const initialState: EnableMFAModalSlice = {
    page: EnableMFAPage.ScanQR,
}

export const enableMFAModalSlice = createSlice({
    name: "enableMFAModal",
    initialState,
    reducers: {
        setEnableMFAPage: (state, action: PayloadAction<EnableMFAPage>) => {
            state.page = action.payload
        },
    },
})

export const enableMFAModalReducer = enableMFAModalSlice.reducer
export const { setEnableMFAPage } = enableMFAModalSlice.actions