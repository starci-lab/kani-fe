import { TickMath } from "@cetusprotocol/cetus-sui-clmm-sdk"

export const tickIndexToPrice = (tick: number, decimalsA: number, decimalsB: number) => {
    return TickMath.tickIndexToPrice(tick, decimalsA, decimalsB)
}

export const tickIndexToSqrtPriceX64 = (tick: number) => {
    return TickMath.tickIndexToSqrtPriceX64(tick)
}