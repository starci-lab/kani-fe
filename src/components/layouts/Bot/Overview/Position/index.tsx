import React from "react"
import { KaniLink } from "../../../../atomic"
import { TooltipTitle } from "../../../../reuseable"
import { PoolCard } from "./PoolCard"
import { Spacer } from "@heroui/react"
import { ArrowClockwiseIcon } from "@phosphor-icons/react"
import { useQueryFeesV2Swr, useQueryLiquidityPoolsActivePositionSwr, useQueryReservesV2Swr } from "@/hooks/singleton"

export const Position = () => {
    const queryliquidityPoolsActivePositionSwr = useQueryLiquidityPoolsActivePositionSwr()
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
                        queryliquidityPoolsActivePositionSwr.mutate()
                        queryFeesV2Swr.mutate()
                        queryReservesV2Swr.mutate()
                    }}
                >
                    <ArrowClockwiseIcon className="w-5 h-5"/>
                </KaniLink>
            </div>
            <Spacer y={4} />
            <PoolCard />
        </div>
    )
}