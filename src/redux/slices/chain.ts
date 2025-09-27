import { NetworkId } from "@/common"
import { createSlice } from "@reduxjs/toolkit"


export interface ChainSlice {
    networkId: NetworkId
}

const initialState: ChainSlice = {
    networkId: NetworkId.Testnet,
}

export const chainSlice = createSlice({
    name: "chain",
    initialState,
    reducers: {
        setNetworkId: (state, action) => {
            state.networkId = action.payload
        },
    },
})

export const chainReducer = chainSlice.reducer
export const { setNetworkId } = chainSlice.actions