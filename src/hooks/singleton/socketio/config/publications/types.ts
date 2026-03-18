import {
    DynamicLiquidityPoolInfoCacheResult 
} from "@/modules/types"
import { ViolateIndicatorResultEntry } from "@/redux"

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
    /** The id of the bot. */
    botId: string
    /** The transaction hashes. */
    txHashes: Array<string>
    /** The received tokens. */
    receivedTokens: Array<ReceivedToken>
}


/** Event payload for indicators publication (violate indicator results for a bot). */
export interface PublicationIndicatorsEventPayload {
    /** The results of the indicators. */
    entries: Array<ViolateIndicatorResultEntry>
}