import React from "react"
import { TooltipTitle } from "../../../../reuseable"
import { IndicatorCard } from "./IndicatorCard"
import { useAppSelector } from "@/redux/hooks"
import { Spacer } from "@heroui/react"

export const Indicators = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    return (
        <div>
            <div className="flex items-center gap-2 justify-between">
                <TooltipTitle title="Indicators" />
            </div>
            <Spacer y={3} />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                {
                    bot?.violateIndicators?.map((violateIndicator) => {
                        return <IndicatorCard key={violateIndicator.id} indicator={violateIndicator} />
                    })
                }
            </div>
        </div>
    )
}