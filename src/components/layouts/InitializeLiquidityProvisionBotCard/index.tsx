import { KaniCard } from "@/components"
import { InitializeLiquidityProvisionBotCardPage, useAppSelector } from "@/redux"
import React, { createContext } from "react"
import { SelectPriorityToken } from "./SelectPriorityToken"
import { SelectLiquidityPools } from "./SelectLiquidityPools"

export interface InitializeLiquidityProvisionBotCardContextType {
    // id of the liquidity provision bot
    id: string
}
export interface InitializeLiquidityProvisionBotCardProviderProps {
    id: string
}
export const InitializeLiquidityProvisionBotCardContext = createContext<InitializeLiquidityProvisionBotCardContextType | null>(null)

export const InitializeLiquidityProvisionBotCard = ({ id }: InitializeLiquidityProvisionBotCardProviderProps) => {
    const initializeLiquidityProvisionBotCard = useAppSelector(state => state.page.initializeLiquidityProvisionBotCard)
    const renderContent = () => {
        switch (initializeLiquidityProvisionBotCard) {
        case InitializeLiquidityProvisionBotCardPage.SelectPriorityToken:
            return <SelectPriorityToken/>
        case InitializeLiquidityProvisionBotCardPage.SelectLiquidityPools:
            return <SelectLiquidityPools/>
        case InitializeLiquidityProvisionBotCardPage.Continue:
            return <div/>
        }   
    }
    return (
        <InitializeLiquidityProvisionBotCardContext.Provider value={{ id }}>
            <KaniCard className="w-[600px]">
                {renderContent()}
            </KaniCard>
        </InitializeLiquidityProvisionBotCardContext.Provider>
    )
}
