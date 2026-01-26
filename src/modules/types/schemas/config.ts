import { ConfigId } from "../enums"
import { ChainId } from "../blockchain"
import { AbstractSchema } from "./abstract"

export interface ConfigSchema extends AbstractSchema {
    displayId: ConfigId
    value: Record<string, unknown>
}

export interface GasConfig {
    gasAmountRequired: Partial<Record<ChainId, GasAmountRequired>>
}

export interface GasAmountRequired {
    minOperationalAmount: number
    targetOperationalAmount: number
    swapAmount: number
}

export interface ConfigRecord<T> {
    value: T
}

export interface BalanceRequired {
    minRequiredAmountInUsd: number
}

export interface BalanceConfig {
    balanceRequired: Partial<Record<ChainId, BalanceRequired>>
}

export interface ProfitConfig {
    accountLimits: Partial<Record<ChainId, AccountLimitsConfig>>
}

export interface AccountLimitsConfig {
    maxBotsPerAccount: number
}
