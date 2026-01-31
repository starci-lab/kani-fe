import React, { useMemo } from "react"
import {
    KaniChip,
    KaniDivider,
    KaniSkeleton,
} from "../../../../../../../atomic"
import Decimal from "decimal.js"
import numeral from "numeral"
import { useAppSelector } from "@/redux"
import { useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"

export const Liquidity = () => {
    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenPrices = useAppSelector((state) => state.socket.prices)
    const activePosition = useAppSelector((state) => state.bot.bot?.activePosition)
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

    const tokenAReserves = useMemo(() => {
        return new Decimal(queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveA ?? 0)
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveA])
    const tokenBReserves = useMemo(() => {
        return new Decimal(queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveB ?? 0)
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveB])
    const totalReservesInUsd = useMemo(() => {
        return tokenAReserves.mul(new Decimal(tokenPriceA.price ?? 0)).add(tokenBReserves.mul(new Decimal(tokenPriceB.price ?? 0)))
    }, [tokenAReserves, tokenBReserves, tokenPriceA.price, tokenPriceB.price])

    const isLoading = queryReservesWithFeesV2Swr.isLoading
    const hasData = !!queryReservesWithFeesV2Swr.data

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-foreground-500">Liquidity</div>
            {isLoading || !hasData ? (
                <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
            ) : (
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
            )}
        </div>
    )
}
