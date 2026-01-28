import { LiquidityPoolSchema } from "@/modules/types"
import { DynamicClmmLiquidityPoolInfoCacheResult, useAppSelector } from "@/redux"
import React, { useMemo } from "react"
import { round, tickIndexToPrice } from "@/modules/utils"
import { LiquidityChart } from "@/components/reuseable/charts"
import { KaniChip, KaniDivider, KaniSkeleton, KaniSpinner } from "@/components/atomic"
import Decimal from "decimal.js"
import { Spacer } from "@heroui/react"
import {
    useQueryFeesV2Swr,
    useQueryLiquidityPoolsActivePositionSwr,
    useQueryReservesV2Swr
} from "@/hooks/singleton"
import numeral from "numeral"

export interface CLMMProps {
    liquidityPool?: LiquidityPoolSchema;
}

export const CLMM = ({ liquidityPool }: CLMMProps) => {
    const queryliquidityPoolsActivePositionSwr = useQueryLiquidityPoolsActivePositionSwr()
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = useMemo(
        () => tokens.find((token) => token.id === liquidityPool?.tokenA),
        [tokens, liquidityPool?.tokenA]
    )
    const tokenB = useMemo(
        () => tokens.find((token) => token.id === liquidityPool?.tokenB),
        [tokens, liquidityPool?.tokenB]
    )
    const activePosition = useAppSelector((state) => state.bot.bot?.activePosition)
    const tickLower = useMemo(() => {
        return activePosition?.associatedPosition?.clmmState?.tickLower
    }, [activePosition])
    const tickUpper = useMemo(() => {
        return activePosition?.associatedPosition?.clmmState?.tickUpper
    }, [activePosition])
    const dynamicLiquidityPoolInfos = useAppSelector((state) => state.socket.dynamicLiquidityPoolInfos)
    const tickCurrent = useMemo(() => {
        const dynamicLiquidityPoolInfo = dynamicLiquidityPoolInfos
        [activePosition?.liquidityPool ?? ""] as DynamicClmmLiquidityPoolInfoCacheResult
        return dynamicLiquidityPoolInfo?.tickCurrent.toNumber()
    }, [activePosition, dynamicLiquidityPoolInfos])
    const tickLowerPrice = useMemo(() => {
        return tickIndexToPrice(tickLower ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0)
    }, [tickLower, tokenA?.decimals, tokenB?.decimals])
    const tickUpperPrice = useMemo(() => {
        return tickIndexToPrice(tickUpper ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0)
    }, [tickUpper, tokenA?.decimals, tokenB?.decimals])
    const currentPrice = useMemo(() => {
        return tickIndexToPrice(tickCurrent ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0)
    }, [tickCurrent, tokenA?.decimals, tokenB?.decimals])
    const isInRange = useMemo(() => {
        return currentPrice.gte(tickLowerPrice) && currentPrice.lte(tickUpperPrice)
    }, [currentPrice, tickLowerPrice, tickUpperPrice])
    const tokenPrices = useAppSelector((state) => state.socket.prices)
    const tokenPriceA = useMemo(() => {
        return tokenPrices[tokenA?.id ?? ""] ?? 0
    }, [tokenPrices, tokenA?.id])
    const tokenPriceB = useMemo(() => {
        return tokenPrices[tokenB?.id ?? ""] ?? 0
    }, [tokenPrices, tokenB?.id])
    const queryFeesV2Swr = useQueryFeesV2Swr()
    const tokenAFees = useMemo(() => {
        return new Decimal(queryFeesV2Swr?.data?.data?.feesV2.data?.tokenA ?? 0)
    }, [queryFeesV2Swr?.data?.data?.feesV2.data?.tokenA])
    const tokenBFees = useMemo(() => {
        return new Decimal(queryFeesV2Swr?.data?.data?.feesV2.data?.tokenB ?? 0)
    }, [queryFeesV2Swr?.data?.data?.feesV2.data?.tokenB])
    const totalFees = useMemo(() => {
        return tokenAFees.add(tokenBFees)
    }, [tokenAFees, tokenBFees])
    const queryReservesV2Swr = useQueryReservesV2Swr()
    const tokenAReserves = useMemo(() => {
        return new Decimal(queryReservesV2Swr?.data?.data?.reservesV2.data?.tokenA ?? 0)
    }, [queryReservesV2Swr?.data?.data?.reservesV2.data?.tokenA])
    const tokenBReserves = useMemo(() => {
        return new Decimal(queryReservesV2Swr?.data?.data?.reservesV2.data?.tokenB ?? 0)
    }, [queryReservesV2Swr?.data?.data?.reservesV2.data?.tokenB])
    const totalReservesInUsd = useMemo(() => {
        return tokenAReserves.mul(new Decimal(tokenPriceA.price ?? 0)).add(tokenBReserves.mul(new Decimal(tokenPriceB.price ?? 0)))
    }, [tokenAReserves, tokenBReserves, tokenPriceA.price, tokenPriceB.price])
    const isLoading = useMemo(() => {
        return queryliquidityPoolsActivePositionSwr.isLoading || !liquidityPool
    }, [queryliquidityPoolsActivePositionSwr.isLoading, liquidityPool])
    return (
        <>
            {!isLoading ?
                <div>
                    <div className="grid place-items-center gap-3">
                        <div className="text-xs">
                            Price: {round(currentPrice).toNumber()}
                        </div>
                        <LiquidityChart
                            priceLower={tickLowerPrice}
                            priceUpper={tickUpperPrice}
                            currentPrice={currentPrice}
                        />
                        <div className="flex items-center gap-2">
                            <div className="text-xs">
                                {round(tickLowerPrice).toNumber()} - {round(tickUpperPrice).toNumber()} <span className="text-secondary">{tokenB?.symbol}</span> per <span className="text-secondary">{tokenA?.symbol}</span>
                            </div>
                            <KaniChip
                                color={isInRange ? "success" : "danger"}
                                size="sm"
                                variant="flat"
                            >
                                {isInRange ? "In Range" : "Out of Range"}
                            </KaniChip>
                        </div>
                    </div>
                </div>
                : <div className="h-[120px] grid place-items-center">
                    <KaniSpinner />
                </div>
            }
            <Spacer y={6} />
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground-500">Yield</div>
                    {
                        (isLoading || queryFeesV2Swr.isLoading || !queryFeesV2Swr.data) ?
                            <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                            :
                            <div className="flex items-center gap-2">
                                <div className="text-sm">${numeral(totalFees.toNumber()).format("0,0.00000")}</div>
                                <KaniDivider orientation="vertical" className="h-5" />
                                <KaniChip variant="flat">
                                    {tokenAFees.toNumber()} {tokenA?.symbol}
                                </KaniChip>
                                <KaniChip variant="flat">
                                    {tokenBFees.toNumber()} {tokenB?.symbol}
                                </KaniChip>
                            </div>
                    }
                </div>
            </div>
            <Spacer y={3} />
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground-500">Liquidity</div>
                    {
                        (isLoading || queryReservesV2Swr.isLoading || !queryReservesV2Swr.data) ?
                            <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                            :
                            <div className="flex items-center gap-2">
                                <div className="text-sm">${numeral(totalReservesInUsd.toNumber()).format("0,0.00000")}</div>
                                <KaniDivider orientation="vertical" className="h-5" />
                                <KaniChip variant="flat">
                                    {tokenAReserves.toNumber()} {tokenA?.symbol}
                                </KaniChip>
                                <KaniChip variant="flat">
                                    {tokenBReserves.toNumber()} {tokenB?.symbol}
                                </KaniChip>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}