import {
    publicEnv 
} from "@/resources/env"
import Decimal from "decimal.js"

export const round = (
    decimal: Decimal, 
    fractionDigits = publicEnv().computation.round.fractionDigits
): Decimal => {
    return decimal.toDecimalPlaces(fractionDigits,
        Decimal.ROUND_HALF_UP)
}