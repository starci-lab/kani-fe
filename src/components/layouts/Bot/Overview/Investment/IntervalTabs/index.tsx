import React from "react"
import { KaniTab, KaniTabs } from "../../../../../atomic"
import { ChartInterval } from "@/modules/api"

export interface IntervalTab {
    key: ChartInterval
    text: string
}

export const IntervalTabs = () => {
    const intervals: Array<IntervalTab> = [
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
    return ( 
        <div>
            <KaniTabs size="sm" color="primary">
                {
                    intervals.map((interval) => (
                        <KaniTab key={interval.key} title={interval.text} />
                    ))
                }
            </KaniTabs>
        </div>
    )
}