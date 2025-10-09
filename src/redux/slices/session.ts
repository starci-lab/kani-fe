import { LiquidityProvisionBotSchema, UserSchema } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SessionSlice {
    user?: UserSchema
    totpVerified: boolean
    liquidityProvisionBot?: LiquidityProvisionBotSchema
}

const initialState: SessionSlice = {
    totpVerified: true,
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
        setLiquidityProvisionBot: (state, action: PayloadAction<LiquidityProvisionBotSchema>) => {
            state.liquidityProvisionBot = action.payload
        },
    },
})

export const sessionReducer = sessionSlice.reducer
export const { setUser, setTotpVerified, setLiquidityProvisionBot } = sessionSlice.actions