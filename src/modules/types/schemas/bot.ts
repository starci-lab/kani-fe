import { ChainId } from "../blockchain"
import { AppVersion, BotStatus, PerformanceDisplayMode } from "../enums"
import { BotActivePositionSchema } from "./bot-active-position"
import { BotSnapshotsSchema } from "./bot-snapshots"
import { ActiveJobSchema } from "./active-job"
import { PrivyMetadataSchema } from "./privy-metadata"
import { AbstractSchema } from "./abstract"
import { BotChartConfigSchema } from "./bot-chart-config"

export interface BotPerformance24H {
    roi: number
    pnl: number
    roiInUsd: number
    pnlInUsd: number
}

export interface BotSchema extends AbstractSchema {
    accountAddress: string
    encryptedPrivateKeyPayload?: unknown
    encryptedPrivySignerPrivateKeyPayload?: unknown
    privyMetadata?: PrivyMetadataSchema
    chainId: ChainId
    user: string
    name: string
    liquidityPools: Array<string>
    running: boolean
    lastRunAt?: Date
    targetToken: string
    quoteToken: string
    balanceSnapshots?: BotSnapshotsSchema
    isExitToUsdc: boolean
    version: AppVersion
    activePosition?: BotActivePositionSchema
    activeJob?: ActiveJobSchema
    performance24h?: BotPerformance24H
    performanceDisplayMode: PerformanceDisplayMode
    positionsPerformanceDisplayMode: PerformanceDisplayMode
    chartConfig?: BotChartConfigSchema
    status?: BotStatus
}
