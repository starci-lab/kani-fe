import { UserSchema } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SessionSlice {
    user?: UserSchema
    totpVerified: boolean
}

const initialState: SessionSlice = {
    totpVerified: false,
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSchema>) => {
            state.user = action.payload
        },
        setTotpVerified: (state, action: PayloadAction<boolean>) => {
            state.totpVerified = action.payload
        },
    },
})

export const sessionReducer = sessionSlice.reducer
export const { setUser, setTotpVerified } = sessionSlice.actions