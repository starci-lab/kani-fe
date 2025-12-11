import { TooltipTitle } from "@/components/reuseable"
import React from "react"

export const SelectPools = () => {
    return (
        <div className="flex flex-col gap-2">
            <TooltipTitle
                title="Pools"
                tooltipString="This is the pools of your bot"
                isRequired
            />
            <div className="w-fit">
            </div>
        </div>
    )
}