import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum ManageMFASettingsPage {
    Base = "base",
    ScanQR = "scanQR",
    ConfirmTOTP = "confirmTOTP",
    ConfirmDisable = "confirmDisable",
}
export interface EnableMFAModalSlice {
    page: ManageMFASettingsPage
}

const initialState: EnableMFAModalSlice = {
    page: ManageMFASettingsPage.Base,
}

export const enableMFAModalSlice = createSlice({
    name: "enableMFAModal",
    initialState,
    reducers: {
        setManageMFASettingsPage: (state, action: PayloadAction<ManageMFASettingsPage>) => {
            state.page = action.payload
        },
    },
})

export const enableMFAModalReducer = enableMFAModalSlice.reducer
export const { setManageMFASettingsPage } = enableMFAModalSlice.actions