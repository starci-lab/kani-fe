import React, { useMemo } from "react"
import { Spacer } from "@heroui/react"
import {
    KaniChip,
    KaniDivider,
    KaniSkeleton,
} from "../../../../../../../atomic"
import Decimal from "decimal.js"
import numeral from "numeral"
import { useAppSelector } from "@/redux"
import { useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"

export const Yield = () => {
    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()
    const tokens = useAppSelector((state) => state.static.tokens)
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

    const tokenAFees = useMemo(() => {
        return new Decimal(queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA ?? 0)
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA])
    const tokenBFees = useMemo(() => {
        return new Decimal(queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB ?? 0)
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB])
    const totalFees = useMemo(() => {
        return tokenAFees.add(tokenBFees)
    }, [tokenAFees, tokenBFees])

    const isLoading = queryReservesWithFeesV2Swr.isLoading
    const hasData = !!queryReservesWithFeesV2Swr.data

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="text-sm text-foreground-500">Yield</div>
                {isLoading || !hasData ? (
                    <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                ) : (
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
                )}
            </div>
            <Spacer y={3} />
        </>
    )
}
