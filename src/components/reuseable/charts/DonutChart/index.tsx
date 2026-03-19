import React from "react"
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts"
import { computePercentage, round } from "@/modules/utils"
import Decimal from "decimal.js"

export interface DonutChartDataItem {
    name: string
    value: number
    color?: string
}

export interface DonutChartProps {
    data: Array<DonutChartDataItem>
    height?: number
    width?: number
    innerRadius?: number | string
    outerRadius?: number | string
    showLegend?: boolean
    showTooltip?: boolean
}

const DEFAULT_COLORS = [
    "hsl(var(--heroui-primary))",
    "hsl(var(--heroui-secondary))",
    "hsl(var(--heroui-success))",
    "hsl(var(--heroui-warning))",
    "hsl(var(--heroui-danger))",
]

export const DonutChart = ({
    data,
    height = 100,
    width = 100,
    innerRadius = "60%",
    outerRadius = "90%",
    showLegend = true,
    showTooltip = true,
}: DonutChartProps) => {
    const chartData = data.map((item, index) => ({
        ...item,
        color: item.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }))
    return (
        <div className="flex items-center justify-center gap-3">
            <RechartsPieChart width={width} height={height}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={1}
                    dataKey="value"
                    isAnimationActive={false}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                </Pie>
                {showTooltip && (
                    <Tooltip
                        contentStyle={{
                            fontSize: 12,
                            borderRadius: 8,
                            backgroundColor: "hsl(var(--heroui-content2))",
                            boxShadow: "none",
                            border: "none",
                        }}
                        formatter={(value: number, name: string) => [round(new Decimal(value)), name]}
                    />
                )}
            </RechartsPieChart>
            {showLegend && (
                <div className="flex flex-wrap items-start justify-start text-sm gap-1">
                    {chartData.map((item) => (
                        <div key={item.name} className="grid grid-cols-[80px_60px] items-center gap-2">
                            <div className="flex items-center gap-2">
                                <div
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <div className="text-sm text-default-500">{item.name}</div>
                            </div>
                            <div className="text-sm">
                                {computePercentage({ numerator: new Decimal(item.value), denominator: new Decimal(1) }).toString()}%
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}