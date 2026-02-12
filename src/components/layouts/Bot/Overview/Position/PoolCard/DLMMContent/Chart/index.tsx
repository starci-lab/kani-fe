import React, { useMemo } from "react"
import { round, binIdToPrice } from "@/modules/utils"
import { LiquidityChart } from "../../../../../../../reuseable"
import { KaniChip, KaniSpinner } from "../../../../../../../atomic"
import Decimal from "decimal.js"
import { useAppSelector } from "@/redux"
import { DynamicDlmmLiquidityPoolInfoCacheResult } from "@/redux"

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

    const minBinId = useMemo(() => {
        return new Decimal(
            activePosition?.associatedPosition?.dlmmState?.minBinId ?? 0,
        )
    }, [activePosition])
    const maxBinId = useMemo(() => {
        return new Decimal(
            activePosition?.associatedPosition?.dlmmState?.maxBinId ?? 0,
        )
    }, [activePosition])
    const dynamicLiquidityPoolInfos = useAppSelector(
        (state) => state.socket.dynamicLiquidityPoolInfos,
    )
    const dynamicLiquidityPoolInfo = useMemo(() => {
        return dynamicLiquidityPoolInfos[
            activePosition?.liquidityPool ?? ""
        ] as DynamicDlmmLiquidityPoolInfoCacheResult
    }, [activePosition, dynamicLiquidityPoolInfos])
    const activeId = useMemo(() => {
        return dynamicLiquidityPoolInfo?.activeId.toNumber()
    }, [dynamicLiquidityPoolInfo])
    const isInRange = useMemo(() => {
        return (
            activeId &&
            new Decimal(activeId).gte(minBinId) &&
            new Decimal(activeId).lte(maxBinId)
        )
    }, [activeId, minBinId, maxBinId])
    const minBinIdPrice = useMemo(() => {
        return binIdToPrice({
            binId: minBinId,
            binStep: new Decimal(
                activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0,
            ),
            basisPointMax: new Decimal(
                activePosition?.associatedLiquidityPool?.dlmmState
                    ?.basisPointMax ?? 0,
            ),
            decimalsA: new Decimal(tokenA?.decimals ?? 0),
            decimalsB: new Decimal(tokenB?.decimals ?? 0),
        })
    }, [
        minBinId,
        activePosition?.associatedLiquidityPool?.dlmmState?.binStep,
        activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax,
        tokenA?.decimals,
        tokenB?.decimals,
    ])
    const maxBinIdPrice = useMemo(() => {
        return binIdToPrice({
            binId: maxBinId,
            binStep: new Decimal(
                activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0,
            ),
            basisPointMax: new Decimal(
                activePosition?.associatedLiquidityPool?.dlmmState
                    ?.basisPointMax ?? 0,
            ),
            decimalsA: new Decimal(tokenA?.decimals ?? 0),
            decimalsB: new Decimal(tokenB?.decimals ?? 0),
        })
    }, [
        maxBinId,
        activePosition?.associatedLiquidityPool?.dlmmState?.binStep,
        activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax,
        tokenA?.decimals,
        tokenB?.decimals,
    ])
    const activeIdPrice = useMemo(() => {
        return binIdToPrice({
            binId: new Decimal(activeId ?? 0),
            binStep: new Decimal(
                activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0,
            ),
            basisPointMax: new Decimal(
                activePosition?.associatedLiquidityPool?.dlmmState
                    ?.basisPointMax ?? 0,
            ),
            decimalsA: new Decimal(tokenA?.decimals ?? 0),
            decimalsB: new Decimal(tokenB?.decimals ?? 0),
        })
    }, [
        activeId,
        activePosition?.associatedLiquidityPool?.dlmmState?.binStep,
        activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax,
        tokenA?.decimals,
        tokenB?.decimals,
    ])

    return (
        <div>
            <div className="grid place-items-center gap-3">
                {dynamicLiquidityPoolInfo ? (
                    <>
                        <div className="text-xs">
                            Price: {round(activeIdPrice)}
                        </div>
                        <LiquidityChart
                            priceLower={minBinIdPrice}
                            priceUpper={maxBinIdPrice}
                            currentPrice={activeIdPrice}
                        />
                        <div className="flex items-center gap-2">
                            <div className="text-xs">
                                {round(minBinIdPrice)} -{" "}
                                {round(maxBinIdPrice)}{" "}
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
