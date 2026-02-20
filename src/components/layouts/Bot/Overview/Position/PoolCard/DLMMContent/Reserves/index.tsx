import React, { useMemo } from "react"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../../../../../reuseable"
import {
    KaniChip,
    KaniDivider,
    KaniImage,
    KaniSkeleton,
} from "../../../../../../../atomic"
import Decimal from "decimal.js"
import numeral from "numeral"
import { useAppSelector } from "@/redux"
import { useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"
import { round } from "@/modules/utils"

export const Reserves = () => {
    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenPrices = useAppSelector((state) => state.socket.prices)
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
    
    const isLoading = queryReservesWithFeesV2Swr.isLoading
    const hasData = !!queryReservesWithFeesV2Swr.data

    return (
        <>
            <div className="flex items-center justify-between">
                <TooltipTitle
                    title="Reserves"
                    classNames={{ title: "text-sm text-foreground-500" }}
                    tooltipString="Reserves are the reserves of the pool."
                />
                {isLoading || !hasData ? (
                    <div className="grid grid-cols-[1fr_150px] items-center gap-2">
                        <div className="flex items-center gap-2">
                            <KaniSkeleton className="h-[20px] w-[60px] rounded-md" />
                            <KaniDivider orientation="vertical" className="h-5" />
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <KaniSkeleton className="h-[28px] w-[120px] rounded-full" />
                            <KaniSkeleton className="h-[28px] w-[120px] rounded-full" />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-[1fr_150px] items-center gap-2">
                        <div className="flex items-center gap-2">
                            <div className="text-sm">
                                ${round(totalReservesInUsdDecimal)}
                            </div>
                            <KaniDivider orientation="vertical" className="h-5" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <KaniChip
                                className="ml-auto"
                                variant="flat"
                                startContent={
                                    <KaniImage src={tokenA?.iconUrl} className="w-5 h-5" />
                                }
                            >
                                {round(tokenAReserve)} {tokenA?.symbol}
                            </KaniChip>
                            <KaniChip
                                className="ml-auto"
                                variant="flat"
                                startContent={
                                    <KaniImage src={tokenB?.iconUrl} className="w-5 h-5" />
                                }
                            >
                                {round(tokenBReserve)} {tokenB?.symbol}
                            </KaniChip>
                        </div>
                    </div>
                )}
            </div>
            <Spacer y={3} />
        </>
    )
}
