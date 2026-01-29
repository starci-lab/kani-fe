import React from "react"
import { RefreshIcon, TooltipTitle } from "../../../../reuseable"
import { PoolCard } from "./PoolCard"
import { Spacer } from "@heroui/react"
import { useQueryReservesWithFeesV2Swr } from "@/hooks/singleton"

export const Position = () => {
    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr()
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
            <Spacer y={4} />
            <PoolCard />
        </div>
    )
}