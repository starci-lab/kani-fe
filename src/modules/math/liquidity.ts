import { LiquidityMath } from "@raydium-io/raydium-sdk-v2"
import BN from "bn.js"
import Decimal from "decimal.js"
import { tickIndexToSqrtPriceX64 } from "../utils"
import { DexId } from "../types"

export interface GetAmountsFromLiquidityParams {
    liquidity: BN
    tickLower: Decimal
    tickUpper: Decimal
    tickCurrent: Decimal
    dex: DexId
}

export interface GetAmountsFromLiquidityResponse {
    amountA: BN
    amountB: BN
}
export const getAmountsFromLiquidityRaydium = (
    { liquidity, tickLower, tickUpper, tickCurrent }: GetAmountsFromLiquidityParams
): GetAmountsFromLiquidityResponse => {
    const sqrtPriceX64 = tickIndexToSqrtPriceX64(tickCurrent.toNumber())
    const sqrtPriceAX64 = tickIndexToSqrtPriceX64(tickLower.toNumber())
    const sqrtPriceBX64 = tickIndexToSqrtPriceX64(tickUpper.toNumber())
    const { amountA, amountB } = LiquidityMath.getAmountsFromLiquidity(sqrtPriceX64, sqrtPriceAX64, sqrtPriceBX64, liquidity, false)
    return {
        amountA,
        amountB,
    }
}

export const getAmountsFromLiquidityOrca = (
    { liquidity, tickLower, tickUpper, tickCurrent }: GetAmountsFromLiquidityParams
): GetAmountsFromLiquidityResponse => {
    const sqrtPriceX64 = tickIndexToSqrtPriceX64(tickCurrent.toNumber())
    const sqrtPriceAX64 = tickIndexToSqrtPriceX64(tickLower.toNumber())
    const sqrtPriceBX64 = tickIndexToSqrtPriceX64(tickUpper.toNumber())
    const { amountA, amountB } = LiquidityMath.getAmountsFromLiquidity(sqrtPriceX64, sqrtPriceAX64, sqrtPriceBX64, liquidity, false)
    return {
        amountA,
        amountB,
    }
}

export const getAmountsFromLiquidity = (
    params: GetAmountsFromLiquidityParams
): GetAmountsFromLiquidityResponse => {
    switch (params.dex) {
    case DexId.Raydium:
        return getAmountsFromLiquidityRaydium(params)
    case DexId.Orca:
        return getAmountsFromLiquidityOrca(params)
    default:
        throw new Error(`Unsupported dex: ${params.dex}`)
    }
}