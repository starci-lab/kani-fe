import React from "react"
import { KaniTab, KaniTabs } from "../../../../../atomic"
import { ChartInterval } from "@/modules/types"
import { setBotChartConfigChartInterval, useAppDispatch, useAppSelector } from "@/redux"
import { useUpdateBotChartConfigV2SwrMutation } from "@/hooks/singleton"

export interface IntervalTab {
    key: ChartInterval
    text: string
}

export const IntervalTabs = () => {
    const bot = useAppSelector(
        (state) => state.bot.bot
    )
    const intervals: Array<IntervalTab> = [
        {
            key: ChartInterval.FifteenMinutes,
            text: "15m",
        },
        {
            key: ChartInterval.ThirtyMinutes,
            text: "30m",
        },
        {
            key: ChartInterval.OneHour,
            text: "1h",
        },
        {
            key: ChartInterval.TwoHours,
            text: "2h",
        },
        {
            key: ChartInterval.FourHours,
            text: "4h",
        },
        {
            key: ChartInterval.Day,
            text: "1d",
        },
    ]
    const dispatch = useAppDispatch()
    const updateBotChartConfigV2SwrMutation = useUpdateBotChartConfigV2SwrMutation()
    return ( 
        <div className="md:w-fit w-full">
            <KaniTabs 
                variant="underlined" 
                size="sm" 
                className="w-full"
                classNames={{
                    tabList: "w-full"
                }}
                color="primary" 
                onSelectionChange={
                    async (key) => {
                        if (!bot?.id) {
                            return
                        }
                        const chartInterval = key as ChartInterval
                        dispatch(setBotChartConfigChartInterval(chartInterval))
                        await updateBotChartConfigV2SwrMutation.trigger({
                            request: {
                                id: bot.id,
                                chartInterval,
                            },
                        })
                    }} selectedKey={bot?.chartConfig?.chartInterval ?? ChartInterval.OneHour}>
                {
                    intervals.map((interval) => (
                        <KaniTab key={interval.key} title={interval.text} />
                    ))
                }
            </KaniTabs>
        </div>
    )
}