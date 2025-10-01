import { KaniCard } from "@/components"
import { SetupLiquidityProvisionBotCardPage, useAppSelector } from "@/redux"
import React from "react"

export const SetupLiquidityProvisionBotCard = () => {
    const setupLiquidityProvisionBotCard = useAppSelector(state => state.page.setupLiquidityProvisionBotCard)
    const renderContent = () => {
        switch (setupLiquidityProvisionBotCard) {
        case SetupLiquidityProvisionBotCardPage.SelectYieldToken:
            return <div/>
        case SetupLiquidityProvisionBotCardPage.SelectLiquidityPools:
            return <div/>
        case SetupLiquidityProvisionBotCardPage.Continue:
            return <div/>
        }
    }
    return (
        <KaniCard className="w-[400px]">
            {renderContent()}
        </KaniCard>
    )
}
