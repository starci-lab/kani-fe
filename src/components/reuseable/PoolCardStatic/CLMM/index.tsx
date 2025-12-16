import { DexId, LiquidityPoolSchema, TokenId } from "@/modules/types"
import { useAppSelector } from "@/redux"
import React, { useMemo } from "react"
import { computeDenomination, roundNumber, tickIndexToPrice } from "@/modules/utils"
import { LiquidityChart } from "@/components/reuseable/charts"
import { KaniChip, KaniDivider } from "@/components/atomic"
import BN from "bn.js"
import Decimal from "decimal.js"
import { getAmountsFromLiquidity } from "@/modules/math"
import { Spacer } from "@heroui/react"

export interface CLMMProps {
    liquidityPool: LiquidityPoolSchema;
}

export const CLMM = ({ liquidityPool }: CLMMProps) => {
    const dynamicLiquidityPoolInfos = useAppSelector((state) => state.dynamic.dynamicLiquidityPoolInfos)
    const dynamicLiquidityPoolInfo = useMemo(() => {
        return dynamicLiquidityPoolInfos.find(
            (dynamicLiquidityPoolInfo) => dynamicLiquidityPoolInfo.id === liquidityPool.id
        )
    }, [dynamicLiquidityPoolInfos, liquidityPool.id])
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = useMemo(
        () => tokens.find((token) => token.id === liquidityPool.tokenA),
        [tokens, liquidityPool.tokenA]
    )
    const tokenB = useMemo(
        () => tokens.find((token) => token.id === liquidityPool.tokenB),
        [tokens, liquidityPool.tokenB]
    )
    const dexes = useAppSelector((state) => state.static.dexes)
    const dex = useMemo(
        () => dexes.find((dex) => dex.id === liquidityPool.dex),
        [dexes, liquidityPool.dex]
    )
    const activePosition = useAppSelector((state) => state.bot.bot?.activePosition)    
    const tickLower = useMemo(() => {
        return activePosition?.tickLower
    }, [activePosition])
    const tickUpper = useMemo(() => {
        return activePosition?.tickUpper
    }, [activePosition])
    const tickCurrent = useMemo(() => {
        return dynamicLiquidityPoolInfo?.tickCurrent
    }, [dynamicLiquidityPoolInfo])
    const tickLowerPrice = useMemo(() => {
        return tickIndexToPrice(tickLower ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0 )
    }, [tickLower, tokenA?.decimals, tokenB?.decimals])
    const tickUpperPrice = useMemo(() => {
        return tickIndexToPrice(tickUpper ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0 )
    }, [tickUpper, tokenA?.decimals, tokenB?.decimals])
    const currentPrice = useMemo(() => {
        return tickIndexToPrice(dynamicLiquidityPoolInfo?.tickCurrent ?? 0, tokenA?.decimals ?? 0, tokenB?.decimals ?? 0 )
    }, [dynamicLiquidityPoolInfo?.tickCurrent, tokenA?.decimals, tokenB?.decimals])
    const isInRange = useMemo(() => {
        return currentPrice.gte(tickLowerPrice) && currentPrice.lte(tickUpperPrice)
    }, [currentPrice, tickLowerPrice, tickUpperPrice])
    const { amountA, amountB } = useMemo(() => {
        return getAmountsFromLiquidity({
            liquidity: new BN(
                activePosition?.liquidity ?? 0
            ),
            tickLower: new Decimal(tickLower || 0),
            tickUpper: new Decimal(tickUpper || 0),
            tickCurrent: new Decimal(tickCurrent || 0),
            dex: dex?.displayId || DexId.Raydium,
        })
    }, [activePosition?.liquidity, tickLowerPrice, tickUpperPrice, currentPrice, dex])
    const amountAFormatted = useMemo(() => {
        return computeDenomination(amountA, tokenA?.decimals ?? 0)
    }, [amountA, tokenA?.decimals])
    const amountBFormatted = useMemo(() => {
        return computeDenomination(amountB, tokenB?.decimals ?? 0)
    }, [amountB, tokenB?.decimals])
    const tokenPrices = useAppSelector((state) => state.socket.tokenPrices)
    console.log(tokenPrices)
    const tokenPriceA = useMemo(() => {
        return tokenPrices[tokenA?.displayId || TokenId.SolUsdc] ?? 0
    }, [tokenPrices, tokenA?.displayId])
    const tokenPriceB = useMemo(() => {
        return tokenPrices[tokenB?.displayId || TokenId.SolUsdc] ?? 0
    }, [tokenPrices, tokenB?.displayId])
    const amountAValue = useMemo(() => {
        return amountAFormatted.mul(tokenPriceA)
    }, [amountAFormatted, tokenPriceA])
    const amountBValue = useMemo(() => {
        return amountBFormatted.mul(tokenPriceB)
    }, [amountBFormatted, tokenPriceB])
    const totalBalance = useMemo(() => {
        return amountAValue.add(amountBValue)
    }, [amountAValue, amountBValue])
    return (
        <div>
            <div className="grid place-items-center gap-3">
                <div className="text-xs">
                    Price: {roundNumber(currentPrice.toNumber())}
                </div>
                <LiquidityChart
                    priceLower={tickLowerPrice.toNumber()}
                    priceUpper={tickUpperPrice.toNumber()}
                    currentPrice={currentPrice.toNumber()}
                />
                <div className="flex items-center gap-2">
                    <div className="text-xs">
                        {roundNumber(tickLowerPrice.toNumber())} - {roundNumber(tickUpperPrice.toNumber())} <span className="text-secondary">{tokenB?.symbol}</span> per <span className="text-secondary">{tokenA?.symbol}</span>
                    </div>
                    <KaniChip
                        color={isInRange ? "primary" : "danger"}
                        size="sm"
                        variant="flat"
                    >
                        {isInRange ? "In Range" : "Out of Range"}
                    </KaniChip>
                </div>
            </div>
            <Spacer y={6} />
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground-500">Liquidity</div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm">${totalBalance.toString()}</div>
                        <KaniDivider orientation="vertical" className="h-5"/>
                        <KaniChip variant="flat">
                            {computeDenomination(amountA, tokenA?.decimals ?? 0).toString()} {tokenA?.symbol}
                        </KaniChip>
                        <KaniChip variant="flat">
                            {computeDenomination(amountB, tokenB?.decimals ?? 0).toString()} {tokenB?.symbol}
                        </KaniChip>
                    </div>
                </div>
            </div>
        </div>
    )
}