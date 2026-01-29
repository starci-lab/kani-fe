import { KaniLink } from "../../../../atomic"
import { PoolCardSkeleton, TooltipTitle, PoolCard, RefreshIcon } from "../../../../reuseable"
import { Spacer } from "@heroui/react"
import React from "react"
import { FadersIcon } from "@phosphor-icons/react"
import { useQueryLiquidityPoolsBotSwr, useUpdatePoolsDisclosure } from "@/hooks/singleton"

export const Pools = () => {
    const { data, isLoading, mutate } = useQueryLiquidityPoolsBotSwr()
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
                        <RefreshIcon
                            classNames={{
                                icon: "text-primary"
                            }}
                            onRefresh={() => {
                                mutate()
                            }}
                        />
                    </div>
                </div>  
            </div>
            <Spacer y={4} />
            {
                (isLoading || !data?.liquidityPools.data?.data) ? (
                    <div className="flex flex-col gap-3">
                        {
                            Array.from({ length: 2 }).map((_, index) => (                  
                                <PoolCardSkeleton key={index} />
                            )
                            )
                        }
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {data?.liquidityPools.data?.data?.map((liquidityPool) => (
                            <PoolCard key={liquidityPool.id} liquidityPool={liquidityPool} />
                        ))}
                    </div>
                )
            }
        </div>
    )
}