import React, { useContext } from "react"
import { SetupLiquidityProvisionBotCardContext } from "../index"
import { CardHeader } from "@heroui/react"
import { KaniCardBody, KaniCardHeader, ScrollableList, TokenCard } from "@/components"
import { useAppSelector } from "@/redux"
import { WrapperTokenCard } from "./WrapperTokenCard"

export const SelectPriorityToken = () => {
    const { id } = useContext(SetupLiquidityProvisionBotCardContext)!
    const tokens = useAppSelector(state => state.static.tokens)
    return <>
        <KaniCardHeader title="Select Priority Token" description="Pick your priority token — the system will optimize farming to gradually accumulate more of this token." />
        <KaniCardBody>
            <ScrollableList items={tokens} renderItem={
                (token) => <WrapperTokenCard key={token.id} token={token} />} />
        </KaniCardBody>
    </>
}