import { KaniCard, KaniCardBody, KaniDivider, KaniLink, KaniSkeleton } from "@/components/atomic"
import { ScrollableList, TooltipTitle } from "@/components/reuseable"
import { Spacer } from "@heroui/react"
import React from "react"
import { PoolCard } from "./PoolCard"
import { FadersIcon } from "@phosphor-icons/react"
import { useQueryLiquidityPools2BotSwr } from "@/hooks/singleton"

export const Pools = () => {
    const { data, isLoading } = useQueryLiquidityPools2BotSwr()
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
                {
                    isLoading ? (
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <KaniCard key={index}>
                                    <KaniCardBody>
                                        <div className="flex items-center justify-between gap-4">
                                            <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                                            <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                                        </div>
                                        <Spacer y={3} />
                                        <KaniDivider />
                                        <Spacer y={3} />
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between gap-4">
                                                <TooltipTitle title="TVL 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                                                <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <TooltipTitle title="Fees 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                                                <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <TooltipTitle title="Volume 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                                                <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <TooltipTitle title="APR 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                                                <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                                            </div>
                                        </div>
                                    </KaniCardBody>
                                </KaniCard>
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
            </KaniCardBody>
        </KaniCard>
    )
}