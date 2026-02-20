import React, { useMemo } from "react"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../../../../../reuseable"
import { KaniChip, KaniDivider, KaniImage, KaniSkeleton } from "../../../../../../../atomic"
import Decimal from "decimal.js"
import { useAppSelector } from "@/redux"
import { useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"
import { round } from "@/modules/utils"
import { PerformanceDisplayMode } from "@/modules/types"

export const Fees = () => {
  const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()

  const bot = useAppSelector((state) => state.bot.bot)
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

  const targetIsA = useMemo(() => {
    return bot?.targetToken === liquidityPool?.tokenA
  }, [bot?.targetToken, liquidityPool?.tokenA])

  // keep consistent shape: { price: number }
  const tokenPriceA = useMemo(() => {
    return tokenPrices[tokenA?.id ?? ""] ?? { price: 0 }
  }, [tokenPrices, tokenA?.id])

  const tokenPriceB = useMemo(() => {
    return tokenPrices[tokenB?.id ?? ""] ?? { price: 0 }
  }, [tokenPrices, tokenB?.id])

  const priceA = useMemo(() => new Decimal(tokenPriceA.price ?? 0), [tokenPriceA.price])
  const priceB = useMemo(() => new Decimal(tokenPriceB.price ?? 0), [tokenPriceB.price])

  const targetSymbol = useMemo(() => {
    return targetIsA ? tokenA?.symbol : tokenB?.symbol
  }, [targetIsA, tokenA?.symbol, tokenB?.symbol])

  // helpers
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

  // fees raw
  const tokenAFee = useMemo(() => {
    return new Decimal(queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA ?? 0)
  }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA])

  const tokenBFee = useMemo(() => {
    return new Decimal(queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB ?? 0)
  }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB])

  // fee -> usd (FIX: đúng công thức là A*priceA + B*priceB)
  const tokenAFeeInUsd = useMemo(() => toUsd(tokenAFee, priceA), [tokenAFee, toUsd, priceA])
  const tokenBFeeInUsd = useMemo(() => toUsd(tokenBFee, priceB), [tokenBFee, toUsd, priceB])

  const totalFeesInUsdDecimal = useMemo(() => {
    return tokenAFeeInUsd.add(tokenBFeeInUsd)
  }, [tokenAFeeInUsd, tokenBFeeInUsd])

  // fee -> target
  const tokenAFeeInTarget = useMemo(() => toTargetFromA(tokenAFee), [tokenAFee, toTargetFromA])
  const tokenBFeeInTarget = useMemo(() => toTargetFromB(tokenBFee), [tokenBFee, toTargetFromB])

  const totalFeesInTargetDecimal = useMemo(() => {
    return tokenAFeeInTarget.add(tokenBFeeInTarget)
  }, [tokenAFeeInTarget, tokenBFeeInTarget])

  const totalDisplay = useMemo(() => {
    if (bot?.performanceDisplayMode === PerformanceDisplayMode.Usd) {
      return `$${round(totalFeesInUsdDecimal)}`
    }
    return `${round(totalFeesInTargetDecimal)} ${targetSymbol ?? ""}`
  }, [bot?.performanceDisplayMode, totalFeesInUsdDecimal, totalFeesInTargetDecimal, targetSymbol])

  const isLoading = queryReservesWithFeesV2Swr.isLoading
  const hasData = !!queryReservesWithFeesV2Swr.data

  if (!bot) return null

  return (
    <>
      <div className="flex items-center justify-between">
        <TooltipTitle
          title="Fees"
          classNames={{ title: "text-sm text-foreground-500" }}
          tooltipString="Fees are the fees earned by the bot for providing liquidity to the pool."
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
          <div className="flex items-center gap-2">
            <div className="text-sm">{totalDisplay}</div>

            <div className="grid grid-cols-[1fr_150px] items-center gap-2">
              <KaniDivider orientation="vertical" className="h-5" />
              <div className="flex flex-col gap-2">
                <KaniChip
                  className="ml-auto"
                  variant="flat"
                  startContent={<KaniImage src={tokenA?.iconUrl} className="w-5 h-5" />}
                >
                  <span className="text-secondary">
                    +{round(tokenAFee)} {tokenA?.symbol}
                  </span>
                </KaniChip>

                <KaniChip
                  className="ml-auto"
                  variant="flat"
                  startContent={<KaniImage src={tokenB?.iconUrl} className="w-5 h-5" />}
                >
                  <span className="text-secondary">
                    +{round(tokenBFee)} {tokenB?.symbol}
                  </span>
                </KaniChip>
              </div>
            </div>
          </div>
        )}
      </div>

      <Spacer y={3} />
    </>
  )
}