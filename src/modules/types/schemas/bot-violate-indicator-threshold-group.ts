import { LogicalOperator } from "../enums"
import { BotViolateIndicatorOpSchema } from "./bot-violate-indicator-op"

/**
 * Trigger or reentry threshold: list of indicator conditions combined by a logical operator (And / Or).
 */
export interface BotViolateIndicatorThresholdGroupSchema {
    indicators: Array<BotViolateIndicatorOpSchema>
    operation: LogicalOperator
}
