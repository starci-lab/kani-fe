import { ChartInterval } from "@/modules/types"
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
    case ChartInterval.FifteenMinutes:
        return <CustomTickFifteenMinutes {...props} />
    case ChartInterval.ThirtyMinutes:
        return <CustomTickThirtyMinutes {...props} />
    case ChartInterval.OneHour:
        return <CustomTickHour {...props} />
    case ChartInterval.TwoHours:
        return <CustomTickTwoHours {...props} />
    case ChartInterval.FourHours:
        return <CustomTickFourHours {...props} />
    case ChartInterval.Day:
        return <CustomTickDay {...props} />
    default:
        throw new Error("Invalid interval")
    }
}

const TickText = ({
    x,
    y,
    text,
}: {
    x: number
    y: number
    text: string
}) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                textAnchor="middle"
                fontSize={12}
                fill="hsl(var(--heroui-foreground-500))"
            >
                {text}
            </text>
        </g>
    )
}

const shouldShowDateAtStartOfDay = (localTime: ReturnType<typeof dayjs>, index: number, visibleTicksCount: number) => {
    // avoid showing DD/MM too close to the end tick (keeps UI cleaner)
    const ticksRemaining = new Decimal(visibleTicksCount).sub(index).sub(1)
    return localTime.hour() === 0 && localTime.minute() === 0 && ticksRemaining.greaterThan(8)
}

export const CustomTickHour = ({ x, y, payload, index, visibleTicksCount }: CustomTickProps) => {
    if (index === 0) return null
    const localTime = dayjs(payload.value).local()
    if (index + 1 === visibleTicksCount) {
        return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
    }
    if (shouldShowDateAtStartOfDay(localTime, index, visibleTicksCount)) {
        return <TickText x={x} y={y} text={localTime.format("DD/MM")} />
    }
    return null
}

export const CustomTickFifteenMinutes = ({
    x,
    y,
    payload,
    index,
    visibleTicksCount,
}: CustomTickProps) => {
    if (index === 0) return null
    const localTime = dayjs(payload.value).local()

    if (index + 1 === visibleTicksCount) {
        return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
    }
    if (shouldShowDateAtStartOfDay(localTime, index, visibleTicksCount)) {
        return <TickText x={x} y={y} text={localTime.format("DD/MM")} />
    }
    // show every 2 hours at the top of the hour
    const is2HourMark = localTime.minute() === 0 && localTime.hour() % 2 === 0
    if (is2HourMark) {
        return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
    }
    return null
}

export const CustomTickThirtyMinutes = ({
    x,
    y,
    payload,
    index,
    visibleTicksCount,
}: CustomTickProps) => {
    if (index === 0) return null
    const localTime = dayjs(payload.value).local()

    if (index + 1 === visibleTicksCount) {
        return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
    }
    if (shouldShowDateAtStartOfDay(localTime, index, visibleTicksCount)) {
        return <TickText x={x} y={y} text={localTime.format("DD/MM")} />
    }
    // show every 2 hours at the top of the hour
    const is2HourMark = localTime.minute() === 0 && localTime.hour() % 2 === 0
    if (is2HourMark) {
        return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
    }
    return null
}

export const CustomTickTwoHours = ({
    x,
    y,
    payload,
    index,
    visibleTicksCount,
}: CustomTickProps) => {
    if (index === 0) return null
    const localTime = dayjs(payload.value).local()
    if (index + 1 === visibleTicksCount) {
        return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
    }
    if (shouldShowDateAtStartOfDay(localTime, index, visibleTicksCount)) {
        return <TickText x={x} y={y} text={localTime.format("DD/MM")} />
    }
    // 2h data is sparse enough; show time labels to keep chart readable
    return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
}

export const CustomTickFourHours = ({
    x,
    y,
    payload,
    index,
    visibleTicksCount,
}: CustomTickProps) => {
    if (index === 0) return null
    const localTime = dayjs(payload.value).local()
    if (index + 1 === visibleTicksCount) {
        return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
    }
    if (shouldShowDateAtStartOfDay(localTime, index, visibleTicksCount)) {
        return <TickText x={x} y={y} text={localTime.format("DD/MM")} />
    }
    // 4h data is sparse enough; show time labels
    return <TickText x={x} y={y} text={localTime.format("HH:mm")} />
}

export const CustomTickDay = ({
    x,
    y,
    payload,
    index,
}: CustomTickProps) => {
    if (index === 0) return null
    const localTime = dayjs(payload.value).local()
    return <TickText x={x} y={y} text={localTime.format("DD/MM")} />
}
