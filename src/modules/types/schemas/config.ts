import { ConfigId } from "./enums"
import { ChainId, Network } from "../blockchain"

export interface ConfigSchema {
    /** Unique ID of the config, matches one of the predefined enum values */
    displayId: ConfigId

    /** Value can be object, array, or primitive depending on config type */
    value: unknown
}

/**
 * Represents the gas configuration structure inside `Config.value`.
 * This is usually stored under a config with displayId = GAS_CONFIG or similar.
 */
export interface GasConfig {
    /** 
     * Minimum gas required per chain/network combination.
     * Example:
     * {
     *   SUI: {
     *     mainnet: 100000,
     *     testnet: 50000
     *   },
     *   SOLANA: {
     *     mainnet: 5000
     *   }
     * }
     */
    minGasRequired: Partial<Record<ChainId, Partial<Record<Network, number>>>>
}

export interface AccountLimitsConfig {
    maxBotsPerAccount: number
}