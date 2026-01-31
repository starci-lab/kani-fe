import React, { useMemo } from "react"
import { round, tickIndexToPrice } from "@/modules/utils"
import { LiquidityChart } from "../../../../../../../reuseable"
import { KaniChip, KaniSpinner } from "../../../../../../../atomic"
import { useAppSelector } from "@/redux"
import { DynamicClmmLiquidityPoolInfoCacheResult } from "@/redux"

export const Chart = () => {
    const activePosition = useAppSelector(
        (state) => state.bot.bot?.activePosition,
    )
    const tokens = useAppSelector((state) => state.static.tokens)
    const liquidityPool = activePosition?.associatedLiquidityPool
    const tokenA = useMemo(
        () => tokens.find((token) => token.id === liquidityPool?.tokenA),
        [tokens, liquidityPool?.tokenA],
    )
    const tokenB = useMemo(
        () => tokens.find((token) => token.id === liquidityPool?.tokenB),
        [tokens, liquidityPool?.tokenB],
    )

    const tickLower = useMemo(() => {
        return activePosition?.associatedPosition?.clmmState?.tickLower
    }, [activePosition])
    const tickUpper = useMemo(() => {
        return activePosition?.associatedPosition?.clmmState?.tickUpper
    }, [activePosition])
    const dynamicLiquidityPoolInfos = useAppSelector(
        (state) => state.socket.dynamicLiquidityPoolInfos,
    )
    const dynamicLiquidityPoolInfo = useMemo(() => {
        return dynamicLiquidityPoolInfos[
            activePosition?.liquidityPool ?? ""
        ] as DynamicClmmLiquidityPoolInfoCacheResult
    }, [activePosition, dynamicLiquidityPoolInfos])
    const tickCurrent = useMemo(() => {
        return dynamicLiquidityPoolInfo?.tickCurrent.toNumber()
    }, [dynamicLiquidityPoolInfo])
    const tickLowerPrice = useMemo(() => {
        return tickIndexToPrice(
            tickLower ?? 0,
            tokenA?.decimals ?? 0,
            tokenB?.decimals ?? 0,
        )
    }, [tickLower, tokenA?.decimals, tokenB?.decimals])
    const tickUpperPrice = useMemo(() => {
        return tickIndexToPrice(
            tickUpper ?? 0,
            tokenA?.decimals ?? 0,
            tokenB?.decimals ?? 0,
        )
    }, [tickUpper, tokenA?.decimals, tokenB?.decimals])
    const currentPrice = useMemo(() => {
        return tickIndexToPrice(
            tickCurrent ?? 0,
            tokenA?.decimals ?? 0,
            tokenB?.decimals ?? 0,
        )
    }, [tickCurrent, tokenA?.decimals, tokenB?.decimals])
    const isInRange = useMemo(() => {
        return currentPrice.gte(tickLowerPrice) && currentPrice.lte(tickUpperPrice)
    }, [currentPrice, tickLowerPrice, tickUpperPrice])

    return (
        <div>
            <div className="grid place-items-center gap-3">
                {dynamicLiquidityPoolInfo ? (
                    <>
                        <div className="text-xs">
                            Price: {round(currentPrice)}
                        </div>
                        <LiquidityChart
                            priceLower={tickLowerPrice}
                            priceUpper={tickUpperPrice}
                            currentPrice={currentPrice}
                        />
                        <div className="flex items-center gap-2">
                            <div className="text-xs">
                                {round(tickLowerPrice)} -{" "}
                                {round(tickUpperPrice)}{" "}
                                <span className="text-secondary">{tokenB?.symbol}</span> per{" "}
                                <span className="text-secondary">{tokenA?.symbol}</span>
                            </div>
                            <KaniChip
                                color={isInRange ? "success" : "danger"}
                                size="sm"
                                variant="flat"
                            >
                                {isInRange ? "In Range" : "Out of Range"}
                            </KaniChip>
                        </div>
                    </>
                ) : (
                    <div className="h-[184px] w-full grid place-items-center">
                        <KaniSpinner />
                    </div>
                )}
            </div>
        </div>
    )
}
