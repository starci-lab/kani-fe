import { KaniCard } from "@/components"
import { SetupLiquidityProvisionBotCardPage, useAppSelector } from "@/redux"
import React, { createContext } from "react"
import { SelectPriorityToken } from "./SelectPriorityToken"

export interface SetupLiquidityProvisionBotCardContextType {
    // id of the liquidity provision bot
    id: string
}
export interface SetupLiquidityProvisionBotCardProviderProps {
    id: string
}
export const SetupLiquidityProvisionBotCardContext = createContext<SetupLiquidityProvisionBotCardContextType | null>(null)

export const SetupLiquidityProvisionBotCard = ({ id }: SetupLiquidityProvisionBotCardProviderProps) => {
    const setupLiquidityProvisionBotCard = useAppSelector(state => state.page.setupLiquidityProvisionBotCard)
    const renderContent = () => {
        switch (setupLiquidityProvisionBotCard) {
        case SetupLiquidityProvisionBotCardPage.SelectPriorityToken:
            return <SelectPriorityToken/>
        case SetupLiquidityProvisionBotCardPage.SelectLiquidityPools:
            return <div/>
        case SetupLiquidityProvisionBotCardPage.Continue:
            return <div/>
        }   
    }
    return (
        <SetupLiquidityProvisionBotCardContext.Provider value={{ id }}>
            <KaniCard className="w-[400px]">
                {renderContent()}
            </KaniCard>
        </SetupLiquidityProvisionBotCardContext.Provider>
    )
}
