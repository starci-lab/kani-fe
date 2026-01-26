import { AbstractSchema } from "./abstract"

export interface BotSnapshotsSchema extends AbstractSchema {
    targetBalanceAmount: string
    quoteBalanceAmount: string
    gasBalanceAmount: string
    snapshotAt: Date
}
