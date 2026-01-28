import { ChainId } from "@/modules/types"

export enum ExplorerType {
    Account = "account",
    Transaction = "transaction",
    Object = "object",
}
export const explorerUrl = (
    { type, value, chainId }: ExplorerUrlParams
) => {
    switch (chainId) {
    case ChainId.Sui: {
        switch (type) {
        case ExplorerType.Account: {
            return `https://suivision.xyz/account/${value}`
        }
        case ExplorerType.Transaction: {
            return `https://suivision.xyz/tx/${value}`
        }
        case ExplorerType.Object: {
            return `https://suivision.xyz/object/${value}`
        }
        default: {
            throw new Error(`Unsupported type: ${type}`)
        }
        }
    }
    case ChainId.Solana: {
        switch (type) {
        case ExplorerType.Account: {
            return `https://solscan.io/account/${value}`
        }
        case ExplorerType.Transaction: {
            return `https://solscan.io/tx/${value}`
        }
        case ExplorerType.Object: {
            return `https://solscan.io/object/${value}`
        }
        default: {
            throw new Error(`Unsupported type: ${type}`)
        }
        }
    }
    default: {
        throw new Error(`Unsupported chainId: ${chainId}`)
    }
    }
}

export interface ExplorerUrlParams {
    type: ExplorerType,
    value: string,
    chainId: ChainId,
}