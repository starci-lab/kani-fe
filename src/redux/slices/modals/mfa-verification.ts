import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum MFAVerificationPage {
    Base = "base",
    AuthenticatorApp = "authenticatorApp",
}

export interface MFAVerificationModalSlice {
    page: MFAVerificationPage
    onAction: MFAVerificationModalOnActionFn
    isActionPending: boolean
}

export interface MFAVerificationModalOnActionParams {
    totp?: string
}

export type MFAVerificationModalOnActionFn = (
    params: MFAVerificationModalOnActionParams
) => Promise<boolean> | boolean

const initialState: MFAVerificationModalSlice = {
    page: MFAVerificationPage.Base,
    onAction: () => false,
    isActionPending: false,
}

export const mfaVerificationModalSlice = createSlice({
    name: "mfaVerification",
    initialState,
    reducers: {
        setMFAVerificationModalPage: (state, action: PayloadAction<MFAVerificationPage>) => {
            state.page = action.payload
        },
        setMFAVerificationModalOnAction: (
            state,
            action: PayloadAction<MFAVerificationModalOnActionFn>
        ) => {
            state.onAction = action.payload
        },
        setMFAVerificationModalIsActionPending: (state, action: PayloadAction<boolean>) => {
            state.isActionPending = action.payload
        },
    },
})

export const mfaVerificationModalReducer = mfaVerificationModalSlice.reducer
export const { 
    setMFAVerificationModalPage, 
    setMFAVerificationModalOnAction, 
    setMFAVerificationModalIsActionPending 
} = mfaVerificationModalSlice.actions