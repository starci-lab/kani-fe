import Decimal from "decimal.js"
import { publicEnv } from "@/resources/env"

export interface ComputePercentageParams {
    numerator: Decimal
    denominator: Decimal
    fractionDigits?: number
}
export const computePercentage = (
    { 
        numerator, 
        denominator, 
        fractionDigits = publicEnv().computation.percentage.fractionDigits 
    }: ComputePercentageParams): Decimal => {
    return new Decimal(numerator).div(denominator).mul(100).toDecimalPlaces(fractionDigits, Decimal.ROUND_HALF_UP)
}