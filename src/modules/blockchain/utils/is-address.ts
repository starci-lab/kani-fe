import { ChainId, chainIdToPlatformId, PlatformId } from "@/modules/types"
export const isSolanaAddress = (address: string): boolean => {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)
}
export const isEvmAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const isSuiAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{64}$/.test(address)
}

export const isAddress = (address: string, chainId: ChainId): boolean => {
    const platformId = chainIdToPlatformId(chainId)
    switch (platformId) {
    case PlatformId.Solana:
        return isSolanaAddress(address)
    case PlatformId.Evm:
        return isEvmAddress(address)
    case PlatformId.Sui:
        return isSuiAddress(address)
    default:
        return false
    }
}