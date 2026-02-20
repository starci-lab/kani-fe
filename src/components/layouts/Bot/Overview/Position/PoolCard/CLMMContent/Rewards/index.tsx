import React, { useMemo } from "react"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../../../../../reuseable"
import { KaniChip, KaniDivider, KaniImage, KaniSkeleton } from "../../../../../../../atomic"
import Decimal from "decimal.js"
import { useAppSelector } from "@/redux"
import { useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"
import { round } from "@/modules/utils"
import { PerformanceDisplayMode } from "@/modules/types"

export const Rewards = () => {
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

  const tokenById = useMemo(() => {
    return new Map(tokens.map((t) => [t.id, t]))
  }, [tokens])

  const rewards = useMemo(() => {
    return Object.entries(queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.rewards ?? {})
  }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.rewards])

  const rewardsInUsdDecimal = useMemo(() => {
    return rewards
      .map(([tokenId, reward]) => {
        const amount = new Decimal(reward ?? 0)
        const p = new Decimal(tokenPrices[tokenId]?.price ?? 0)
        if (amount.lte(0) || p.lte(0)) return new Decimal(0)
        return amount.mul(p)
      })
      .reduce((acc, x) => acc.add(x), new Decimal(0))
  }, [rewards, tokenPrices])

  const rewardsInTargetDecimal = useMemo(() => {
    return toTargetFromUsd(rewardsInUsdDecimal)
  }, [rewardsInUsdDecimal, toTargetFromUsd])

  const totalDisplay = useMemo(() => {
    if (bot?.performanceDisplayMode === PerformanceDisplayMode.Usd) {
      return `$${round(rewardsInUsdDecimal)}`
    }
    return `${round(rewardsInTargetDecimal)} ${targetSymbol ?? ""}`
  }, [bot?.performanceDisplayMode, rewardsInUsdDecimal, rewardsInTargetDecimal, targetSymbol])

  if (!bot) return null
  if (rewards.length === 0) return null

  const isLoading = queryReservesWithFeesV2Swr.isLoading
  const hasData = !!queryReservesWithFeesV2Swr.data

  return (
    <>
      <div className="flex items-center justify-between">
        <TooltipTitle
          title="Rewards"
          classNames={{ title: "text-sm text-foreground-500" }}
          tooltipString="Rewards are the rewards earned by the bot for providing liquidity to the pool."
        />

        {isLoading || !hasData ? (
          <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
        ) : (
          <div className="flex items-center gap-2">
            <div className="text-sm">{totalDisplay}</div>
            <div className="grid grid-cols-[1fr_150px] items-center gap-2">
              <KaniDivider orientation="vertical" className="h-5" />
              <div className="flex flex-col gap-2">
                {rewards.map(([tokenId, reward]) => {
                  const t = tokenById.get(tokenId)
                  return (
                    <KaniChip
                      key={tokenId}
                      className="ml-auto"
                      variant="flat"
                      startContent={<KaniImage src={t?.iconUrl} className="w-5 h-5" />}
                    >
                      <span className="text-secondary">
                        +{round(new Decimal(reward ?? 0))} {t?.symbol}
                      </span>
                    </KaniChip>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <Spacer y={3} />
    </>
  )
}