import { KaniCard, KaniCardBody, KaniLink, LiquidityPoolCard, ScrollableList, TooltipTitle } from "@/components"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import React from "react"

export const LiquidityPools = () => {
    const liquidityPoolIds = useAppSelector(state => state.session.liquidityProvisionBot?.liquidityPools)
    const liquidityPools = useAppSelector(state => state.static.liquidityPools)
    console.log(liquidityPoolIds)
    console.log(liquidityPools)
    const filteredLiquidityPools = liquidityPools.filter(liquidityPool => liquidityPoolIds?.includes(liquidityPool.id))
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex justify-between items-center">
                    <TooltipTitle
                        title="Liquidity Pools"
                        tooltipString="The liquidity pools of the liquidity provision bot."
                    />
                    <KaniLink color="primary" href="/dashboard/liquidity-provision/id/liquidity-pools">
                        Manage
                    </KaniLink>
                </div>
                <Spacer y={4} />
                <ScrollableList 
                    items={filteredLiquidityPools}
                    enableScroll={false}
                    renderItem={(liquidityPool) => (
                        <LiquidityPoolCard key={liquidityPool.id} liquidityPool={liquidityPool}/>
                    )}
                />
            </KaniCardBody>
        </KaniCard>
    )
}