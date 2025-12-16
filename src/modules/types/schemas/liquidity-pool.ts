import { LiquidityPoolId, LiquidityPoolType } from "./enums"
import { ChainId } from "../blockchain"
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

    /** Chain ID where this pool exists */
    chainId: ChainId

    /** URL of the pool */
    url: string
    
    type: LiquidityPoolType;
}