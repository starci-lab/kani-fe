import { CookieKey, LocalStorageKey, removeCookie, removeLocalStorageItem } from "@/modules/storages"
import { UserSchema } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SessionSlice {
    user?: UserSchema
    accessToken?: string
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
        signOut: (state) => {
            // remove all data from session
            removeLocalStorageItem(LocalStorageKey.AccessToken)
            // remove the refresh token from cookie
            removeCookie(CookieKey.RefreshToken)
            // remove the user from state
            state.user = undefined
            // remove the access token from state
            state.accessToken = undefined
        },
    },
})

export const sessionReducer = sessionSlice.reducer
export const { setUser, setAccessToken, signOut } = sessionSlice.actions