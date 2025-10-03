import { ChainId, Network } from "@/modules/types"
import { SuiClient } from "@mysten/sui/client"
import BN from "bn.js"

export interface FetchSuiBalanceProps {
    tokenAddress: string
    owner: string
    chainId: ChainId
    network: Network
    client: SuiClient
    decimals: number
}

export interface FetchBalanceResponse {
    balanceRaw: BN
    balance: number
}