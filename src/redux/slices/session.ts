import { LiquidityProvisionBotSchema, UserSchema } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SessionSlice {
    user?: UserSchema
    accessToken?: string
    totpVerified: boolean
    liquidityProvisionBot?: LiquidityProvisionBotSchema
}

const initialState: SessionSlice = {
    accessToken: undefined,
    totpVerified: true,
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSchema>) => {
            state.user = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        setTotpVerified: (state, action: PayloadAction<boolean>) => {
            state.totpVerified = action.payload
        },
        setLiquidityProvisionBot: (state, action: PayloadAction<LiquidityProvisionBotSchema>) => {
            state.liquidityProvisionBot = action.payload
        },
    },
})

export const sessionReducer = sessionSlice.reducer
export const { setUser, setAccessToken, setTotpVerified, setLiquidityProvisionBot } = sessionSlice.actions