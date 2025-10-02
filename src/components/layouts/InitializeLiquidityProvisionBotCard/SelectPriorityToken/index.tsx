"use client"
import React, { useContext } from "react"
import { InitializeLiquidityProvisionBotCardContext } from "../index"
import { KaniButton, KaniCardBody, KaniCardFooter, KaniCardHeader } from "../../../atomic"
import { ScrollableList, ScrollableListSkeleton } from "../../../reuseable"
import { 
    InitializeLiquidityProvisionBotCardPage,
    setInitializeLiquidityProvisionBotCard, 
    useAppDispatch, 
    useAppSelector 
} from "@/redux"
import { WrapperTokenCard } from "./WrapperTokenCard"
import { useQueryStaticSwrMutation, useInitializeLiquidityProvisionBotFormik } from "@/hooks/singleton"

export const SelectPriorityToken = () => {
    const { id } = useContext(InitializeLiquidityProvisionBotCardContext)!
    const tokens = useAppSelector(state => state.static.tokens)
    const { isLoading } = useQueryStaticSwrMutation()
    const dispatch = useAppDispatch()
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormik()
    return <>
        <KaniCardHeader title="Select Priority Token" description="Pick your priority token — the system will optimize farming to gradually accumulate more of this token." />
        <KaniCardBody>
            {isLoading ? 
            <ScrollableListSkeleton /> 
            : <ScrollableList items={tokens} renderItem={
                (token) => <WrapperTokenCard key={token.id} token={token} />} />
            }
        </KaniCardBody>
        <KaniCardFooter>
            <KaniButton color="primary" 
            fullWidth 
            isDisabled={!initializeLiquidityProvisionBotFormik.values.priorityTokenId} 
            onPress={() => {
                dispatch(
                    setInitializeLiquidityProvisionBotCard(
                        InitializeLiquidityProvisionBotCardPage.SelectLiquidityPools
                    ))
            }}>Continue</KaniButton>
        </KaniCardFooter>
    </>
}