import { KaniCard, KaniCardBody, KaniLink } from "@/components/atomic"
import { ScrollableList, TooltipTitle } from "@/components/reuseable"
import { Spacer } from "@heroui/react"
import React from "react"
import { PoolCard } from "./PoolCard"
import { FadersIcon } from "@phosphor-icons/react"
import { useQueryLiquidityPools2BotSwr } from "@/hooks/singleton"

export const Pools = () => {
    const { data } = useQueryLiquidityPools2BotSwr()
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex justify-between items-center">
                    <TooltipTitle
                        title="Pools"
                        tooltipString="The pools selected for the bot." />
                    <div>
                        <KaniLink
                            className="cursor-pointer"
                            size="sm"
                            color="primary"
                        >
                            <FadersIcon 
                                className="w-5 h-5"
                            />
                        </KaniLink>  
                    </div>  
                </div>
                <Spacer y={3} />
                <ScrollableList
                    enableScroll={false}
                    items={data?.liquidityPools2.data?.data || []}
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