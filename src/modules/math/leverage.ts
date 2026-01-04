import BN from "bn.js"
import { divideBnToDecimal, tickIndexToSqrtPriceX64 } from "../utils"
import Decimal from "decimal.js"

export const computeCapitalEfficiency = (
    tickLower: Decimal,
    tickUpper: Decimal,
    tickCurrent: Decimal
): Decimal => {
    const sqrtCurrent = tickIndexToSqrtPriceX64(tickCurrent.toNumber())
    const sqrtLower = tickIndexToSqrtPriceX64(tickLower.toNumber())
    const sqrtUpper = tickIndexToSqrtPriceX64(tickUpper.toNumber())

    // out of range → efficiency = 0
    if (sqrtCurrent.lt(sqrtLower) || sqrtCurrent.gt(sqrtUpper)) {
        return new Decimal(0)
    }

    const denom = sqrtUpper.sub(sqrtLower)
    if (denom.lte(new BN(0))) {
        return new Decimal(0)
    }

    // capital efficiency (in-range)
    return divideBnToDecimal(sqrtCurrent, denom, 5)
}