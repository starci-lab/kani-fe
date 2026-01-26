import { ChainId, TokenType } from "../blockchain"
import { TokenId } from "../enums"
import { MarketListingSchema } from "./market-listing"
import { AbstractSchema } from "./abstract"

export interface TokenSchema extends AbstractSchema {
    displayId: TokenId
    name: string
    symbol: string
    decimals: number
    tokenAddress?: string
    iconUrl: string
    chainId: ChainId
    projectUrl: string
    type: TokenType
    selectable: boolean
    is2022Token?: boolean
    marketListings: Array<MarketListingSchema>
}
