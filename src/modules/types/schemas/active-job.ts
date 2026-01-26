import { JobType } from "../enums"
import { AbstractSchema } from "./abstract"

export interface ActiveJobSchema extends AbstractSchema {
    job: string
    liquidityPool?: string
    jobType: JobType
    queuedAt: Date
}
