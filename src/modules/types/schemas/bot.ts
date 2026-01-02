import { ExplorerId } from "@/modules/blockchain"
import { ChainId } from "../blockchain"
import { PositionSchema } from "./position"

export interface BotSchema  {
    id: string
    accountAddress?: string
    encryptedPrivateKey?: string
    chainId: ChainId
    user: string
    name?: string
    priorityToken?: string
    liquidityPools: Array<string>   
    initialized: boolean
    rpcUrls: Array<string>
    explorerId: ExplorerId
    running: boolean
    lastRunAt: Date
    stoppedAt: Date
    targetToken: string
    quoteToken: string
    snapshotTargetBalanceAmount?: string
    snapshotQuoteBalanceAmount?: string
    snapshotGasBalanceAmount?: string
    lastBalancesSnapshotAt?: Date
    isExitToUsdc: boolean
    activePosition?: PositionSchema
    roi24h?: number
    pnl24h?: number
    backupPrivateKey: boolean
}