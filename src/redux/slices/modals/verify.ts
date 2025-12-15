import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum VerifyPage {
    Base = "base",
    Email = "email",
    AuthenticatorApp = "authenticatorApp",
}
export interface VerifyModalSlice {
    page: VerifyPage
}

const initialState: VerifyModalSlice = {
    page: VerifyPage.Base,
}

    
export const verifyModalSlice = createSlice({
    name: "verify",
    initialState,
    reducers: {
        setVerifyModalPage: (state, action: PayloadAction<VerifyPage>) => {
            state.page = action.payload
        },
    },
})

export const verifyModalReducer = verifyModalSlice.reducer
export const { setVerifyModalPage } = verifyModalSlice.actions