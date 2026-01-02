import { CookieKey, LocalStorageKey, removeCookie, removeLocalStorageItem } from "@/modules/storages"
import { LiquidityProvisionBotSchema, UserSchema } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SessionSlice {
    user?: UserSchema
    accessToken?: string
    liquidityProvisionBot?: LiquidityProvisionBotSchema
}

const initialState: SessionSlice = {
    accessToken: undefined,
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
        setLiquidityProvisionBot: (state, action: PayloadAction<LiquidityProvisionBotSchema>) => {
            state.liquidityProvisionBot = action.payload
        },
        signOut: (state) => {
            // remove all data from session
            removeLocalStorageItem(LocalStorageKey.AccessToken)
            // remove the refresh token from cookie
            removeCookie(CookieKey.RefreshToken)
            // remove the user from state
            state.user = undefined
            // remove the access token from state
            state.accessToken = undefined
            // remove the liquidity provision bot from state
            state.liquidityProvisionBot = undefined
        },
    },
})

export const sessionReducer = sessionSlice.reducer
export const { setUser, setAccessToken, setLiquidityProvisionBot, signOut } = sessionSlice.actions