
import React, { useMemo } from "react"
import { PerformanceDisplayMode, PositionSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { round } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import Decimal from "decimal.js"
export interface PerformanceProps {
    position: PositionSchema
}

export const Performance = ({ position }: PerformanceProps) => {
    const bot = useAppSelector((state) => state.bot.bot)
    const liquidityPool = useMemo(() => position.associatedLiquidityPool, [position.associatedLiquidityPool])
    const tokens = useAppSelector((state) => state.static.tokens)
    const targetToken = useMemo(() => tokens.find((token) => token.id === liquidityPool?.tokenA), [tokens, liquidityPool?.tokenA])
    const [pnlString, isPositivePnlString] = useMemo(() => {
        const pnl = new Decimal(round(new Decimal(position.performance?.pnl ?? 0))).toNumber()
        return [`${round(new Decimal(position.performance?.pnl ?? 0)).toNumber()} ${targetToken?.symbol}`, new Decimal(pnl).isPositive()]
    }, [position.performance?.pnl, targetToken?.symbol])
    const [roiString, isPositiveRoiString] = useMemo(() => {
        const roi = new Decimal(round(new Decimal(position.performance?.roi ?? 0))).toNumber()
        return [`${round(new Decimal(position.performance?.roi ?? 0)).toNumber()}%`, new Decimal(roi).isPositive()]
    }, [position.performance?.roi])
    const [pnlUsdString, isPositivePnlUsdString] = useMemo(() => {
        const pnlUsd = new Decimal(round(new Decimal(position.performance?.pnlUsd ?? 0))).toNumber()
        return [`${round(new Decimal(position.performance?.pnlUsd ?? 0)).toNumber()} USD`, new Decimal(pnlUsd).isPositive()]
    }, [position.performance?.pnlUsd])
    const [roiUsdString, isPositiveRoiUsdString] = useMemo(() => {
        const roiUsd = new Decimal(round(new Decimal(position.performance?.roiUsd ?? 0))).toNumber()
        return [`${round(new Decimal(position.performance?.roiUsd ?? 0)).toNumber()}%`, new Decimal(roiUsd).isPositive()]
    }, [position.performance?.roiUsd])
    const pnl= bot?.positionsPerformanceDisplayMode === PerformanceDisplayMode.Usd ? pnlUsdString : pnlString
    const isPositivePnl = bot?.positionsPerformanceDisplayMode === PerformanceDisplayMode.Usd ? isPositivePnlUsdString : isPositivePnlString
    const roi = bot?.positionsPerformanceDisplayMode === PerformanceDisplayMode.Usd ? roiUsdString : roiString
    const isPositiveRoi = bot?.positionsPerformanceDisplayMode === PerformanceDisplayMode.Usd ? isPositiveRoiUsdString : isPositiveRoiString
    return (
        <div>
            <div className="flex items-center gap-2 w-full">
                <div className="text-sm text-foreground-500">PNL</div>
                <div className={`text-sm ${isPositivePnl ? "text-success" : "text-danger"}`}>{pnl}</div>
            </div>
            <Spacer y={2} />
            <div className="flex items-center gap-2 w-full">
                <div className="text-sm text-foreground-500">ROI</div>
                <div className={`text-sm ${isPositiveRoi ? "text-success" : "text-danger"}`}>{roi}</div>
            </div>
        </div>
    )
}
