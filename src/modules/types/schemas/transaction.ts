import { ChainId } from "../blockchain"
import { TransactionType, TokenId } from "../enums"
import { AbstractSchema } from "./abstract"

export interface TransactionSchema extends AbstractSchema {
    txHash: string
    bot: string
    chainId: ChainId
    type: TransactionType
    timestamp: Date
    isStimulated?: boolean
}

export interface SwapTransactionMetadata {
    tokenIn: TokenId
    tokenOut: TokenId
    amountIn: string
    amountOut?: string
}
