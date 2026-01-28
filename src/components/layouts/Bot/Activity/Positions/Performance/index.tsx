
import React, { useMemo } from "react"
import { PositionSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { round, computePercentage } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import Decimal from "decimal.js"
export interface PerformanceProps {
    position: PositionSchema
}

export const Performance = ({ position }: PerformanceProps) => {
    const liquidityPool = useMemo(() => position.associatedLiquidityPool, [position.associatedLiquidityPool])
    const [pnl, isPositivePnl] = useMemo(() => {
        const pnl = new Decimal(round(new Decimal(position.pnl ?? 0))).toNumber()
        return [pnl, new Decimal(pnl).isPositive()]
    }, [position.pnl])
    const bot = useAppSelector((state) => state.bot.bot)
    const tokens = useAppSelector((state) => state.static.tokens)
    const token = useMemo(() => tokens.find((token) => token.id === liquidityPool?.tokenA), [tokens, liquidityPool?.tokenA])
    const targetToken = useMemo(() => token?.id === bot?.targetToken ? token : token?.id === liquidityPool?.tokenB ? token : null, [token, bot?.targetToken, liquidityPool?.tokenB])
    const [roi, isPositiveRoi] = useMemo(() => {
        const roi = new Decimal(round(position.roi ?? 0)).toNumber()
        return [roi, new Decimal(roi).isPositive()]
    }, [position.roi])  
    return (
        <div>
            <div className="flex items-center gap-2 w-full">
                <div className="text-sm text-foreground-500">PNL</div>
                <div className={`text-sm ${isPositivePnl ? "text-success" : "text-danger"}`}>{round(new Decimal(pnl)).toNumber()} {targetToken?.symbol}</div>
            </div>
            <Spacer y={2} />
            <div className="flex items-center gap-2 w-full">
                <div className="text-sm text-foreground-500">ROI</div>
                <div className={`text-sm ${isPositiveRoi ? "text-success" : "text-danger"}`}>{round(new Decimal(roi)).toNumber()}%</div>
            </div>
        </div>
    )
}
