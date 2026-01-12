import { LiquidityPoolSchema, TokenId } from "@/modules/types"
import { useAppSelector } from "@/redux"
import React, { useMemo } from "react"
import { binIdToPrice, roundNumber } from "@/modules/utils"
import { LiquidityChart } from "../../../../../../reuseable/charts"
import { KaniChip, KaniDivider, KaniSkeleton, KaniSpinner } from "../../../../../../atomic"
import Decimal from "decimal.js"
import { Spacer } from "@heroui/react"
import { useQueryFeesV2Swr, useQueryLiquidityPools2ActivePositionSwr, useQueryReservesV2Swr } from "@/hooks/singleton"
import numeral from "numeral"

export interface DLMMProps {
    liquidityPool?: LiquidityPoolSchema;
}

export const DLMM = (
    { liquidityPool }: DLMMProps
) => {
    const queryLiquidityPools2ActivePositionSwr = useQueryLiquidityPools2ActivePositionSwr()
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
    const minBinId = useMemo(() => {
        return new Decimal(activePosition?.minBinId ?? 0)
    }, [activePosition])
    const maxBinId = useMemo(() => {
        return new Decimal(activePosition?.maxBinId ?? 0)
    }, [activePosition])
    const activeId = useMemo(() => {
        return new Decimal(liquidityPool?.dynamicInfo?.activeId ?? 0)
    }, [activePosition])
    const isInRange = useMemo(() => {
        return activeId && activeId.gte(minBinId) && activeId.lte(maxBinId)
    }, [activeId, minBinId, maxBinId])
    const minBinIdPrice = useMemo(() => {
        return binIdToPrice({ binId: minBinId, binStep: new Decimal(liquidityPool?.binStep ?? 0), basisPointMax: new Decimal(liquidityPool?.basisPointMax ?? 0      ), decimalsA: new Decimal(tokenA?.decimals ?? 0), decimalsB: new Decimal(tokenB?.decimals ?? 0) })
    }, [minBinId, liquidityPool?.binStep, liquidityPool?.basisPointMax, tokenA?.decimals, tokenB?.decimals])
    const maxBinIdPrice = useMemo(() => {
        return binIdToPrice({ binId: maxBinId, binStep: new Decimal(liquidityPool?.binStep ?? 0), basisPointMax: new Decimal(liquidityPool?.basisPointMax ?? 0  ), decimalsA: new Decimal(tokenA?.decimals ?? 0), decimalsB: new Decimal(tokenB?.decimals ?? 0) })
    }, [maxBinId, liquidityPool?.binStep, liquidityPool?.basisPointMax, tokenA?.decimals, tokenB?.decimals])
    const activeIdPrice = useMemo(() => {
        return binIdToPrice({ binId: activeId, binStep: new Decimal(liquidityPool?.binStep ?? 0), basisPointMax: new Decimal(liquidityPool?.basisPointMax ?? 0  ), decimalsA: new Decimal(tokenA?.decimals ?? 0), decimalsB: new Decimal(tokenB?.decimals ?? 0) })
    }, [activeId, liquidityPool?.binStep, liquidityPool?.basisPointMax, tokenA?.decimals, tokenB?.decimals])
    const tokenPrices = useAppSelector((state) => state.socket.tokenPrices)
    const tokenPriceA = useMemo(() => {
        return tokenPrices[tokenA?.displayId || TokenId.SolUsdc] ?? 0
    }, [tokenPrices, tokenA?.displayId])
    const tokenPriceB = useMemo(() => {
        return tokenPrices[tokenB?.displayId || TokenId.SolUsdc] ?? 0
    }, [tokenPrices, tokenB?.displayId])
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
        return tokenAReserves.mul(tokenPriceA).add(tokenBReserves.mul(tokenPriceB))
    }, [tokenAReserves, tokenBReserves, tokenPriceA, tokenPriceB])
    const isLoading = useMemo(() => {
        return queryLiquidityPools2ActivePositionSwr.isLoading || !liquidityPool
    }, [queryLiquidityPools2ActivePositionSwr.isLoading, liquidityPool])
    return (
        <>
            {!isLoading ?
                <div>
            <div className="grid place-items-center gap-3">
                <div className="text-xs">
                    Price: {roundNumber(activeIdPrice.toNumber())}
                </div>
                <LiquidityChart
                    priceLower={minBinIdPrice.toNumber()}
                    priceUpper={maxBinIdPrice.toNumber()}
                    currentPrice={activeIdPrice.toNumber()}
                />
                <div className="flex items-center gap-2">
                    <div className="text-xs">
                        {roundNumber(minBinIdPrice.toNumber())} - {roundNumber(maxBinIdPrice.toNumber())} <span className="text-secondary">{tokenB?.symbol}</span> per <span className="text-secondary">{tokenA?.symbol}</span>
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
                    <div className="flex items-center gap-2">
                        <div className="text-sm">${numeral(totalFees.toNumber()).format("0,0.00000")}</div>
                        <KaniDivider orientation="vertical" className="h-5"/>
                        <KaniChip variant="flat">
                            {tokenAFees.toNumber()} {tokenA?.symbol}
                        </KaniChip>
                        <KaniChip variant="flat">
                            {tokenBFees.toNumber()} {tokenB?.symbol}
                        </KaniChip>
                    </div>
                    : <KaniSkeleton className="h-[28px] w-[120px] rounded-md"/>
                    }
                </div>
            </div> 
            <Spacer y={3} />
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground-500">Liquidity</div>
                    {
                        (isLoading || queryReservesV2Swr.isLoading || !queryReservesV2Swr.data) ?
                    <div className="flex items-center gap-2">
                        <div className="text-sm">${numeral(totalReservesInUsd.toNumber()).format("0,0.00000")}</div>
                        <KaniDivider orientation="vertical" className="h-5"/>
                        <KaniChip variant="flat">
                            {tokenAReserves.toNumber()} {tokenA?.symbol}
                        </KaniChip>
                        <KaniChip variant="flat">
                            {tokenBReserves.toNumber()} {tokenB?.symbol}
                        </KaniChip>
                    </div>
                    : <KaniSkeleton className="h-[28px] w-[120px] rounded-md"/>
                    }
                </div>
            </div> 
        </>
    )
}