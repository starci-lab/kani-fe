import { CexId, TokenId } from "./enums"
import { ChainId, Network, TokenType } from "../blockchain"
import { AbstractSchema } from "./abstract"

export interface TokenSchema extends AbstractSchema {
    /** Display ID for the token (e.g. SUI, IKA, USDC) */
    displayId: TokenId

    /** Name of the token */
    name: string

    /** Token symbol (e.g. SUI, IKA, USDC) */
    symbol: string

    /** Number of decimals used for the token */
    decimals: number

    /** Contract address of the token on its chain */
    tokenAddress?: string

    /** CoinMarketCap ID (e.g. 'sui', 'bitcoin') */
    coinMarketCapId?: string

    /** CoinGecko ID (e.g. 'sui', 'bitcoin') */
    coinGeckoId?: string

    /** URL of the token icon */
    iconUrl: string

    /** Blockchain chain ID where this token is deployed */
    chainId: ChainId

    /** Official project URL */
    projectUrl: string

    /** Network where this token is deployed */
    network: Network

    /** List of centralized exchanges where this token is listed */
    cexIds?: Array<CexId>

    /** Primary CEX where the token is listed */
    whichCex?: CexId

    /** CEX trading symbols map (CexId -> symbol) */
    cexSymbols?: Record<string, string>

    /** Token type (e.g. Coin, LP, Derivative, etc.) */
    type: TokenType

    /** Pyth feed ID for price oracle (if available) */
    pythFeedId?: string
    
    /** Selectable for liquidity yield farming */
    selectable?: boolean
}