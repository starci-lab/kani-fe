import { ChainId, PlatformId } from "../types/blockchain"

export const chainIdToPlatformId: Record<ChainId, PlatformId> = {
    [ChainId.Aptos]: PlatformId.Aptos,
    [ChainId.Solana]: PlatformId.Solana,
    [ChainId.Sui]: PlatformId.Sui,
    [ChainId.Base]: PlatformId.Evm,
}

export const platformIdToChainId = Object.fromEntries(
    Object.entries(chainIdToPlatformId).map(([chainId, platformId]) => [
        platformId,
        chainId,
    ])
)
