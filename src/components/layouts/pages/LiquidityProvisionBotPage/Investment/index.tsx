import { AreaChart, KaniCard, KaniCardBody, TooltipTitle } from "@/components"
import { useAppSelector } from "@/redux/hooks"
import { Spacer } from "@heroui/react"
import React from "react"
import { TokenCard, TokenCardType } from "./TokenCard"

export const Investment = () => {
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
                    title="Investment"
                    tooltipString="The investment of the bot." />
                <div className="text-2xl font-bold">
                    $14k
                </div>
                <Spacer y={4} />
                <AreaChart />
                <Spacer y={4} />
                <TooltipTitle
                    title="Assets"
                    tooltipString="The assets of the bot." />
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