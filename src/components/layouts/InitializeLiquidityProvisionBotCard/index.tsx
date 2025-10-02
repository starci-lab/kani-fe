import { KaniCard } from "@/components"
import { InitializeLiquidityProvisionBotCardPage, useAppSelector } from "@/redux"
import React, { createContext, useEffect } from "react"
import { SelectPriorityToken } from "./SelectPriorityToken"
import { SelectLiquidityPools } from "./SelectLiquidityPools"
import { ProvideMetadata } from "./ProvideMetadata"
import { useInitializeLiquidityProvisionBotFormik } from "@/hooks/singleton"

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
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormik()
    // use effect to set the id in the formik state
    useEffect(() => {
        initializeLiquidityProvisionBotFormik.setFieldValue("id", id)
    }, [id])
    // use effect to set the id in the formik state
    const renderContent = () => {
        switch (initializeLiquidityProvisionBotCard) {
        case InitializeLiquidityProvisionBotCardPage.SelectPriorityToken:
            return <SelectPriorityToken/>
        case InitializeLiquidityProvisionBotCardPage.SelectLiquidityPools:
            return <SelectLiquidityPools/>
        case InitializeLiquidityProvisionBotCardPage.ProvideMetadata:
            return <ProvideMetadata/>
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
