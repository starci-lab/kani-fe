import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum VerifyPage {
    Base = "base",
    Email = "email",
    AuthenticatorApp = "authenticatorApp",
}
export interface VerifyModalSlice {
    page: VerifyPage
    onAction: VerifyModalOnActionFn
}

export interface VerifyModalOnActionParams {
    emailOtp: string
    totp: string
}

export type VerifyModalOnActionFn = (params: VerifyModalOnActionParams) => Promise<boolean> | boolean

const initialState: VerifyModalSlice = {
    page: VerifyPage.Base,
    onAction: () => false,
}

    
export const verifyModalSlice = createSlice({
    name: "verify",
    initialState,
    reducers: {
        setVerifyModalPage: (state, action: PayloadAction<VerifyPage>) => {
            state.page = action.payload
        },
        setVerifyModalOnAction: (state, action: PayloadAction<VerifyModalOnActionFn>) => {
            state.onAction = action.payload
        },
    },
})

export const verifyModalReducer = verifyModalSlice.reducer
export const { setVerifyModalPage, setVerifyModalOnAction } = verifyModalSlice.actions