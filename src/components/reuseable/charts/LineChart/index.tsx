import { dayjs } from "@/modules/dayjs"
import React, { useMemo } from "react"
import  * as ss from "simple-statistics"
import {
    ResponsiveContainer,
    LineChart as RechartsLineChart,
    Line,
    YAxis,
    Tooltip,
    XAxis,
} from "recharts"
import Decimal from "decimal.js"

export interface LineChartData {
    label: number
    value: number
}

export interface LineChartProps {
    data: Array<LineChartData>
    height?: number
    addRegressionLine?: boolean
}

export const LineChart = ({
    data,
    height = 300,
    addRegressionLine = false,
}: LineChartProps) => {
    const base = data[0]?.label ?? 0
    const purifiedData = useMemo(() => {
        return data.map((item) => ({
            label: item.label - base,
            value: item.value,
        }))
    }, [data])
    const chartData = useMemo(() => {
        if (!addRegressionLine || purifiedData.length < 2) {
            return purifiedData
        }
        const line = ss.linearRegression(
            purifiedData.map((item) => [item.label, item.value]))
        return purifiedData.map((item) => ({
            ...item,
            regression: (Number.isFinite(line.m) && Number.isFinite(line.b)) ? new Decimal(line.m).mul(item.label).add(line.b).toNumber() : item.value,
        }))
    }, [purifiedData, addRegressionLine])

    return (
        <ResponsiveContainer width="100%" height={height} className="overflow-hidden">
            <RechartsLineChart
                data={chartData}
                margin={{ top: 25, right: 0, left: 0, bottom: 10 }}
            >
                <YAxis
                    orientation="right"
                    axisLine={{ stroke: "hsl(var(--heroui-foreground-300))" }}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fontSize: 12 }}
                    domain={["auto", "auto"]}
                />

                <Tooltip
                    contentStyle={{
                        fontSize: 12,
                        borderRadius: 8,
                        backgroundColor: "hsl(var(--heroui-content2))",
                        boxShadow: "none",
                        border: "none",
                    }}
                    cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                    labelFormatter={(label) => dayjs(label).format("HH:mm:ss.SSS")}
                    formatter={(value, name) => [
                        value,
                        name === "regression" ? "Regression" : "Value",
                    ]}
                />

                <XAxis
                    dataKey="label"
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    hide
                />

                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--heroui-primary))"
                    strokeWidth={1}
                    isAnimationActive={false}
                    dot={false}
                    activeDot={false}
                />

                {addRegressionLine && data.length >= 2 && (
                    <Line
                        type="natural"
                        dataKey="regression"
                        stroke="hsl(var(--heroui-warning))"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        isAnimationActive={false}
                        dot={false}
                        activeDot={false}
                    />
                )}
            </RechartsLineChart>
        </ResponsiveContainer>
    )
}