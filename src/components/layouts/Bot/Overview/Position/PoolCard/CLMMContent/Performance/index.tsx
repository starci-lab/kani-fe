import React, { useMemo } from "react"
import { PerformanceDisplayMode } from "@/modules/types"
import { updateBotPerformanceDisplayMode, useAppSelector } from "@/redux"
import { KaniSkeleton } from "../../../../../../../atomic"
import { TooltipTitle, UnitDropdown } from "../../../../../../../reuseable"
import { useUpdateBotPerformanceDisplayModeV2SwrMutation, useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"
import { useAppDispatch } from "@/redux"
import { computePercentage, round } from "@/modules/utils"
import Decimal from "decimal.js"

export const Performance = () => {
    const updateBotPerformanceDisplayModeV2SwrMutation =
        useUpdateBotPerformanceDisplayModeV2SwrMutation()
    const dispatch = useAppDispatch()
    const bot = useAppSelector((state) => state.bot.bot)
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenPrices = useAppSelector((state) => state.socket.prices)
    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()

    const activePosition = useAppSelector(
        (state) => state.bot.bot?.activePosition,
    )
    const liquidityPool = activePosition?.associatedLiquidityPool
    const tokenA = useMemo(
        () => tokens.find((token) => token.id === liquidityPool?.tokenA),
        [tokens, liquidityPool?.tokenA],
    )
    const tokenB = useMemo(
        () => tokens.find((token) => token.id === liquidityPool?.tokenB),
        [tokens, liquidityPool?.tokenB],
    )

    const tokenPriceA = useMemo(() => {
        return tokenPrices[tokenA?.id ?? ""] ?? 0
    }, [tokenPrices, tokenA?.id])
    const tokenPriceB = useMemo(() => {
        return tokenPrices[tokenB?.id ?? ""] ?? 0
    }, [tokenPrices, tokenB?.id])

    const tokenAFee = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA ??
            0,
        )
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA])
    const tokenBFee = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB ??
            0,
        )
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB])
    const totalFeesInUsdDecimal = useMemo(() => {
        return tokenAFee
            .add(tokenBFee)
            .mul(new Decimal(tokenPriceA.price ?? 0))
            .add(tokenBFee.mul(new Decimal(tokenPriceB.price ?? 0)))
    }, [tokenAFee, tokenBFee, tokenPriceA.price, tokenPriceB.price])
    const tokenAReserve = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data
                ?.reserveA ?? 0,
        )
    }, [
        queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveA,
    ])
    const tokenBReserve = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data
                ?.reserveB ?? 0,
        )
    }, [
        queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveB,
    ])
    const totalReservesInUsdDecimal = useMemo(() => {
        return tokenAReserve
            .mul(new Decimal(tokenPriceA.price ?? 0))
            .add(tokenBReserve.mul(new Decimal(tokenPriceB.price ?? 0)))
    }, [tokenAReserve, tokenBReserve, tokenPriceA.price, tokenPriceB.price])
    const rewards = useMemo(() => {
        return Object.entries(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data
                ?.rewards ?? {},
        )
    }, [
        queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.rewards,
    ])
    const totalRewardsInUsdDecimal = useMemo(() => {
        return rewards
            .map(([tokenId, reward]) => {
                return new Decimal(reward).mul(
                    new Decimal(tokenPrices[tokenId]?.price ?? 0),
                )
            })
            .reduce((acc, reward) => {
                return acc.add(reward)
            }, new Decimal(0))
    }, [rewards, tokenPrices])

    const totalReservesInTarget = useMemo(() => {
        if (!tokenPriceA.price || !tokenPriceB.price) {
            return new Decimal(0)
        }
        return tokenAReserve.add(
            tokenBReserve.mul(
                new Decimal(tokenPriceB.price).div(new Decimal(tokenPriceA.price)),
            ),
        )
    }, [tokenAReserve, tokenBReserve, tokenPriceA.price, tokenPriceB.price])
    const totalFeesInTarget = useMemo(() => {
        if (!tokenPriceA.price || !tokenPriceB.price) {
            return new Decimal(0)
        }
        return tokenAFee
            .add(tokenBFee)
            .mul(new Decimal(tokenPriceA.price).div(new Decimal(tokenPriceB.price)))
    }, [tokenAFee, tokenBFee, tokenPriceA.price, tokenPriceB.price])
    const totalRewardsInTarget = useMemo(() => {
        return rewards
            .map(([tokenId, reward]) => {
                return new Decimal(reward).mul(
                    new Decimal(tokenPrices[tokenId]?.price ?? 0).div(
                        new Decimal(tokenPrices[tokenId]?.price ?? 0),
                    ),
                )
            })
            .reduce((acc, reward) => {
                return acc.add(reward)
            }, new Decimal(0))
    }, [rewards, tokenPrices])

    const [pnlString, isPositivePnl] = useMemo(() => {
        const totalInTarget = totalReservesInTarget
            .add(totalFeesInTarget)
            .add(totalRewardsInTarget)
        const prev =
            bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue ?? 0
        const pnlDecimal = new Decimal(totalInTarget.sub(prev))
        const isPositivePnl24h = pnlDecimal.isPositive()
        const pnl = `${isPositivePnl24h ? "+" : "-"}${round(pnlDecimal.abs())} ${tokenA?.symbol}`
        return [pnl, isPositivePnl24h]
    }, [
        bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue,
        totalReservesInTarget,
        totalFeesInTarget,
        totalRewardsInTarget,
        tokenA?.symbol,
    ])
    const [roiString, isPositiveRoi] = useMemo(() => {
        const totalInTarget = totalReservesInTarget
            .add(totalFeesInTarget)
            .add(totalRewardsInTarget)
        const prev =
            bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue ?? 0
        const isPositiveRoi24h = new Decimal(
            totalInTarget.sub(prev).div(prev),
        ).isPositive()
        const roiDecimal = computePercentage({
            numerator: new Decimal(totalInTarget.sub(prev)),
            denominator: new Decimal(prev),
        }).abs()
        const roi = `${isPositiveRoi24h ? "+" : "-"}${round(roiDecimal)}%`
        return [roi, isPositiveRoi24h]
    }, [
        bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue,
        totalReservesInTarget,
        totalFeesInTarget,
        totalRewardsInTarget,
    ])
    const [pnlInUsdString, isPositivePnlInUsd] = useMemo(() => {
        const totalInUsd = totalReservesInUsdDecimal
            .add(totalFeesInUsdDecimal)
            .add(totalRewardsInUsdDecimal)
        const prev =
            bot?.activePosition?.associatedPosition?.openSnapshot
                ?.positionValueInUsd ?? 0
        const pnlInUsdDecimal = new Decimal(totalInUsd.sub(prev))
        const isPositivePnlInUsd = pnlInUsdDecimal.isPositive()
        const pnlInUsd = `${isPositivePnlInUsd ? "+" : "-"}${round(pnlInUsdDecimal.abs())} USD`
        return [pnlInUsd, isPositivePnlInUsd]
    }, [
        bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd,
        totalReservesInUsdDecimal,
        totalFeesInUsdDecimal,
        totalRewardsInUsdDecimal,
    ])
    const [roiInUsdString, isPositiveRoiInUsd] = useMemo(() => {
        const totalInUsd = totalReservesInUsdDecimal
            .add(totalFeesInUsdDecimal)
            .add(totalRewardsInUsdDecimal)
        const prev =
            bot?.activePosition?.associatedPosition?.openSnapshot
                ?.positionValueInUsd ?? 0
        const isPositiveRoiInUsd = new Decimal(
            totalInUsd.sub(prev).div(prev),
        ).isPositive()
        const roiInUsdDecimal = computePercentage({
            numerator: new Decimal(totalInUsd.sub(prev)),
            denominator: new Decimal(prev),
        }).abs()
        const roiInUsd = `${isPositiveRoiInUsd ? "+" : "-"}${round(roiInUsdDecimal)}%`
        return [roiInUsd, isPositiveRoiInUsd]
    }, [
        bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd,
        totalReservesInUsdDecimal,
        totalFeesInUsdDecimal,
        totalRewardsInUsdDecimal,
    ])
    const targetToken = useMemo(
        () => tokens.find((token) => token.id === bot?.targetToken),
        [tokens, bot?.targetToken],
    )

    if (!targetToken) {
        return null
    }
    if (!bot) {
        return null
    }

    const isLoading = queryReservesWithFeesV2Swr.isLoading
    const hasData = !!queryReservesWithFeesV2Swr.data

    return (
        <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
                <div className="flex justify-between items-center gap-2">
                    <TooltipTitle
                        classNames={{
                            title: "text-sm text-foreground-500",
                        }}
                        title="ROI"
                        tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                    />
                    {isLoading || !hasData ? (
                        <KaniSkeleton className="h-[20px] w-[60px] rounded-md" />
                    ) : (
                        <div
                            className={`text-sm ${bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? (isPositiveRoiInUsd ? "text-success" : "text-danger") : isPositiveRoi ? "text-success" : "text-danger"}`}
                        >
                            {bot.performanceDisplayMode === PerformanceDisplayMode.Usd
                                ? roiInUsdString
                                : roiString}
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center gap-2">
                    <TooltipTitle
                        classNames={{
                            title: "text-sm text-foreground-500",
                        }}
                        title="PNL"
                        tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                    />
                    {isLoading || !hasData ? (
                        <KaniSkeleton className="h-[20px] w-[60px] rounded-md" />
                    ) : (
                        <div
                            className={`text-sm ${bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? (isPositivePnlInUsd ? "text-success" : "text-danger") : isPositivePnl ? "text-success" : "text-danger"}`}
                        >
                            {bot.performanceDisplayMode === PerformanceDisplayMode.Usd
                                ? pnlInUsdString
                                : pnlString}
                        </div>
                    )}
                </div>
            </div>
            <UnitDropdown
                targetToken={targetToken}
                value={bot.performanceDisplayMode}
                onValueChange={async (value) => {
                    // optimistic update
                    dispatch(
                        updateBotPerformanceDisplayMode({
                            id: bot.id,
                            performanceDisplayMode: value,
                        }),
                    )
                    // update server
                    await updateBotPerformanceDisplayModeV2SwrMutation.trigger({
                        request: {
                            id: bot.id,
                            performanceDisplayMode: value,
                        },
                    })
                }}
            />
        </div>
    )
}
