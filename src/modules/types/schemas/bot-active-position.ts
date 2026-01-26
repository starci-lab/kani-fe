import { LiquidityPoolType } from "../enums"
import { PositionSchema } from "./position"
import { LiquidityPoolSchema } from "./liquidity-pool"
import { AbstractSchema } from "./abstract"

export interface BotActivePositionSchema extends AbstractSchema {
    type: LiquidityPoolType
    liquidityPool: string
    position: string
    associatedPosition?: PositionSchema
    associatedLiquidityPool?: LiquidityPoolSchema
}
