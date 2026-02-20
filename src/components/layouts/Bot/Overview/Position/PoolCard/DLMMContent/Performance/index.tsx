import React, { useMemo } from "react"
import { PerformanceDisplayMode, TokenType } from "@/modules/types"
import { updateBotPerformanceDisplayMode, useAppSelector } from "@/redux"
import { KaniSkeleton } from "../../../../../../../atomic"
import { TooltipTitle, UnitDropdown } from "../../../../../../../reuseable"
import {
    useUpdateBotPerformanceDisplayModeV2SwrMutation,
    useQueryReservesWithFeesV2Swr,
} from "@/hooks/singleton"
import { useAppDispatch } from "@/redux"
import { computePercentage, round, toDecimalAmount } from "@/modules/utils"
import Decimal from "decimal.js"
import BN from "bn.js"

export const Performance = () => {
    const updateBotPerformanceDisplayModeV2SwrMutation =
    useUpdateBotPerformanceDisplayModeV2SwrMutation()
    const dispatch = useAppDispatch()

    const bot = useAppSelector((state) => state.bot.bot)
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenPrices = useAppSelector((state) => state.socket.prices)

    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()
    const activePosition = useAppSelector((state) => state.bot.bot?.activePosition)

    // ===== Base tokens / pool =====
    const nativeToken = useMemo(() => {
        return tokens.find(
            (token) => token.type === TokenType.Native && token.chainId === bot?.chainId,
        )
    }, [tokens, bot?.chainId])

    const liquidityPool = activePosition?.associatedLiquidityPool

    const targetIsA = useMemo(() => {
        return bot?.targetToken === liquidityPool?.tokenA
    }, [bot?.targetToken, liquidityPool?.tokenA])

    const tokenA = useMemo(() => {
        return tokens.find((token) => token.id === liquidityPool?.tokenA)
    }, [tokens, liquidityPool?.tokenA])

    const tokenB = useMemo(() => {
        return tokens.find((token) => token.id === liquidityPool?.tokenB)
    }, [tokens, liquidityPool?.tokenB])

    const tokenPriceA = useMemo(() => {
        return tokenPrices[tokenA?.id ?? ""] ?? { price: 0 }
    }, [tokenPrices, tokenA?.id])

    const tokenPriceB = useMemo(() => {
        return tokenPrices[tokenB?.id ?? ""] ?? { price: 0 }
    }, [tokenPrices, tokenB?.id])

    const priceA = useMemo(() => new Decimal(tokenPriceA.price ?? 0), [tokenPriceA.price])
    const priceB = useMemo(() => new Decimal(tokenPriceB.price ?? 0), [tokenPriceB.price])
    const priceNative = useMemo(
        () => new Decimal(tokenPrices[nativeToken?.id ?? ""]?.price ?? 0),
        [tokenPrices, nativeToken?.id],
    )

    const targetSymbol = useMemo(() => {
        return targetIsA ? tokenA?.symbol : tokenB?.symbol
    }, [targetIsA, tokenA?.symbol, tokenB?.symbol])

    // helpers: convert token amount -> USD, token amount -> target
    const toUsd = useMemo(() => {
        return (amount: Decimal, price: Decimal) => amount.mul(price)
    }, [])

    const toTargetFromA = useMemo(() => {
        return (amountA: Decimal) => {
            if (targetIsA) return amountA
            // A -> B: amountA * (priceA/priceB)
            if (priceA.lte(0) || priceB.lte(0)) return new Decimal(0)
            return amountA.mul(priceA.div(priceB))
        }
    }, [targetIsA, priceA, priceB])

    const toTargetFromB = useMemo(() => {
        return (amountB: Decimal) => {
            if (!targetIsA) return amountB
            // B -> A: amountB * (priceB/priceA)
            if (priceA.lte(0) || priceB.lte(0)) return new Decimal(0)
            return amountB.mul(priceB.div(priceA))
        }
    }, [targetIsA, priceA, priceB])

    const toTargetFromUsd = useMemo(() => {
        return (usd: Decimal) => {
            if (usd.lte(0)) return new Decimal(0)
            if (targetIsA) {
                if (priceA.lte(0)) return new Decimal(0)
                return usd.div(priceA)
            }
            if (priceB.lte(0)) return new Decimal(0)
            return usd.div(priceB)
        }
    }, [targetIsA, priceA, priceB])

    // ===== Rent: rent -> rentInUsd -> rentInTarget =====
    const rentAmount = useMemo(() => {
        return toDecimalAmount({
            amount: new BN(activePosition?.associatedPosition?.rentAmount ?? 0),
            decimals: new Decimal(nativeToken?.decimals ?? 0),
        })
    }, [activePosition?.associatedPosition?.rentAmount, nativeToken?.decimals])

    const rentInUsd = useMemo(() => {
        return toUsd(rentAmount, priceNative)
    }, [rentAmount, toUsd, priceNative])

    const rentInTarget = useMemo(() => {
        return toTargetFromUsd(rentInUsd)
    }, [rentInUsd, toTargetFromUsd])

    // ===== tokenAReserve -> tokenAReserveInTarget -> tokenAReserveInUsd =====
    const tokenAReserve = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveA ?? 0,
        )
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveA])

    const tokenAReserveInTarget = useMemo(() => {
        return toTargetFromA(tokenAReserve)
    }, [tokenAReserve, toTargetFromA])

    const tokenAReserveInUsd = useMemo(() => {
        return toUsd(tokenAReserve, priceA)
    }, [tokenAReserve, toUsd, priceA])
    // ===== tokenBReserve -> tokenBReserveInTarget -> tokenBReserveInUsd =====
    const tokenBReserve = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveB ?? 0,
        )
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveB])

    const tokenBReserveInTarget = useMemo(() => {
        return toTargetFromB(tokenBReserve)
    }, [tokenBReserve, toTargetFromB])

    const tokenBReserveInUsd = useMemo(() => {
        return toUsd(tokenBReserve, priceB)
    }, [tokenBReserve, toUsd, priceB])
    // ===== tokenAFee -> tokenAFeeInTarget -> tokenAFeeInUsd =====
    const tokenAFee = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA ?? 0,
        )
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA])

    const tokenAFeeInTarget = useMemo(() => {
        return toTargetFromA(tokenAFee)
    }, [tokenAFee, toTargetFromA])

    const tokenAFeeInUsd = useMemo(() => {
        return toUsd(tokenAFee, priceA)
    }, [tokenAFee, toUsd, priceA])

    // ===== tokenBFee -> tokenBFeeInTarget -> tokenBFeeInUsd =====
    const tokenBFee = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB ?? 0,
        )
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB])

    const tokenBFeeInTarget = useMemo(() => {
        return toTargetFromB(tokenBFee)
    }, [tokenBFee, toTargetFromB])

    const tokenBFeeInUsd = useMemo(() => {
        return toUsd(tokenBFee, priceB)
    }, [tokenBFee, toUsd, priceB])
    // ===== rewards -> rewardsInUsd -> rewardsInTarget =====
    const rewards = useMemo(() => {
        return Object.entries(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.rewards ?? {},
        )
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.rewards])

    const rewardsInUsd = useMemo(() => {
        return rewards
            .map(([tokenId, reward]) => {
                const amount = new Decimal(reward ?? 0)
                const p = new Decimal(tokenPrices[tokenId]?.price ?? 0)
                if (amount.lte(0) || p.lte(0)) return new Decimal(0)
                return amount.mul(p)
            })
            .reduce((acc, x) => acc.add(x), new Decimal(0))
    }, [rewards, tokenPrices])

    const rewardsInTarget = useMemo(() => {
        return toTargetFromUsd(rewardsInUsd)
    }, [rewardsInUsd, toTargetFromUsd])

    // ===== Totals: sum of each InUsd / InTarget =====
    const totalReservesInUsd = useMemo(() => {
        return tokenAReserveInUsd.add(tokenBReserveInUsd)
    }, [tokenAReserveInUsd, tokenBReserveInUsd])

    const totalFeesInUsd = useMemo(() => {
        return tokenAFeeInUsd.add(tokenBFeeInUsd)
    }, [tokenAFeeInUsd, tokenBFeeInUsd])

    const totalInUsd = useMemo(() => {
    // note: rent currently not in your original PnL formula; include if you actually want it
        return totalReservesInUsd.add(totalFeesInUsd).add(rewardsInUsd).add(rentInUsd)
    }, [totalReservesInUsd, totalFeesInUsd, rewardsInUsd])

    const totalReservesInTarget = useMemo(() => {
        return tokenAReserveInTarget.add(tokenBReserveInTarget)
    }, [tokenAReserveInTarget, tokenBReserveInTarget])

    const totalFeesInTarget = useMemo(() => {
        return tokenAFeeInTarget.add(tokenBFeeInTarget)
    }, [tokenAFeeInTarget, tokenBFeeInTarget])

    const totalInTarget = useMemo(() => {
    // note: rent currently not in your original PnL formula; include if you actually want it
        return totalReservesInTarget.add(totalFeesInTarget).add(rewardsInTarget).add(rentInTarget)
    }, [totalReservesInTarget, totalFeesInTarget, rewardsInTarget])

    // ===== PNL / ROI strings =====
    const [pnlString, isPositivePnl] = useMemo(() => {
        const prev = bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue ?? 0
        const pnlDecimal = new Decimal(totalInTarget.sub(prev))
        const isPositive = pnlDecimal.greaterThanOrEqualTo(0)
        const pnl = `${isPositive ? "+" : "-"}${round(pnlDecimal.abs())} ${targetSymbol ?? ""}`
        return [pnl, isPositive]
    }, [bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue, totalInTarget, targetSymbol])

    const [roiString, isPositiveRoi] = useMemo(() => {
        const prev = new Decimal(bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue ?? 0)
        if (!prev || new Decimal(prev).lte(0)) return ["+0%", true]
        const diff = new Decimal(totalInTarget.sub(prev))
        const isPositive = diff.greaterThanOrEqualTo(0)

        const roiDecimal = computePercentage({
            numerator: diff,
            denominator: new Decimal(bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue ?? 0),
        }).abs()

        const roi = `${isPositive ? "+" : "-"}${round(roiDecimal)}%`
        return [roi, isPositive]
    }, [bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue, totalInTarget])

    const [pnlInUsdString, isPositivePnlInUsd] = useMemo(() => {
        const prev = new Decimal(bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd ?? 0)
        const pnlUsdDecimal = new Decimal(totalInUsd.sub(prev))
        const isPositive = pnlUsdDecimal.greaterThanOrEqualTo(0)
        const pnlUsd = `${isPositive ? "+" : "-"}${round(pnlUsdDecimal.abs())} USD`
        return [pnlUsd, isPositive]
    }, [bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd, totalInUsd])

    const [roiInUsdString, isPositiveRoiInUsd] = useMemo(() => {
        const prev = new Decimal(bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd ?? 0)
        if (!prev || new Decimal(prev).lte(0)) return ["+0%", true]

        const diff = new Decimal(totalInUsd.sub(prev))
        const isPositive = diff.greaterThanOrEqualTo(0)
        console.log(`diff: ${diff.toString()}, prev: ${prev.toString()}`)
        const roiUsdDecimal = computePercentage({
            numerator: diff,
            denominator: new Decimal(bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd ?? 0),
        }).abs()

        const roiUsd = `${isPositive ? "+" : "-"}${round(roiUsdDecimal)}%`
        return [roiUsd, isPositive]
    }, [bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd, totalInUsd])

    const targetToken = useMemo(() => {
        return tokens.find((token) => token.id === bot?.targetToken)
    }, [tokens, bot?.targetToken])

    if (!targetToken) return null
    if (!bot) return null

    const isLoading = queryReservesWithFeesV2Swr.isLoading
    const hasData = !!queryReservesWithFeesV2Swr.data

    return (
        <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
                <div className="flex justify-between items-center gap-2">
                    <TooltipTitle
                        classNames={{ title: "text-sm text-foreground-500" }}
                        title="ROI"
                        tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                    />
                    {isLoading || !hasData ? (
                        <KaniSkeleton className="h-[20px] w-[60px] rounded-md" />
                    ) : (
                        <div
                            className={`text-sm ${
                                bot.performanceDisplayMode === PerformanceDisplayMode.Usd
                                    ? isPositiveRoiInUsd
                                        ? "text-success"
                                        : "text-danger"
                                    : isPositiveRoi
                                        ? "text-success"
                                        : "text-danger"
                            }`}
                        >
                            {bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? roiInUsdString : roiString}
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center gap-2">
                    <TooltipTitle
                        classNames={{ title: "text-sm text-foreground-500" }}
                        title="PNL"
                        tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                    />
                    {isLoading || !hasData ? (
                        <KaniSkeleton className="h-[20px] w-[60px] rounded-md" />
                    ) : (
                        <div
                            className={`text-sm ${
                                bot.performanceDisplayMode === PerformanceDisplayMode.Usd
                                    ? isPositivePnlInUsd
                                        ? "text-success"
                                        : "text-danger"
                                    : isPositivePnl
                                        ? "text-success"
                                        : "text-danger"
                            }`}
                        >
                            {bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? pnlInUsdString : pnlString}
                        </div>
                    )}
                </div>
            </div>

            <UnitDropdown
                targetToken={targetToken}
                value={bot.performanceDisplayMode}
                onValueChange={async (value) => {
                    dispatch(
                        updateBotPerformanceDisplayMode({
                            id: bot.id,
                            performanceDisplayMode: value,
                        }),
                    )
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