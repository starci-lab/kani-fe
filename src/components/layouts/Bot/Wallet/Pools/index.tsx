import { KaniCard, KaniCardBody, KaniLink } from "@/components/atomic"
import { ScrollableList, TooltipTitle } from "@/components/reuseable"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import React from "react"
import { PoolCard } from "./PoolCard"

export const Pools = () => {
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    const bot = useAppSelector((state) => state.bot.bot)
    const filteredLiquidityPools = liquidityPools.filter((liquidityPool) => {
        return bot?.liquidityPools?.includes(liquidityPool.id)
    })
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex justify-between items-center">
                    <TooltipTitle
                        title="Pools"
                        tooltipString="The pools selected for the bot." />
                    <KaniLink
                        className="leading-none"
                        size="sm"
                        color="primary"
                    >
                            Manage
                    </KaniLink>    
                </div>
                <Spacer y={3} />
                <ScrollableList
                    enableScroll={false}
                    items={filteredLiquidityPools}
                    renderItem={(liquidityPool) => {
                        return (
                            <PoolCard 
                                key={liquidityPool.id} 
                                liquidityPool={liquidityPool} 
                            />
                        )
                    }}
                />
            </KaniCardBody>
        </KaniCard>
    )
}