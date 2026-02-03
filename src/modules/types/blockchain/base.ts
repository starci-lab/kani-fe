// -------------------- ChainId --------------------
export enum ChainId {
    Solana = "solana",
    Monad = "monad",
    Bsc = "bsc",
    Sui = "sui",
}

// -------------------- PlatformId --------------------
export enum PlatformId {
    Evm = "evm",
    Solana = "solana",
    Sui = "sui",
}
// -------------------- TokenType --------------------
export enum TokenType {
    Native = "native",
    StableUsdc = "stableUsdc",
    Wrapper = "wrapper",
    Regular = "regular",
    LiquidStaking = "liquidStaking",
}

// -------------------- Network --------------------
export enum Network {
    Mainnet = "mainnet",
    Testnet = "testnet",
}

// -------------------- DexName --------------------
export enum DexName {
    Cetus = "cetus",
}

export const chainIdToPlatformId = (chainId: ChainId): PlatformId => {
    switch (chainId) {
    case ChainId.Solana:
        return PlatformId.Solana
    case ChainId.Monad:
        return PlatformId.Evm
    case ChainId.Sui:
        return PlatformId.Sui
    }
    throw new Error(`Invalid chainId: ${chainId}`)
}