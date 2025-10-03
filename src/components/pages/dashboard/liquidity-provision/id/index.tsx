import React, { useEffect } from "react"
import { useAppDispatch, setDashboardLiquidityProvisionId, useAppSelector } from "@/redux"
import { Container, TooltipTitle, AreaChart } from "../../../../reuseable"
import { Spacer } from "@heroui/react"
import { KaniCard, KaniCardBody } from "@/components"
import {useTranslations} from "next-intl"
import { TokenCard, TokenCardType } from "./TokenCard"

export interface DashboardLiquidityProvisionIdPageProps {
    id: string
}

export const DashboardLiquidityProvisionIdPage = 
    ({ id }: DashboardLiquidityProvisionIdPageProps) => 
    {
        const t = useTranslations("dashboard_liquidity_provision")
        // get the id from the url
        const dispatch = useAppDispatch()
        const tokens = useAppSelector(
            (state) => state.static.tokens
        )
        const liquidityProvisionBot = useAppSelector(
            (state) => state.session.liquidityProvisionBot
        )
        const priorityToken = tokens.find(
            (token) => token.id === liquidityProvisionBot?.priorityToken
        )
        // use effect to set the id in the redux state
        useEffect(() => {
            dispatch(setDashboardLiquidityProvisionId(id))
        }, [id])   
        return (
            <Container>
                <div className="text-2xl font-bold">
                    {liquidityProvisionBot?.name}
                </div>
                <Spacer y={6} />
                <div className="flex">
                    <KaniCard>
                        <KaniCardBody>
                            <TooltipTitle 
                                title={t("investment")} 
                                tooltipString={t("investment_tooltip")} />
                            <div className="text-2xl font-bold">
                                $14k
                            </div>
                            <Spacer y={4} />
                            <AreaChart />
                            <Spacer y={4} />
                            <TooltipTitle 
                                title="Assets" 
                                tooltipString={t("assets_tooltip")} />
                            <Spacer y={4} />
                            <div className="flex gap-2">
                            {priorityToken && liquidityProvisionBot?.accountAddress && (
                                <>
                                <TokenCard 
                                    token={priorityToken} 
                                    ownerAddress={liquidityProvisionBot?.accountAddress}
                                    type={TokenCardType.PriorityToken}
                                    limit={10}
                                />
                                <TokenCard 
                                    token={priorityToken} 
                                    ownerAddress={liquidityProvisionBot?.accountAddress}
                                    type={TokenCardType.GasToken}
                                    limit={10}
                                />
                                </> 
                            )}
                            </div>
                        </KaniCardBody>
                    </KaniCard>
                </div>
            </Container>
        )
    }