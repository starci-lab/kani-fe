import { KaniCard, KaniCardBody, TooltipTitle } from "@/components"
import { Spacer } from "@heroui/react"
import React from "react"

export const PoolInfoCard = () => {
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle
                    title="Price Range"
                    tooltipString="The price range of the pool."
                />
                <Spacer y={4} />
                <div className="text-2xl font-bold">
                    $14k
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}
