import { ChainId, Network } from "@/modules/types"

export interface FetchSuiBalanceProps {
    tokenAddress: string
    chainId: ChainId
    network: Network
}