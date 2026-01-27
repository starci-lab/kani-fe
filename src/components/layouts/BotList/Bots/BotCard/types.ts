import { BotSchema, TokenSchema } from "@/modules/types"
import React from "react"

export interface BotCardBaseProps {
    bot: BotSchema
    targetToken: TokenSchema
    quoteToken: TokenSchema
    botName: string
    isRunning: boolean
    roiString: string
    isPositiveRoi: boolean
    pnlString: string
    isPositivePnl: boolean
    capitalString: string
    liquidityStatusChip: React.ReactNode
    chainIconUrl?: string
    chainName?: string
    accountAddress: string
    poolAddress?: string
    onCardPress: () => void
}
