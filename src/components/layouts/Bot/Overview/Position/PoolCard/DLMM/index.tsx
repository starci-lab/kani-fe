import { LiquidityPoolSchema } from "@/modules/types"
import { DynamicDlmmLiquidityPoolInfoCacheResult, useAppSelector } from "@/redux"
import React, { useMemo } from "react"
import { binIdToPrice, roundNumber } from "@/modules/utils"
import { LiquidityChart } from "../../../../../../reuseable/charts"
import { KaniChip, KaniDivider, KaniSkeleton, KaniSpinner } from "../../../../../../atomic"
import Decimal from "decimal.js"
import { Spacer } from "@heroui/react"
import { useQueryFeesV2Swr, useQueryLiquidityPoolsActivePositionSwr, useQueryReservesV2Swr } from "@/hooks/singleton"
import numeral from "numeral"

export interface DLMMProps {
    liquidityPool?: LiquidityPoolSchema;
}

export const DLMM = (
    { liquidityPool }: DLMMProps
) => {
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
    const minBinId = useMemo(() => {
        return new Decimal(activePosition?.associatedPosition?.dlmmState?.minBinId ?? 0)
    }, [activePosition])
    const maxBinId = useMemo(() => {
        return new Decimal(activePosition?.associatedPosition?.dlmmState?.maxBinId ?? 0)
    }, [activePosition])
    const dynamicLiquidityPoolInfos = useAppSelector((state) => state.socket.dynamicLiquidityPoolInfos)
    const activeId = useMemo(() => {
        const dynamicLiquidityPoolInfo = dynamicLiquidityPoolInfos[activePosition?.associatedLiquidityPool?.id ?? ""] as DynamicDlmmLiquidityPoolInfoCacheResult
        return dynamicLiquidityPoolInfo?.activeId.toNumber()
    }, [activePosition, dynamicLiquidityPoolInfos])
    const isInRange = useMemo(() => {
        return activeId && new Decimal(activeId).gte(minBinId) && new Decimal(activeId).lte(maxBinId)
    }, [activeId, minBinId, maxBinId])
    const minBinIdPrice = useMemo(() => {
        return binIdToPrice({ binId: minBinId, binStep: new Decimal(activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0), basisPointMax: new Decimal(activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax ?? 0      ), decimalsA: new Decimal(tokenA?.decimals ?? 0), decimalsB: new Decimal(tokenB?.decimals ?? 0) })
    }, [minBinId, activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0, activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0])
    const maxBinIdPrice = useMemo(() => {
        return binIdToPrice({ binId: maxBinId, binStep: new Decimal(activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0), basisPointMax: new Decimal(activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax ?? 0  ), decimalsA: new Decimal(tokenA?.decimals ?? 0), decimalsB: new Decimal(tokenB?.decimals ?? 0) })
    }, [maxBinId, activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0, activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0])
    const activeIdPrice = useMemo(() => {
        return binIdToPrice({ binId: new Decimal(activeId), binStep: new Decimal(activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0), basisPointMax: new Decimal(activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax ?? 0  ), decimalsA: new Decimal(tokenA?.decimals ?? 0), decimalsB: new Decimal(tokenB?.decimals ?? 0) })
    }, [activeId, activePosition?.associatedLiquidityPool?.dlmmState?.binStep ?? 0, activePosition?.associatedLiquidityPool?.dlmmState?.basisPointMax ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0])
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