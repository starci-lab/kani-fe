import { ChainId } from "../types"
import { iconAssetConfig } from "@/assets"

export interface Metadata {
    name: string
    iconUrl: string
}

export const getMetadata = (chainId: ChainId) => {
    switch (chainId) {
    case ChainId.Solana:
        return {
            name: "Solana",
            iconUrl: iconAssetConfig().icon.tokens.solana.png,
        }
    case ChainId.Monad:
        return {
            name: "Monad",
            iconUrl: iconAssetConfig().icon.tokens.ethereum.svg,
        }
    case ChainId.Bsc:
        return {
            name: "Bsc",
            iconUrl: iconAssetConfig().icon.tokens.bnb.svg,
        }
    case ChainId.Sui:
        return {
            name: "Sui",
            iconUrl: iconAssetConfig().icon.tokens.sui.svg,
        }
    default:
        throw new Error("Chain not supported")
    }
}   