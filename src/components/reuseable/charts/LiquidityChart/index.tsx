import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    ReferenceLine,
} from "recharts"
import React, { useMemo } from "react"
import { roundNumber } from "@/modules/utils"
import Decimal from "decimal.js"

export enum PricePosition {
    InRange = "inRange",
    Below = "below",
    Above = "above",
}

export interface LiquidityChartProps {
    priceLower: number
    priceUpper: number
    currentPrice: number
}

export const LiquidityChart = ({ priceLower, priceUpper, currentPrice }: LiquidityChartProps) => {
    const data = useMemo(() => {
        return [
            { name: roundNumber(priceLower), uv: 1 },
            { name: roundNumber(priceUpper), uv: 1 },
        ]
    }, [priceLower, priceUpper])
    const paddingRatio = 0.3
    const computedCurrentPrice = computeCurrentPrice({ current: currentPrice, lower: priceLower, upper: priceUpper })
    const minX = Decimal.min(priceLower)
    const maxX = Decimal.max(priceUpper)
    const range = maxX.minus(minX).toNumber()
    const extendedMin = minX.minus(range * paddingRatio).toNumber()
    const extendedMax = maxX.plus(range * paddingRatio).toNumber()
    const pricePosition = useMemo(() => {
        if (currentPrice < priceLower) {
            return PricePosition.Below
        }
        if (currentPrice > priceUpper) {
            return PricePosition.Above
        }
        return PricePosition.InRange
    }, [currentPrice, priceLower, priceUpper])
    const isAboveHalf = useMemo(() => {
        return currentPrice > (priceLower + priceUpper) / 2
    }, [currentPrice, priceLower, priceUpper])
    return (
        <RechartsAreaChart
            width={300}   
            height={120}     
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
            <XAxis
                type="number"
                dataKey="name"
                domain={[extendedMin, extendedMax]}
                hide
            />
            <YAxis hide domain={[-0.3, 1.3]} />
            <Area
                type="linear"
                dataKey="uv"
                stroke="hsl(var(--heroui-foreground-400))"
                fill="hsl(var(--heroui-foreground-300))"
                fillOpacity={1}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
            />
            {/* Lower */}
            <ReferenceLine
                x={roundNumber(priceLower)}
                stroke="hsl(var(--heroui-foreground-500))"
                ifOverflow="extendDomain"
                strokeDasharray="4 4"
                label={({ viewBox }) => {
                    const { x, y, height } = viewBox
                    return (
                        <text
                            x={
                                (() => {
                                    switch (pricePosition) {
                                    case PricePosition.InRange:
                                        return x - 5
                                    case PricePosition.Below:
                                        return x + 5
                                    case PricePosition.Above:
                                        return x - 5
                                    }
                                })()
                            }
                            y={y + height - 3}  
                            textAnchor={
                                (() => {
                                    switch (pricePosition) {
                                    case PricePosition.InRange:
                                        return "end"
                                    case PricePosition.Below:
                                        return "start"
                                    case PricePosition.Above:
                                        return "end"
                                    }
                                })()
                            }
                            fill="hsl(var(--heroui-foreground-500))"
                            fontSize={12}
                        >
                            {roundNumber(priceLower, 2)}
                        </text>
                    )
                }}
            />
            {/* Upper */}
            <ReferenceLine
                x={roundNumber(priceUpper)}
                stroke="hsl(var(--heroui-foreground-500))"
                ifOverflow="extendDomain"
                strokeDasharray="4 4"
                label={({ viewBox }) => {
                    const { x, y, height } = viewBox
                    return (
                        <text
                            x={(() => {
                                switch (pricePosition) {
                                case PricePosition.InRange:
                                    return x + 5
                                case PricePosition.Below:
                                    return x + 5
                                case PricePosition.Above:
                                    return x - 5
                                }
                            })()}
                            y={y + height - 3}  
                            textAnchor={
                                (() => {
                                    switch (pricePosition) {
                                    case PricePosition.InRange:
                                        return "start"
                                    case PricePosition.Below:
                                        return "start"
                                    case PricePosition.Above:
                                        return "end"
                                    }
                                })()
                            }
                            fill="hsl(var(--heroui-foreground-500))"
                            fontSize={12}
                        >
                            {roundNumber(priceUpper, 2)}
                        </text>
                    )
                }}
            />
            <ReferenceLine
                y={0}
                stroke="hsl(var(--heroui-foreground-500))"
                strokeDasharray="4 4"
            />
            <ReferenceLine
                x={computedCurrentPrice}
                stroke="hsl(var(--heroui-primary))"
                strokeWidth={2}
                ifOverflow="extendDomain"
                label={({ viewBox }) => {
                    const { x, y, height } = viewBox
                    return (
                        <text
                            x={(() => {
                                if (pricePosition === PricePosition.Above) {
                                    return x + 5
                                }
                                if (pricePosition === PricePosition.Below) {
                                    return x - 5
                                }
                                if (isAboveHalf) {
                                    return x - 5
                                }
                                return x + 5
                            })()}
                            y={y + height - 3}  
                            textAnchor={
                                (() => {
                                    if (pricePosition === PricePosition.Above) {
                                        return "start"
                                    }
                                    if (pricePosition === PricePosition.Below) {
                                        return "end"
                                    }
                                    if (isAboveHalf) {
                                        return "end"
                                    }
                                    return "start"
                                })()
                            }
                            fill="hsl(var(--heroui-foreground-500))"
                            fontSize={12}
                        >
                            {roundNumber(currentPrice, 2)}
                        </text>
                    )
                }}
            />    
        </RechartsAreaChart>
    )
}

export const computeCurrentPrice = (
    { current, lower, upper, maxRatio = 0.1 }: CompressCurrentPriceProps
) => {
    const cur = new Decimal(current)
    const low = new Decimal(lower)
    const up = new Decimal(upper)

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
        return newPrice.toNumber()

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

    return roundNumber(result.toNumber(), 2)
}

export interface CompressCurrentPriceProps {
    current: number
    lower: number
    upper: number
    maxRatio?: number
}