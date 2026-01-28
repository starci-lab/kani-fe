import { ChainId, Network } from "@/modules/types"
import { SuiClient } from "@mysten/sui/client"
import BN from "bn.js"
import Decimal from "decimal.js"

export interface FetchSuiBalanceProps {
    tokenAddress: string
    owner: string
    chainId: ChainId
    network: Network
    client: SuiClient
    decimals: Decimal
}

export interface FetchBalanceResponse {
    balanceRaw: BN
    balance: Decimal
}