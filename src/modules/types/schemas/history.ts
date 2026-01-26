import { AbstractSchema } from "./abstract"

export interface HistorySerieSchema {
    positionClosedAt: Date
    positionValueAtClose: number
}

export interface HistorySchema extends AbstractSchema {
    series: Array<HistorySerieSchema>
    lastSeriesUpdatedAt: Date
    seriesCount: number
    bot: string
}
