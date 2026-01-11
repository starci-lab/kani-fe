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
    CartesianGrid,
} from "recharts"
import { CustomTick } from "./CustomTick"

export interface AreaChartData {
    name: string
    value: number
}
export interface AreaChartProps {
    data: Array<AreaChartData>
}

export const AreaChart = ({ data }: AreaChartProps) => {
    const interval = useAppSelector((state) => state.bot.chartInterval)
    const bot = useAppSelector((state) => state.bot.bot)
    const tokens = useAppSelector((state) => state.static.tokens)
    const token = useMemo(() => {
        return tokens.find((token) => token.chainId === bot?.chainId && token.id === bot?.targetToken)
    }, [tokens, bot?.chainId, bot?.targetToken])    
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart
                data={data}
                margin={{ top: 25, right: 0, left: 0, bottom: 25 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--heroui-primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--heroui-primary))" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--heroui-foreground-200))"
                    vertical={false}
                />
                <XAxis
                    axisLine={{ stroke: "hsl(var(--heroui-foreground-300))" }}
                    dataKey="name"
                    tickLine={false}
                    tickMargin={20} 
                    interval={0}
                    tick={
                        (params) => {
                            return <CustomTick 
                                interval={interval} 
                                {...params}
                            />
                        }
                    }
                />
                <YAxis
                    orientation="right"
                    axisLine={{ stroke: "hsl(var(--heroui-foreground-300))" }}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fontSize: 12 }}
                    domain={
                        [
                            (dataMin: number) => dataMin * 0.9
                            , "dataMax"
                        ]
                    }
                />
                <Tooltip
                    contentStyle={
                        { 
                            fontSize: 12, 
                            borderRadius: 8, 
                            backgroundColor: "hsl(var(--heroui-content2))",
                            boxShadow: "none",
                            border: "none",
                        }
                    }
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