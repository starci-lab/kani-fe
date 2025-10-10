import { ChainId } from "@/modules/types"

// Type of explorer URL we want to generate
export enum ExplorerUrlType {
    AccountAddress = "accountAddress",
    Transaction = "transaction",
}

// Supported explorer providers
export enum ExplorerId {
    // SUI
    SuiVision = "suiVision",
    SuiScan = "suiScan",
    // SOLANA
    Solscan = "solscan",
    SolanaFM = "solanaFm",
    SolanaExplorer = "solanaExplorer",
}

// Input params
export interface GetExplorerParams {
    chainId: ChainId
    value: string
    type: ExplorerUrlType
    explorerId?: ExplorerId
}

// Main function
export const getExplorerUrl = ({
    chainId,
    value,
    type,
    explorerId,
}: GetExplorerParams): string => {
    switch (chainId) {
    case ChainId.Sui: {
        const baseUrl =
                explorerId === ExplorerId.SuiScan
                    ? "https://suiscan.xyz"
                    : "https://suivision.xyz/"

        switch (type) {
        case ExplorerUrlType.AccountAddress:
            return explorerId === ExplorerId.SuiScan
                ? `${baseUrl}/account/${value}`
                : `${baseUrl}/account/${value}`
        case ExplorerUrlType.Transaction:
            return explorerId === ExplorerId.SuiScan
                ? `${baseUrl}/tx/${value}`
                : `${baseUrl}/txblock/${value}`
        default:
            throw new Error(`Unsupported explorer type: ${type}`)
        }
    }

    case ChainId.Solana: {
        // Default explorer if not provided
        const explorer = explorerId ?? ExplorerId.Solscan

        switch (explorer) {
        case ExplorerId.Solscan: {
            const baseUrl = "https://solscan.io"
            switch (type) {
            case ExplorerUrlType.AccountAddress:
                return `${baseUrl}/account/${value}`
            case ExplorerUrlType.Transaction:
                return `${baseUrl}/tx/${value}`
            default:
                throw new Error(`Unsupported explorer type: ${type}`)
            }
        }

        case ExplorerId.SolanaFM: {
            const baseUrl = "https://solana.fm"
            switch (type) {
            case ExplorerUrlType.AccountAddress:
                return `${baseUrl}/address/${value}`
            case ExplorerUrlType.Transaction:
                return `${baseUrl}/tx/${value}`
            default:
                throw new Error(`Unsupported explorer type: ${type}`)
            }
        }

        case ExplorerId.SolanaExplorer:
        default: {
            const baseUrl = "https://explorer.solana.com"
            switch (type) {
            case ExplorerUrlType.AccountAddress:
                return `${baseUrl}/address/${value}`
            case ExplorerUrlType.Transaction:
                return `${baseUrl}/tx/${value}`
            default:
                throw new Error(`Unsupported explorer type: ${type}`)
            }
        }
        }
    }

    default:
        throw new Error(`Unsupported chainId: ${chainId}`)
    }
}

