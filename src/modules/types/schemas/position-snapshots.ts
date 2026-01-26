import { AbstractSchema } from "./abstract"

export interface PositionSnapshotsSchema extends AbstractSchema {
    targetBalanceAmount: string
    quoteBalanceAmount: string
    gasBalanceAmount: string
    snapshotAt: Date
    positionValue: number
    positionValueInUsd: number
}
