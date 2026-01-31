import React from "react"
import { 
    KaniCard, 
    KaniCardBody, 
    KaniImage, 
    KaniSkeleton,
} from "../../../../atomic"
import { useAppSelector } from "@/redux"
import { useQueryBalancesV2Swr } from "@/hooks/singleton"
import { EmptyContent, RefreshIcon, TooltipTitle } from "../../../../reuseable"
import { Spacer } from "@heroui/react"
import { round } from "@/modules/utils"
import Decimal from "decimal.js"

export const Tokens = () => {
    const tokens = useAppSelector((state) => state.static.tokens)
    const queryBalancesV2Swr = useQueryBalancesV2Swr()
    const balances = queryBalancesV2Swr.data?.data?.balancesV2.data

    return (
        <div>
            <div className="flex justify-between items-center">
                <TooltipTitle
                    title="Tokens"
                />
                <RefreshIcon
                    classNames={{
                        icon: "text-primary"
                    }}
                    onRefresh={() => {
                        queryBalancesV2Swr.mutate()
                    }}
                />
            </div>
            <Spacer y={3} />
            <div className="flex flex-col gap-2">
                {
                    !queryBalancesV2Swr.data || queryBalancesV2Swr.isLoading ? (
                        <KaniCard className="w-full">
                            <KaniCardBody className="flex flex-col gap-0 p-0">
                                {
                                    Array.from({ length: 2 }).map((_, index) => (
                                        <React.Fragment key={index}>
                                            <KaniCard className="bg-transparent" radius="none" shadow="none" isPressable>
                                                <KaniCardBody className="p-3 flex flex-row items-center gap-4 justify-between w-full">
                                                    <div className="flex items-center gap-2">
                                                        <KaniSkeleton className="w-10 h-10 rounded-full" />
                                                        <div>
                                                            <div className="text-sm">
                                                                <KaniSkeleton className="h-5 w-[75px] rounded-md" />
                                                            </div>
                                                            <Spacer y={0.5} />
                                                            <div className="text-xs text-foreground-500">
                                                                <KaniSkeleton className="h-4 w-[50px] rounded-md" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm">
                                                        <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                                                    </div>
                                                </KaniCardBody>
                                            </KaniCard>
                                            {index < 1 && (
                                                <div className="w-full h-[1px] bg-foreground-100"/>
                                            )}
                                        </React.Fragment>
                                    ))
                                }
                            </KaniCardBody>
                        </KaniCard>
                    ) : (
                        balances && balances.length > 0 ? (
                            <KaniCard className="w-full">
                                <KaniCardBody className="flex flex-col gap-0 p-0">
                                    {
                                        balances?.map((balance, index) => {
                                            const token = tokens.find((token) => token.id === balance.id)
                                            return (
                                                <React.Fragment key={balance.id}>
                                                    <KaniCard className="bg-transparent" radius="none" shadow="none" isPressable>
                                                        <KaniCardBody className="p-3 flex flex-row items-center gap-4 justify-between w-full">
                                                            <div className="flex items-center gap-2">
                                                                <KaniImage
                                                                    removeWrapper
                                                                    className="w-10 h-10 rounded-full"
                                                                    src={token?.iconUrl}
                                                                />
                                                                <div>
                                                                    <div className="text-sm">
                                                                        {token?.name}
                                                                    </div>
                                                                    <Spacer y={0.5} />
                                                                    <div className="text-xs text-foreground-500">
                                                                        {token?.symbol}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm">
                                                                {round(new Decimal(balance.balanceAmountDecimal))} {token?.symbol}
                                                            </div>
                                                        </KaniCardBody>
                                                    </KaniCard>
                                                    {index < (balances.length - 1) && (
                                                        <div className="w-full h-[1px] bg-foreground-100"/>
                                                    )}
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </KaniCardBody>
                            </KaniCard>
                        ) : (
                            <div className="h-[200px] w-full grid place-items-center">
                                <EmptyContent title="No tokens" description="This bot doesn't have any tokens yet" />
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
