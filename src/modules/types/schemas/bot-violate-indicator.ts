import { AbstractSchema } from "./abstract"
import { BotViolateIndicatorType } from "../enums"
import { BotViolateIndicatorThresholdGroupSchema } from "./bot-violate-indicator-threshold-group"

/**
 * Bot violate indicator: name, type, trigger/reentry thresholds, and time window.
 */
export interface BotViolateIndicatorSchema extends AbstractSchema {
    name: string
    type: BotViolateIndicatorType
    triggerThresholds: BotViolateIndicatorThresholdGroupSchema
    reentryThresholds: BotViolateIndicatorThresholdGroupSchema
    /** Time window in milliseconds. */
    timeWindowMs: number
}

/**
 * Input for creating a bot violate indicator (no id/createdAt/updatedAt).
 * tempId is for form list key only, stripped when submitting.
 */
export type CreateBotViolateIndicatorInput = Omit<BotViolateIndicatorSchema, keyof AbstractSchema> & { tempId: string }
