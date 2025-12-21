import { intervalConfigMap } from "@/hooks/singleton"
import { ChartInterval } from "@/modules/api"
import { dayjs } from "@/modules/utils"
import { useAppSelector } from "@/redux/hooks"
import React, { useMemo } from "react"
import {
    ResponsiveContainer,
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"

export interface AreaChartData {
    name: string
    value: number
}
export interface AreaChartProps {
    data: Array<AreaChartData>
}

export const AreaChart = ({ data }: AreaChartProps) => {
    const interval = useAppSelector((state) => state.bot.chartInterval)
    const intervalConfig = useMemo(
        () => {
            return intervalConfigMap[interval ?? ChartInterval.OneHour]
        },
        [interval]
    )
    const bot = useAppSelector((state) => state.bot.bot)
    const tokens = useAppSelector((state) => state.static.tokens)
    const token = useMemo(() => {
        return tokens.find((token) => token.chainId === bot?.chainId && token.id === bot?.targetToken)
    }, [tokens, bot?.chainId, bot?.targetToken])    
    return (
        <ResponsiveContainer width="100%" height={200}>
            <RechartsAreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--heroui-primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--heroui-primary))" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    interval={intervalConfig?.interval}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10} 
                    tick={{ fontSize: 12 }}
                    tickFormatter={
                        (value, index) => {
                            if (index === 0) return ""
                            const localTime = dayjs(value).local()
                            if (localTime.hour() === 0 && localTime.minute() === 0) {
                                return localTime.format("DD/MM")
                            }
                            return localTime.format("HH:mm")
                        }}
                />
                <YAxis
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={
                        [
                            (dataMin: number) => dataMin * 0.9
                            , "dataMax"
                        ]
                    }
                />

                <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                    labelFormatter={(label) =>
                        dayjs(label).local().format("DD/MM/YYYY HH:mm")
                    }
                    formatter={(value) => {
                        return [value, `${token?.symbol}`]
                    }}
                />

                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--heroui-primary))"
                    fillOpacity={1}
                    isAnimationActive={false}
                    fill="url(#colorUv)"
                    dot={false}
                    activeDot={false}
                />
            </RechartsAreaChart>
        </ResponsiveContainer>
    )
}