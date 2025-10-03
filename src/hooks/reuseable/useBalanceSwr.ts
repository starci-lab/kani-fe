import { ChainId, TokenId } from "@/modules/types"
import { createSuiClient, fetchSuiBalance } from "@/modules/blockchain"
import { useAppSelector } from "@/redux/hooks"
import useSWR from "swr"

export interface UseBalanceProps {
    tokenId: TokenId
    ownerAddress: string
}

export const useBalanceSwr = ({ tokenId, ownerAddress }: UseBalanceProps) => {
    const tokens = useAppSelector((state) => state.static.tokens)
    const token = tokens.find((token) => token.displayId === tokenId)
    if (!token) {
        throw new Error("Token not found")
    }
    const rpcs = useAppSelector((state) => state.rpc.rpcs[token.chainId]?.[token.network])
    if (!rpcs) {
        throw new Error("RPCs not found")
    }
    const rpc = rpcs.find((rpc) => rpc.selected)
    if (!rpc) {
        throw new Error("RPC not found")
    }

    const swr = useSWR(
        [token.chainId, token.network, token.tokenAddress, ownerAddress],
        () => {
            switch (token.chainId) {
            case ChainId.Sui:
                return fetchSuiBalance({ 
                    tokenAddress: token.tokenAddress, 
                    chainId: token.chainId, 
                    network: token.network,
                    client: createSuiClient(rpc.url),
                    decimals: token.decimals,
                    owner: ownerAddress,
                })
            default:
                throw new Error("Chain not supported")
            }
        }
    )
    return swr
}