import React, { useEffect } from "react"
import { useAppDispatch, setDashboardLiquidityProvisionId, useAppSelector } from "@/redux"
import { Container, TooltipTitle, AreaChart } from "../../../../reuseable"
import { Divider, Spacer } from "@heroui/react"
import { KaniAvatar, KaniCard, KaniCardBody } from "@/components"
import {useTranslations} from "next-intl"

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
                            <div className="bg-content2 rounded-medium px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <KaniAvatar src={priorityToken?.iconUrl}/>
                                    <div>
                                        <div className="text-sm">{priorityToken?.name}</div>
                                        <div className="text-xs text-foreground-500">{priorityToken?.symbol}</div>
                                    </div>
                                </div>
                                <Spacer y={2} />
                                <Divider/>
                                <Spacer y={2} />
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 justify-between">
                                        <div className="text-sm">
                                            {t("token_priority")}
                                        </div>
                                        <div className="text-sm">
                                        111
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-between">
                                        <div className="text-sm">
                                            {t("amount")}
                                        </div>
                                        <div className="text-sm">
                                        111
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </KaniCardBody>
                    </KaniCard>
                </div>
            </Container>
        )
    }