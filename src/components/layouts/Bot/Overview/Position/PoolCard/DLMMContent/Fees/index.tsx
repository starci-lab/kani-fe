import React, { useMemo } from "react"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../../../../../reuseable"
import { KaniChip, KaniDivider, KaniImage, KaniSkeleton } from "../../../../../../../atomic"
import Decimal from "decimal.js"
import { useAppSelector } from "@/redux"
import { useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"
import { round } from "@/modules/utils"

export const Fees = () => {
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

  // Normalize price to number (avoid tokenPriceA.price on possibly-number)
  const tokenPriceA = useMemo(() => {
    const p = tokenPrices[tokenA?.id ?? ""]
    return typeof p === "number" ? p : (p?.price ?? 0)
  }, [tokenPrices, tokenA?.id])

  const tokenPriceB = useMemo(() => {
    const p = tokenPrices[tokenB?.id ?? ""]
    return typeof p === "number" ? p : (p?.price ?? 0)
  }, [tokenPrices, tokenB?.id])

  const tokenAFee = useMemo(() => {
    const feeA = queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2?.data?.feeA ?? 0
    return new Decimal(feeA)
  }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2?.data?.feeA])

  const tokenBFee = useMemo(() => {
    const feeB = queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2?.data?.feeB ?? 0
    return new Decimal(feeB)
  }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2?.data?.feeB])

  // ✅ Correct formula: feeA*priceA + feeB*priceB
  const totalFeesInUsdDecimal = useMemo(() => {
    return tokenAFee.mul(new Decimal(tokenPriceA)).add(tokenBFee.mul(new Decimal(tokenPriceB)))
  }, [tokenAFee, tokenBFee, tokenPriceA, tokenPriceB])

  const isLoading = queryReservesWithFeesV2Swr.isLoading
  const hasData = !!queryReservesWithFeesV2Swr.data

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
            <div className="text-sm">${round(totalFeesInUsdDecimal)}</div>

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