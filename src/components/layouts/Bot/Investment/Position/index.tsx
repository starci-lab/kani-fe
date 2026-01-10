import React, { useMemo } from "react"
import { KaniCard, KaniCardBody, KaniLink } from "../../../../atomic"
import { PoolCardStatic, TooltipTitle } from "../../../../reuseable"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { ArrowsClockwiseIcon } from "@phosphor-icons/react"

export const Position = () => {
    const activePosition = useAppSelector((state) => state.bot.bot?.activePosition)
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    const liquidityPool = useMemo(
        () => liquidityPools.find(
            (pool) => 
                pool.id === activePosition?.liquidityPool
        ), 
        [liquidityPools, activePosition?.liquidityPool])
    if (!liquidityPool) return null
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex justify-between items-center">
                    <TooltipTitle
                        title="Position"
                        tooltipString="The position of the bot."
                    />
                    <KaniLink
                        target="_blank"
                        className="text-primary cursor-pointer"
                    >
                        <ArrowsClockwiseIcon className="w-5 h-5"/>
                    </KaniLink>
                </div>
                <Spacer y={3} />
                <PoolCardStatic
                    liquidityPool={liquidityPool}
                />
            </KaniCardBody>
        </KaniCard>
    )
}