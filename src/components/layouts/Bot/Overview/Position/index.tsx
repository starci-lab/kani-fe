import React from "react"
import { EmptyContent, RefreshIcon, TooltipTitle } from "../../../../reuseable"
import { PoolCard } from "./PoolCard"
import { Spacer } from "@heroui/react"
import { useQueryBotV2Swr, useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import { KaniSpinner } from "../../../../atomic"

export const Position = () => {
    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()
    const activePosition = useAppSelector(
        (state) => state.bot.bot?.activePosition
    )
    const queryBotV2Swr = useQueryBotV2Swr()
    return (
        <div>
            <div className="flex justify-between items-center">
                <TooltipTitle
                    title="Position"
                />
                <RefreshIcon 
                    classNames={{
                        icon: "text-primary"
                    }}
                    onRefresh={
                        () => {
                            queryReservesWithFeesV2Swr.mutate()
                        }
                    } 
                />
            </div>
            <Spacer y={3} />
            {
                (!queryBotV2Swr.data || queryBotV2Swr.isLoading) ? (
                    <div className="h-[300px] w-full grid place-items-center">
                        <KaniSpinner />
                    </div>
                ) : (
                    activePosition ? (
                        <PoolCard />
                    ) : (
                        <div className="h-[300px] w-full grid place-items-center">
                            <EmptyContent title="No active position" description="This bot doesn't have any active position yet" />
                        </div>
                    )
                )
            }
        </div>
    )
}