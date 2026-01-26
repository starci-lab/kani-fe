import { PositionSettlementReason } from "../enums"
import { AbstractSchema } from "./abstract"

export interface PositionSettlementSchema extends AbstractSchema {
    reason: PositionSettlementReason
    metadata?: unknown
}

export interface PositionSettlementReasonOutOfRangeMetadata {
    tickAtClose: number
}
