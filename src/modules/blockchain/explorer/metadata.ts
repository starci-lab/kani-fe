import { ExplorerId } from "@/modules/blockchain"
import { ChainId } from "@/modules/types"

export interface ExplorerMetadata {
    name: string
    url: string
    recommended: boolean
    chainId: ChainId
    explorerId: ExplorerId
}

// a method to get the explorer metadata
// for rendering the explorer in the UI
// we do not need to store the metadata in the database
export const getExplorerMetadata = (
    explorerId: ExplorerId
): ExplorerMetadata => {
    switch (explorerId) {
    case ExplorerId.SuiVision:
        return {
            name: "SuiVision",
            url: "https://suivision.xyz/",
            chainId: ChainId.Sui,
            recommended: true,
            explorerId: ExplorerId.SuiVision,
        }
    case ExplorerId.SuiScan:
        return {
            name: "SuiScan",
            url: "https://suiscan.xyz",
            chainId: ChainId.Sui,
            recommended: true,
            explorerId: ExplorerId.SuiScan,
        }
    case ExplorerId.SolanaExplorer:
        return {
            name: "SolanaExplorer",
            url: "https://solanaexplorer.xyz",
            chainId: ChainId.Solana,
            recommended: true,
            explorerId: ExplorerId.SolanaExplorer,
        }
    case ExplorerId.SolanaFM:
        return {
            name: "SolanaFM",
            url: "https://solanafm.xyz",
            chainId: ChainId.Solana,
            recommended: true,
            explorerId: ExplorerId.SolanaFM,
        }
    case ExplorerId.Solscan:
        return {
            name: "Solscan",
            url: "https://solscan.io",
            chainId: ChainId.Solana,
            recommended: true,
            explorerId: ExplorerId.Solscan,
        }
    default:
        throw new Error(`Unsupported explorerId: ${explorerId}`)
    }   
}