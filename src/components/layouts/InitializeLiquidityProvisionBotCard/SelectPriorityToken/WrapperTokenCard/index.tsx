import React from "react"
import { TokenCard } from "@/components"
import { TokenSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { useInitializeLiquidityProvisionBotFormik } from "@/hooks/singleton/formik"

export interface WrapperTokenCardProps {
    token: TokenSchema
}

export const WrapperTokenCard = ({ token }: WrapperTokenCardProps) => {
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormik()
    const tokenPrices = useAppSelector((state) => state.socket.tokenPrices)
    return (
        <TokenCard 
            token={token} 
            price={tokenPrices[token.displayId]}
            isSelected={
                initializeLiquidityProvisionBotFormik.values.priorityTokenId === token.displayId
            } onSelect={() => {
                initializeLiquidityProvisionBotFormik.setFieldValue("priorityTokenId", token.displayId)
            }} 
        />
    )
}