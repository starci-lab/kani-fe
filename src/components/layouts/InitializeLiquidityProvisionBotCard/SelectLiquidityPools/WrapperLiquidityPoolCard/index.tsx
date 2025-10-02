import React from "react"
import { LiquidityPoolSchema } from "@/modules/types"
import { useInitializeLiquidityProvisionBotFormik } from "@/hooks/singleton"
import { LiquidityPoolCard } from "@/components"

export interface WrapperLiquidityPoolCardProps {
    liquidityPool: LiquidityPoolSchema
}

export const WrapperLiquidityPoolCard = ({ liquidityPool }: WrapperLiquidityPoolCardProps) => {
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormik()
    return (
        <LiquidityPoolCard 
            liquidityPool={liquidityPool} 
            isSelected={
                initializeLiquidityProvisionBotFormik.values.liquidityPools.includes(liquidityPool.displayId)
            } onSelect={() => {
                initializeLiquidityProvisionBotFormik.setFieldValue("liquidityPools", [...initializeLiquidityProvisionBotFormik.values.liquidityPools, liquidityPool.displayId])
            }} 
        />
    )
}