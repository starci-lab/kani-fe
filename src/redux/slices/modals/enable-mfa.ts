import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum EnableMFAPage {
    Base = "base",
    ScanQR = "scanQR",
    ConfirmTOTP = "confirmTOTP",
}
export interface EnableMFAModalSlice {
    page: EnableMFAPage
}

const initialState: EnableMFAModalSlice = {
    page: EnableMFAPage.Base,
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