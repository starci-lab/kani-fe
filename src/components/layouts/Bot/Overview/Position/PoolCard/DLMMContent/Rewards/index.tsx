import React, { useMemo } from "react"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../../../../../reuseable"
import { KaniChip, KaniDivider, KaniImage, KaniSkeleton } from "../../../../../../../atomic"
import Decimal from "decimal.js"
import { useAppSelector } from "@/redux"
import { useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"
import { round } from "@/modules/utils"

export const Rewards = () => {
  const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()
  const tokens = useAppSelector((state) => state.static.tokens)
  const tokenPrices = useAppSelector((state) => state.socket.prices)

  const rewards = useMemo(() => {
    return Object.entries(
      queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2?.data?.rewards ?? {},
    )
  }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2?.data?.rewards])

  // Prebuild token map to avoid repeated find()
  const tokenById = useMemo(() => {
    return new Map(tokens.map((t) => [t.id, t]))
  }, [tokens])

  // Normalize price to number (same pattern as Fees/Liquidity)
  const getPriceNumber = (tokenId: string) => {
    const p = tokenPrices[tokenId]
    return typeof p === "number" ? p : (p?.price ?? 0)
  }

  const totalRewardsInUsd = useMemo(() => {
    const totalDecimal = rewards.reduce((acc, [tokenId, reward]) => {
      const price = getPriceNumber(tokenId)
      return acc.add(new Decimal(reward).mul(new Decimal(price)))
    }, new Decimal(0))

    return round(totalDecimal)
  }, [rewards, tokenPrices]) // keep tokenPrices dep to reflect live updates

  if (rewards.length === 0) {
    return null
  }

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
            <div className="text-sm">${totalRewardsInUsd}</div>

            <div className="grid grid-cols-[1fr_150px] items-center gap-2">
              <KaniDivider orientation="vertical" className="h-5" />
              <div className="flex flex-col gap-2">
                {rewards.map(([tokenId, reward]) => {
                  const token = tokenById.get(tokenId)
                  return (
                    <KaniChip
                      key={tokenId}
                      className="ml-auto"
                      variant="flat"
                      startContent={<KaniImage src={token?.iconUrl} className="w-5 h-5" />}
                    >
                      <span className="text-secondary">
                        +{round(new Decimal(reward))} {token?.symbol}
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