import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum SignInPage {
    InputEmail = "inputEmail",
    InputOTP = "inputOTP",
}
export interface SignInModalSlice {
    page: SignInPage
}

const initialState: SignInModalSlice = {
    page: SignInPage.InputEmail,
}

    
export const signInModalSlice = createSlice({
    name: "signIn",
    initialState,
    reducers: {
        setSignInModalPage: (state, action: PayloadAction<SignInPage>) => {
            state.page = action.payload
        },
    },
})

export const signInModalReducer = signInModalSlice.reducer
export const { setSignInModalPage } = signInModalSlice.actions