import { UserSchema } from "@/modules/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SessionSlice {
    user?: UserSchema
}

const initialState: SessionSlice = {
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSchema>) => {
            state.user = action.payload
        },
    },
})

export const sessionReducer = sessionSlice.reducer
export const { setUser } = sessionSlice.actions