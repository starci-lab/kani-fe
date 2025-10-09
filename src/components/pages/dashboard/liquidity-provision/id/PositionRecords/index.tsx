import React from "react"
import { KaniCard, KaniCardBody, TooltipTitle } from "@/components"

export const PositionRecords = () => {
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle title="Position Records" tooltipString="The position records of the liquidity provision bot." />
            </KaniCardBody>
        </KaniCard>
    )
}