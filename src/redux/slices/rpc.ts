import { Network, ChainId } from "@/modules/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface RpcUrl {
    id: string
    name: string
    url: string
    selected: boolean
}

export const CUSTOM_RPC_ID = "custom"
export const DEFAULT_RPC_ID = "default"

export interface RpcSlice {
    rpcs: Partial<Record<ChainId, Partial<Record<Network, Array<RpcUrl>>>>>
}

const initialState: RpcSlice = {
    rpcs: {
        [ChainId.Sui]: {
            [Network.Testnet]: [
                {
                    id: DEFAULT_RPC_ID,
                    name: "Sui Testnet",
                    url: "https://fullnode.testnet.sui.io:443",
                    selected: true,
                },
            ],
            [Network.Mainnet]: [
                {
                    id: DEFAULT_RPC_ID,
                    name: "Sui Mainnet",
                    url: "https://fullnode.mainnet.sui.io:443",
                    selected: true,
                },
            ],
        },
    },
}

export const rpcSlice = createSlice({
    name: "rpc",
    initialState,
    reducers: {
        setCustomRpc: (
            state,
            action: PayloadAction<{ chainId: ChainId; network: Network; rpc: RpcUrl }>
        ) => {
            const { chainId, network, rpc } = action.payload

            // Ensure the chainId exists
            if (!state.rpcs[chainId]) {
                state.rpcs[chainId] = {}
            }

            // Ensure the network exists for this chainId
            if (!state.rpcs[chainId]![network]) {
                state.rpcs[chainId]![network] = []
            }

            const rpcList = state.rpcs[chainId]![network]!

            // Replace existing RPC with the same ID, or add a new one
            const existingIndex = rpcList.findIndex((item) => item.id === rpc.id)
            if (existingIndex !== -1) {
                rpcList[existingIndex] = rpc
            } else {
                rpcList.push(rpc)
            }
        },
    },
})

export const rpcReducer = rpcSlice.reducer
export const { setCustomRpc } = rpcSlice.actions