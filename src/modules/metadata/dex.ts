import { iconAssetConfig } from "@/assets"
import { ChainId, DexId } from "../types"

export interface DexMetadata {
    name: string
    iconUrl: string
    description: string
}

export const supportedDexes = (): Array<DexId> => ([
    DexId.Cetus,
    DexId.Turbos,
    DexId.Momentum,
    DexId.FlowX,
    DexId.Meteora,
    DexId.Raydium,
    DexId.Orca,
])

export const getDexMetadata = (dexId: DexId): DexMetadata => {
    switch (dexId) {
    case DexId.Cetus:
        return {
            name: "Cetus",
            iconUrl: iconAssetConfig().icon.tokens.solana.png,
            description: "Solana's high trading volume enables more frequent yield opportunities. Select Solana if you want a more stable farming experience.",
        }
    case DexId.Turbos:
        return {
            name: "Turbos",
            iconUrl: iconAssetConfig().icon.tokens.turbos.svg,
            description: "Turbos is a high-performance blockchain platform that enables fast and secure transactions.",
        }
    case DexId.Momentum:
        return {
            name: "Momentum",
            iconUrl: iconAssetConfig().icon.tokens.momentum.svg,
            description: "Momentum is a high-performance blockchain platform that enables fast and secure transactions.",
        }
    case DexId.FlowX:
        return {
            name: "FlowX",
            iconUrl: iconAssetConfig().icon.tokens.sui.svg,
            description: "Sui is a high-performance blockchain platform that enables fast and secure transactions.",
        }
    case DexId.Meteora:
        return {
            name: "Meteora",
            iconUrl: iconAssetConfig().icon.tokens.meteora.svg,
            description: "Meteora is a high-performance blockchain platform that enables fast and secure transactions.",
        }
    case DexId.Raydium:
        return {
            name: "Raydium",
            iconUrl: iconAssetConfig().icon.tokens.raydium.svg,
            description: "Raydium is a high-performance blockchain platform that enables fast and secure transactions.",
        }
    case DexId.Orca:
        return {
            name: "Orca",
            iconUrl: iconAssetConfig().icon.tokens.orca.svg,
            description: "Orca is a high-performance blockchain platform that enables fast and secure transactions.",
        }
    default:
        throw new Error("Chain not supported")
    }
}