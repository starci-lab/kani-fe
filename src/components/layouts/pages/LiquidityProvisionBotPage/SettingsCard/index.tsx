import { KaniCard, KaniCardBody, TooltipTitle } from "@/components"
import React from "react"
export const SettingsCard = () => {
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle 
                    title="Settings"
                    tooltipString="Settings"
                />
            </KaniCardBody>
        </KaniCard>
    )
}