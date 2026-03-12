import { IndicatorName, Operation } from "../enums"

/**
 * Single indicator condition: field (indicator name) + operator + threshold value.
 */
export interface BotViolateIndicatorOpSchema {
    name: IndicatorName
    /** Comparison operator (e.g. "gt", "lt", "gte", "lte"). */
    op: Operation
    value: number
}
