import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SocketSlice {
    tokenPrices: Record<string, number>
}

const initialState: SocketSlice = {
    tokenPrices: {},
}

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setTokenPrices: (state, action: PayloadAction<Record<string, number>>) => {
            state.tokenPrices = action.payload
        },
        setTokenPrice: (state, action: PayloadAction<SetTokenPricePayload>) => {
            state.tokenPrices[action.payload.tokenId] = action.payload.price
        },
    },
})

export interface SetTokenPricePayload {
    tokenId: string
    price: number
}

export const socketReducer = socketSlice.reducer
export const { setTokenPrices, setTokenPrice } = socketSlice.actions