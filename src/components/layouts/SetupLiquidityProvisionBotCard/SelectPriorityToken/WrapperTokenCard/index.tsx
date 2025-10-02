import React from "react"
import { TokenCard } from "@/components"
import { TokenSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"

export interface WrapperTokenCardProps {
    token: TokenSchema
}

export const WrapperTokenCard = ({ token }: WrapperTokenCardProps) => {
    const tokenPrices = useAppSelector((state) => state.socket.tokenPrices)
    return <TokenCard token={token} price={tokenPrices[token.displayId]} />
}