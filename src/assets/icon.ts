import { ChainId } from "@/modules/types"

// we represent as a function to ensure optional loading or logic processing
export const iconConfig = () => ({
    icon: {
        googleSvg: "/icons/google.svg",
        tokens: {
            bnb: {
                svg: "/icons/tokens/bnb.svg",
            },
            ethereum: {
                svg: "/icons/tokens/ethereum.svg",
            },
            polygon: {
                svg: "/icons/tokens/polygon.svg",
            },
            solana: {
                svg: "/icons/tokens/solana.svg",
                png: "/icons/tokens/solana.png",
            },
            sui: {
                svg: "/icons/tokens/sui.svg",
            }
        }
    }
})

export const getChainAssets = (chainId: ChainId) => {
    switch (chainId) {
    case ChainId.Bsc:
        return {
            token: iconConfig().icon.tokens.bnb.svg
        }
    case ChainId.Monad:
        return {
            token: iconConfig().icon.tokens.ethereum.svg
        }
    case ChainId.Solana:
        return {
            token: iconConfig().icon.tokens.solana.png
        }
    case ChainId.Sui:
        return {
            token: iconConfig().icon.tokens.sui.svg
        }
    default:
        throw new Error("Chain not supported")
    }
}