import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    ReferenceLine,
    ResponsiveContainer,
} from "recharts"
import React, { useMemo } from "react"
import { round } from "@/modules/utils"
import Decimal from "decimal.js"
import { RangeTier } from "@/modules/types"

export interface StrategyVisualProps {
    rangeTier: RangeTier
}

export const StrategyVisual = ({ rangeTier }: StrategyVisualProps) => {
    const area = new Decimal(2.7)
    const narrowUv = area.div(new Decimal(6.5).minus(new Decimal(3.5)))
    const midUv = area.div(new Decimal(8.25).minus(new Decimal(1.75)))
    const wideUv = area.div(new Decimal(10).minus(new Decimal(0)))
    const { data, line } = useMemo(() => {
        switch (rangeTier) {
        case RangeTier.Narrow:
            return {
                data: [
                    { 
                        name: 3.5, 
                        uv: narrowUv.toNumber() 
                    },
                    { 
                        name: 6.5, 
                        uv: narrowUv.toNumber()
                    },
                ],
                line: {
                    left: {
                        x: 3.5,
                    },
                    right: {
                        x: 6.5,
                    },
                }
            }
        case RangeTier.Mid:
            return {
                data: [
                    { 
                        name: 1.75, 
                        uv: midUv.toNumber()
                    },
                    { 
                        name: 8.25, 
                        uv: midUv.toNumber()
                    },
                ],
                line: {
                    left: {
                        x: 1.75,
                    },
                    right: {
                        x: 8.25,
                    },
                }
            }
        case RangeTier.Wide:
            return {
                data: [
                    { 
                        name: 0, 
                        uv: wideUv.toNumber()
                    },
                    { 
                        name: 10, 
                        uv: wideUv.toNumber()
                    },
                ],
                line: {
                    left: {
                        x: 0,
                    },
                    right: {
                        x: 10,
                    },
                }
            }
        }
    }, [rangeTier])
    return (
        <ResponsiveContainer width="60%" height={60} className="max-w-[150px]">
            <RechartsAreaChart 
                data={data} 
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
                <XAxis
                    type="number"
                    dataKey="name"
                    hide
                    domain={[0, 10]}
                />
                <YAxis hide domain={[0, 1]} />
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="0%"
                            stopColor="hsl(var(--heroui-primary-400))"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="100%"
                            stopColor="hsl(var(--heroui-primary-200))"
                            stopOpacity={0.2}
                        />
                    </linearGradient>
                </defs>
                <Area
                    type="linear"
                    dataKey="uv"
                    stroke="hsl(var(--heroui-primary-500))"
                    fill="url(#areaGradient)"
                    fillOpacity={1}
                    dot={false}
                    activeDot={false}
                    isAnimationActive={false}
                />
                {/* Lower */}
                <ReferenceLine
                    x={line.left.x}
                    stroke="hsl(var(--heroui-foreground-500))"
                />
                {/* Upper */}
                <ReferenceLine
                    x={line.right.x}
                    stroke="hsl(var(--heroui-foreground-500))"
                />
                {/* Zero */}
                <ReferenceLine
                    y={0}
                    stroke="hsl(var(--heroui-foreground-500))"
                />
                
            </RechartsAreaChart>
        </ResponsiveContainer>
    )
}

export const computeCurrentPrice = (
    { current, lower, upper, maxRatio = new Decimal(0.1) }: CompressCurrentPriceProps
) => {
    const cur = current
    const low = lower
    const up = upper

    const space = up.minus(low)
    const boundary = space.mul(0.05)
    const isLower = cur.lt(low)
    // In range
    if (cur.gte(low) && cur.lte(up)) {
        // we take the new boundary to compute the ratio
        const upWithBoundary = up.minus(boundary)
        const downWithBoundary = low.plus(boundary)
        // we take the price where
        // ? (price - downWithBoundary) / (upWithBoundary - downWithBoundary)
        // ? = (price - low) / space
        // ? => price = (price - low) / space * (upWithBoundary - downWithBoundary) + downWithBoundary
        const newPrice = cur.minus(low).div(space).mul(upWithBoundary.minus(downWithBoundary)).plus(downWithBoundary)
        return round(newPrice)

    }
    // diff >= 0
    const diff = isLower
        ? low.minus(cur)
        : cur.minus(up)

    /**
     * x ∈ [0, +∞)
     * ratio ∈ [0, maxRatio)
     *
     * ratio = maxRatio * log(1 + x) / (log(1 + x) + 1)
     */
    const x = diff.div(space)
    const logx = Decimal.ln(x.plus(1))
    const ratio = new Decimal(maxRatio).mul(
        logx.div(logx.plus(1))
    )

    const compressed = ratio.mul(space)

    const result = isLower
        ? low.minus(compressed).minus(boundary)
        : up.plus(compressed).plus(boundary)

    return round(result)
}

export interface CompressCurrentPriceProps {
    current: Decimal
    lower: Decimal
    upper: Decimal
    maxRatio?: Decimal
}