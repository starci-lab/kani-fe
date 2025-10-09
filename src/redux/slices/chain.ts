import { Network } from "@/modules/types"
import { createSlice } from "@reduxjs/toolkit"


export interface ChainSlice {
    network: Network
}

const initialState: ChainSlice = {
    network: Network.Testnet,
}

export const chainSlice = createSlice({
    name: "chain",
    initialState,
    reducers: {
        setNetwork: (state, action) => {
            state.network = action.payload
        },
    },
})

export const chainReducer = chainSlice.reducer
export const { setNetwork } = chainSlice.actions