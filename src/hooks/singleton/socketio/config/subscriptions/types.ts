export interface SubscribeDynamicLiquidityPoolsInfoEventPayload {
    ids: Array<string>
}

export interface SubscribePricesEventPayload {
    ids: Array<string>
}

/** Event payload for confirm withdrawal publication. */
export interface SubscribeConfirmWithdrawalEventPayload {
    botId: string
}