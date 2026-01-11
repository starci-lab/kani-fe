import React from "react"
import { KaniLink } from "../../../../atomic"
import { TooltipTitle } from "../../../../reuseable"
import { PoolCard } from "./PoolCard"
import { Spacer } from "@heroui/react"
import { ArrowsClockwiseIcon } from "@phosphor-icons/react"
import { useQueryFeesV2Swr, useQueryLiquidityPools2ActivePositionSwr, useQueryReservesV2Swr } from "@/hooks/singleton"

export const Position = () => {
    const queryLiquidityPools2ActivePositionSwr = useQueryLiquidityPools2ActivePositionSwr()
    const queryFeesV2Swr = useQueryFeesV2Swr()
    const queryReservesV2Swr = useQueryReservesV2Swr()
    return (
        <div>
            <div className="flex justify-between items-center">
                <TooltipTitle
                    title="Position"
                />
                <KaniLink
                    target="_blank"
                    className="text-primary cursor-pointer"
                    onPress={() => {
                        queryLiquidityPools2ActivePositionSwr.mutate()
                        queryFeesV2Swr.mutate()
                        queryReservesV2Swr.mutate()
                    }}
                >
                    <ArrowsClockwiseIcon className="w-5 h-5"/>
                </KaniLink>
            </div>
            <Spacer y={3} />
            <PoolCard />
        </div>
    )
}