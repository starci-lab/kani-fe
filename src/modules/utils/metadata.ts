import { ChainId } from "../types"
export interface Metadata {
    name: string
    iconUrl: string
}
export const getMetadata = (chainId: ChainId) => {
    switch (chainId) {
    case ChainId.Solana:
        return {
            name: "Solana",
        }
    case ChainId.Monad:
        return {
            name: "Monad",
        }
    case ChainId.Bsc:
        return {
            name: "Bsc",
        }
    case ChainId.Sui:
        return {
            name: "Sui",
        }
    default:
        throw new Error("Chain not supported")
    }
}   