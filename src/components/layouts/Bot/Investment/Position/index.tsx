import React, { useMemo } from "react"
import { KaniCard, KaniCardBody } from "@/components/atomic"
import { PoolCardStatic, TooltipTitle } from "@/components/reuseable"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"

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
                <TooltipTitle
                    title="Position"
                    tooltipString="The position of the bot."
                />
                <Spacer y={4} />
                <PoolCardStatic
                    liquidityPool={liquidityPool}
                />
            </KaniCardBody>
        </KaniCard>
    )
}