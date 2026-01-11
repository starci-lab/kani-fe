import { KaniLink } from "../../../../atomic"
import { PoolCardSkeleton, ScrollableList, TooltipTitle, PoolCard } from "../../../../reuseable"
import { Spacer } from "@heroui/react"
import React from "react"
import { ArrowsClockwiseIcon, FadersIcon } from "@phosphor-icons/react"
import { useQueryLiquidityPools2BotSwr, useUpdatePoolsDisclosure } from "@/hooks/singleton"

export const Pools = () => {
    const { data, isLoading, mutate } = useQueryLiquidityPools2BotSwr()
    const { onOpen } = useUpdatePoolsDisclosure()
    return (
        <div>
            <div className="flex justify-between items-center">
                <TooltipTitle
                    title="Pools"
                    tooltipString="The pools selected for the bot." />
                <div>
                    <div className="flex items-center gap-2">
                        <KaniLink
                            className="cursor-pointer"
                            size="sm"
                            color="primary"
                            onPress={onOpen}
                        >
                            <FadersIcon 
                                className="w-5 h-5"
                            />
                        </KaniLink>  
                        <KaniLink
                            className="cursor-pointer"
                            size="sm"
                            color="primary"
                            onPress={() => {
                                mutate()
                            }}
                        >
                            <ArrowsClockwiseIcon 
                                className="w-5 h-5"
                            />
                        </KaniLink>  
                    </div>
                </div>  
            </div>
            <Spacer y={3} />
            {
                (isLoading || !data?.liquidityPools2.data?.data) ? (
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: 2 }).map((_, index) => (                  
                            <PoolCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
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
                )
            }
        </div>
    )
}