import { KaniChip } from "@/components/atomic"
import { BotViolateIndicatorType } from "@/modules/types"
import React from "react"

export interface ViolateIndicatorChipProps {
    type: BotViolateIndicatorType
}
export const ViolateIndicatorChip = ({ type }: ViolateIndicatorChipProps) => {
    const map = {
        [BotViolateIndicatorType.PricePct]: {
            name: "Price PCT",
            color: "primary",
        },
        [BotViolateIndicatorType.PriceRegression]: {
            name: "Price Regression",
            color: "secondary",
        },
        [BotViolateIndicatorType.VolumeSpike]: {
            name: "Volume Spike",
            color: "warning",
        }
    } as const
    return (
        <KaniChip size="sm" variant="flat" color={map[type].color}>
            {map[type].name}
        </KaniChip>
    )
}