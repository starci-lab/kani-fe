import { LiquidityPoolId } from "./enums"
import { ChainId, Network } from "../blockchain"
import { AbstractSchema } from "./abstract"

export interface LiquidityPoolSchema extends AbstractSchema {
    /** Unique display identifier for the pool */
    displayId: LiquidityPoolId

    /** The DEX this pool belongs to (populated object or just ID) */
    dex: string

    /** The pool address (on-chain) */
    poolAddress: string

    /** First token in the pool */
    tokenA: string

    /** Second token in the pool */
    tokenB: string

    /** Pool trading fee percentage (e.g. 0.25%) */
    fee: number

    /** Network where this pool exists */
    network: Network

    /** Chain ID where this pool exists */
    chainId: ChainId

    /** Reward tokens for the pool */
    rewardTokens: Array<string>
}