import { ApiAuthRedirect } from "@/modules"
import { createSlice } from "@reduxjs/toolkit"


export interface ApiSlice {
    apiAuthRedirect: ApiAuthRedirect
}

const initialState: ApiSlice = {
    apiAuthRedirect: new ApiAuthRedirect(),
}

export const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        setApiAuthRedirect: (state, action) => {
            state.apiAuthRedirect = action.payload
        },
    },
})

export const apiReducer = apiSlice.reducer
export const { setApiAuthRedirect } = apiSlice.actions