import {
    DynamicLiquidityPoolInfoCacheResult 
} from "@/modules/types"

export type PublicationDynamicLiquidityPoolInfo = DynamicLiquidityPoolInfoCacheResult

export interface PublicationDynamicLiquidityPoolsInfoEventPayload {
    results: Record<string, PublicationDynamicLiquidityPoolInfo>
}

export interface PublicationPrice {
    price: number
}

export interface PublicationPriceEventPayload {
    results: Record<string, PublicationPrice>
}