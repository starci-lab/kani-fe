import { ChartInterval } from "@/modules/api"
import { dayjs } from "@/modules/dayjs"
import React from "react"
import Decimal from "decimal.js"

export interface CustomTickProps {
    x: number
    y: number
    payload: { value: string }
    index: number
    interval: ChartInterval
    visibleTicksCount: number
}
export const CustomTick = (props: CustomTickProps) => {
    if (props.index === 0) return null
    switch (props.interval) {
    case ChartInterval.OneHour:
        return <CustomTickHour {...props} />
    default:
        throw new Error("Invalid interval")
    }
}

export const CustomTickHour = ({ x, y, payload, index, visibleTicksCount }: CustomTickProps) => {
    if (index === 0) return null
    const localTime = dayjs(payload.value).local()
    if (index + 1 === visibleTicksCount) {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    textAnchor="middle"
                    fontSize={12}
                    fill="hsl(var(--heroui-foreground-500))"
                >
                    {localTime.format("HH:mm")}
                </text>
            </g>
        )
    }
    const isStartOfDay = localTime.hour() === 0 && localTime.minute() === 0 && new Decimal(visibleTicksCount).sub(index).sub(1).greaterThan(8)
    if (isStartOfDay) {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    textAnchor="middle"
                    fontSize={12}
                    fill="hsl(var(--heroui-foreground-500))"
                >
                    {localTime.format("DD/MM")}
                </text>
            </g>
        )
    }
    return null
}
