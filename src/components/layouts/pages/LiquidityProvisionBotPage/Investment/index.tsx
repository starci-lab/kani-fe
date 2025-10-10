import { AreaChart, KaniCard, KaniCardBody, TooltipTitle } from "@/components"
import { useAppSelector } from "@/redux/hooks"
import { Spacer } from "@heroui/react"
import { useTranslations } from "next-intl"
import React from "react"
import { TokenCard, TokenCardType } from "./TokenCard"

export const Investment = () => {
    const t = useTranslations("dashboard_liquidity_provision")
    const tokens = useAppSelector(
        (state) => state.static.tokens
    )
    const liquidityProvisionBot = useAppSelector(
        (state) => state.session.liquidityProvisionBot
    )
    const priorityToken = tokens.find(
        (token) => token.id === liquidityProvisionBot?.priorityToken
    )
    return (
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
    )
}