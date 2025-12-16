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
    const paddingRatio = 0.2
    const computedCurrentPrice = computeCurrentPrice({ current: currentPrice, lower: priceLower, upper: priceUpper })
    const minX = Decimal.min(priceLower, computedCurrentPrice)
    const maxX = Decimal.max(computedCurrentPrice, priceUpper)
    const range = maxX.minus(minX).toNumber()

    const extendedMin = minX.minus(range * paddingRatio).toNumber()
    const extendedMax = maxX.plus(range * paddingRatio).toNumber()
    return (
        <RechartsAreaChart
            width={300}   
            height={120}     
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
            <defs>
                <linearGradient id="colorLiquidity" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="5%"
                        stopColor="hsl(var(--heroui-secondary))"
                        stopOpacity={0.8}
                    />
                    <stop
                        offset="95%"
                        stopColor="hsl(var(--heroui-secondary))"
                        stopOpacity={0}
                    />
                </linearGradient>
            </defs>
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
                stroke="hsl(var(--heroui-secondary))"
                fill="url(#colorLiquidity)"
                fillOpacity={1}
                dot={false}
                activeDot={false}
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
                            x={x + 5}
                            y={y + height - 3}  
                            textAnchor="start"
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
                            x={x - 5}
                            y={y + height - 3}  
                            textAnchor="end"
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
                            x={x - 5}
                            y={y + height - 3}  
                            textAnchor="end"
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
    { current, lower, upper, maxRatio = 0.5 }: CompressCurrentPriceProps
) => {
    if (
        new Decimal(current).gte(new Decimal(lower)) 
        && new Decimal(current).lte(new Decimal(upper))
    ) {
        return current
    }
    // space = upper - lower
    const space = new Decimal(upper).minus(new Decimal(lower))
    // isLower = current < lower
    const isLower = new Decimal(current).lt(new Decimal(lower))
    // diffFromBoundary = lower - current if isLower, otherwise current - upper
    const diffFromBoundary = isLower ? new Decimal(lower).minus(new Decimal(current)) : new Decimal(current).minus(new Decimal(upper))
    // diffFromBoundaryPlusSpace = diffFromBoundary + space
    const diffFromBoundaryPlusSpace = diffFromBoundary.add(space)
    // compressed = diffFromBoundary / diffFromBoundaryPlusSpace * space * maxRatio
    const compressed = (diffFromBoundary).div(diffFromBoundaryPlusSpace).mul(space).mul(maxRatio)
    // result = lower - compressed if isLower, otherwise upper + compressed
    const result = isLower ? new Decimal(lower).minus(compressed) : new Decimal(upper).plus(compressed)
    return roundNumber(result.toNumber(), 2)
}

export interface CompressCurrentPriceProps {
    current: number
    lower: number
    upper: number
    maxRatio?: number
}