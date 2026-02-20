import { ChainId } from "../blockchain"
import { PositionClmmStateSchema } from "./position-clmm-state"
import { PositionDlmmStateSchema } from "./position-dlmm-state"
import { PositionFeesSchema } from "./position-fees"
import { PositionSnapshotsSchema } from "./position-snapshots"
import { PositionPerformanceSchema } from "./position-performance"
import { PositionSettlementSchema } from "./position-settlement"
import { LiquidityPoolSchema } from "./liquidity-pool"
import { AbstractSchema } from "./abstract"

export interface PositionSchema extends AbstractSchema {
    openTxHashes: Array<string>
    liquidityPool: string
    clmmState?: PositionClmmStateSchema
    dlmmState?: PositionDlmmStateSchema
    bot: string
    chainId: ChainId
    positionId?: string
    isActive: boolean
    closeTxHashes?: Array<string>
    openSnapshot?: PositionSnapshotsSchema
    closeSnapshot?: PositionSnapshotsSchema
    performance?: PositionPerformanceSchema
    metadata?: unknown
    fees: PositionFeesSchema
    positionSettlement?: PositionSettlementSchema
    associatedLiquidityPool?: LiquidityPoolSchema
    rentAmount?: string
}

export interface RaydiumPositionMetadata {
    nftMintAddress: string
    ataAddress: string
}

export interface OrcaPositionMetadata {
    nftMintAddress: string
    ataAddress: string
}

export interface MeteoraPositionMetadata {
    ataAddress: string
}
