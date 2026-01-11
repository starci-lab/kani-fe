import { ConfigId } from "./enums"
import { ChainId } from "../blockchain"

export interface ConfigSchema {
    /** Unique ID of the config, matches one of the predefined enum values */
    displayId: ConfigId

    /** Value can be object, array, or primitive depending on config type */
    value: unknown
}

export interface AccountLimitsConfig {
    maxBotsPerAccount: number
}

export interface GasAmountRequired {
    minOperationalAmount: string
    targetOperationalAmount: string
}

export interface GasConfig {
    gasAmountRequired: Partial<Record<ChainId, GasAmountRequired>>
}

export interface BalanceRequired {
    minRequiredAmountInUsd: number
}

export interface BalanceConfig {
    balanceRequired: Partial<Record<ChainId, BalanceRequired>>
}