import { JobType, JobStatus } from "../enums"
import { AbstractSchema } from "./abstract"

export interface JobSchema extends AbstractSchema {
    liquidityPool?: string
    bot: string
    executor?: string
    type: JobType
    status: JobStatus
    txHash?: string
    data?: unknown
    retryCount: number
    processedAt?: Date
    startedAt?: Date
}
