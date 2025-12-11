import { iconAssetConfig } from "@/assets"
import { ChainId } from "../types"

export interface ChainMetadata {
    name: string
    iconUrl: string
    description: string
}

export const supportedChains = (): Array<ChainId> => ([
    ChainId.Solana,
    ChainId.Sui,
])

export const getChainMetadata = (chainId: ChainId): ChainMetadata => {
    switch (chainId) {
    case ChainId.Solana:
        return {
            name: "Solana",
            iconUrl: iconAssetConfig().icon.tokens.solana.png,
            description: "Solana's high trading volume enables more frequent yield opportunities. Select Solana if you want a more stable farming experience.",
        }
    case ChainId.Monad:
        return {
            name: "Monad",
            iconUrl: iconAssetConfig().icon.tokens.ethereum.svg,
            description: "Sui offers more frequent yield opportunities driven by strong incentives. Choose Sui if you want to take advantage of incentive-based burst farming.",
        }
    case ChainId.Bsc:
        return {
            name: "BSC",
            iconUrl: iconAssetConfig().icon.tokens.bnb.svg,
            description: "BSC is a high-performance blockchain platform that enables fast and secure transactions.",
        }
    case ChainId.Sui:
        return {
            name: "Sui",
            iconUrl: iconAssetConfig().icon.tokens.sui.svg,
            description: "Sui is a high-performance blockchain platform that enables fast and secure transactions.",
        }
    default:
        throw new Error("Chain not supported")
    }
}