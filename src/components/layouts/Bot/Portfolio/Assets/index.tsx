import React from "react"
import { 
    KaniCard, 
    KaniCardBody, 
    KaniImage, 
    KaniSkeleton,
} from "../../../../atomic"
import { useAppSelector } from "@/redux"
import { useQueryBalancesV2Swr } from "@/hooks/singleton"
import { RefreshIcon, TooltipTitle } from "@/components/reuseable"
import { Spacer } from "@heroui/react"

export const Assets = () => {
    const tokens = useAppSelector((state) => state.static.tokens)
    const queryBalancesV2Swr = useQueryBalancesV2Swr()
    const balances = queryBalancesV2Swr.data?.data?.balancesV2.data

    return (
        <div>
            <div className="flex justify-between items-center">
                <TooltipTitle
                    title="Assets"
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
            <Spacer y={4} />
            <div className="flex flex-col gap-2">
                {
                    queryBalancesV2Swr.isLoading ? (
                        <KaniSkeleton className="h-5 w-[100px] rounded-md"/>
                    ) : (
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
                                                                <div className="text-xs text-foreground-500">
                                                                    {token?.symbol}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm">
                                                            {balance.balanceAmountDecimal} {token?.symbol}
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
                    )
                }
            </div>
        </div>
    )
}
