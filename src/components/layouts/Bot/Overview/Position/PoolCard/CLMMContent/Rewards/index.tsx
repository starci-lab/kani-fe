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

export const Rewards = () => {
    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenPrices = useAppSelector((state) => state.socket.prices)

    const rewards = useMemo(() => {
        return Object.entries(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data
                ?.rewards ?? {},
        )
    }, [
        queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.rewards,
    ])
    const totalRewardsInUsd = useMemo(() => {
        return round(
            rewards
                .map(([tokenId, reward]) => {
                    return new Decimal(reward).mul(
                        new Decimal(tokenPrices[tokenId]?.price ?? 0),
                    )
                })
                .reduce((acc, reward) => {
                    return acc.add(reward)
                }, new Decimal(0)),
        )
    }, [rewards, tokenPrices])

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
                        <div className="text-sm">
                            ${totalRewardsInUsd}
                        </div>
                        <div className="grid grid-cols-[1fr_150px] items-center gap-2">
                            <KaniDivider orientation="vertical" className="h-5" />
                            <div className="flex flex-col gap-2">
                                {rewards.map(([tokenId, reward]) => (
                                    <KaniChip
                                        key={tokenId}
                                        className="ml-auto"
                                        variant="flat"
                                        startContent={
                                            <KaniImage
                                                src={
                                                    tokens.find((token) => token.id === tokenId)
                                                        ?.iconUrl
                                                }
                                                className="w-5 h-5"
                                            />
                                        }
                                    >
                                        <span className="text-secondary">
                                            +{round(new Decimal(reward))}{" "}
                                            {
                                                tokens.find((token) => token.id === tokenId)
                                                    ?.symbol
                                            }
                                        </span>
                                    </KaniChip>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Spacer y={3} />
        </>
    )
}
