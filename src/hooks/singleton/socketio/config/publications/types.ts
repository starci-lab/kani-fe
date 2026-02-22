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
/** Received token for confirm withdrawal. */
export interface ReceivedToken {
    id: string
    amount: string
}

/** Event payload for confirm withdrawal publication. */
export interface PublicationConfirmWithdrawalEventPayload {
    botId: string
    txHashes: Array<string>
    receivedTokens: Array<ReceivedToken>
}