import { ChainId } from "../blockchain"
import { LiquidityPoolId, LiquidityPoolType, TokenId } from "../enums"
import { LiquidityPoolClmmStateSchema } from "./liquidity-pool-clmm-state"
import { LiquidityPoolDlmmStateSchema } from "./liquidity-pool-dlmm-state"
import { AbstractSchema } from "./abstract"

export interface GraphQLDynamicLiquidityPoolInfo {
    tickCurrent?: number
    activeId?: number
    liquidity?: string
    price?: number
    volume24H?: number
    fees24H?: number
    apr24H?: number
    tvl?: string
}

export interface LiquidityPoolSchema extends AbstractSchema {
    displayId: LiquidityPoolId
    dex: string
    poolAddress: string
    tokenA: string
    tokenB: string
    fee: number
    chainId: ChainId
    type: LiquidityPoolType
    isActive: boolean
    metadata?: unknown
    clmmState?: LiquidityPoolClmmStateSchema
    dlmmState?: LiquidityPoolDlmmStateSchema
    url: string
    dynamicInfo?: GraphQLDynamicLiquidityPoolInfo
    wsIdleTimeoutMs?: number
    staleMs: number
}

export interface RaydiumLiquidityPoolMetadata {
    programAddress: string
    tokenVault0: string
    tokenVault1: string
}

export interface RaydiumRewardVault {
    tokenId: TokenId
    vaultAddress: string
}

export interface MeteoraLiquidityPoolMetadata {
    programAddress: string
    reserveXAddress: string
    reserveYAddress: string
}

export interface OrcaLiquidityPoolMetadata {
    programAddress: string
    tokenVault0: string
    tokenVault1: string
}

export interface FlowXLiquidityPoolMetadata {
    packageId: string
    poolRegistryObject: string
    positionRegistryObject: string
    versionObject: string
    positionType: string
    poolType: string
    i32Type: string
    poolFeeCollectEventType: string
    poolRewardCollectEventType: string
    ticksId: string
}

export interface CetusLiquidityPoolMetadata {
    intergratePackageId: string
    globalConfigObject: string
    clmmPackageId: string
    rewarderGlobalVaultObject: string
    tickManagerId: string
    positionManagerId: string
}

export interface TurbosLiquidityPoolMetadata {
    packageId: string
    feeType: string
    positionsObject: string
    versionObject: string
    i32Type: string
}

export interface MomentumLiquidityPoolMetadata {
    packageId: string
    versionObject: string
    ticksId: string
    i32Type: string
}
