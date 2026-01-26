import { MarketListingId } from "../enums"

export interface MarketListingSchema {
    id: MarketListingId
    symbol: string
    priority: number
}
