import React, { useMemo } from "react"
import { BotSchema, PerformanceDisplayMode } from "@/modules/types"
import { KaniChip } from "@/components/atomic"
import { useAppSelector } from "@/redux"
import { roundNumber } from "@/modules/utils"
import { useRouter } from "next/navigation"
import { getChainMetadata, paths } from "@/modules"
import Decimal from "decimal.js"
import { BotDisplayMode } from "@/redux/slices/bot"
import { BotCardGrid } from "./Grid"
import { BotCardList } from "./List"

export interface BotCardProps {
    bot: BotSchema
}

export const BotCard = ({ bot }: BotCardProps) => {
    const router = useRouter()
    const displayMode = useAppSelector((state) => state.bot.displayMode)
    const tokens = useAppSelector((state) => state.static.tokens)
    
    const targetToken = useMemo(
        () => tokens?.find((token) => token.id === bot.targetToken), 
        [tokens, bot.targetToken]
    )
    const quoteToken = useMemo(
        () => tokens?.find((token) => token.id === bot.quoteToken), 
        [tokens, bot.quoteToken]
    )
    
    const [roi24hString, isPositiveRoi24h] = useMemo(
        () => {
            const isPositiveRoi24h = new Decimal(roundNumber(bot.performance24h?.roi || 0)).isPositive()
            const roi = `${isPositiveRoi24h ? "+" : "-"}${new Decimal(roundNumber(bot.performance24h?.roi || 0)).abs().toString()}%`
            return [roi, isPositiveRoi24h]
        }, 
        [bot.performance24h?.roi]
    )
    
    const [pnl24hString, isPositivePnl24h] = useMemo(
        () => {
            const isPositivePnl24h = new Decimal(roundNumber(bot.performance24h?.pnl || 0)).isPositive()
            const pnl = `${isPositivePnl24h ? "+" : "-"}${new Decimal(roundNumber(bot.performance24h?.pnl || 0)).abs().toString()} ${targetToken?.symbol}`
            return [pnl, isPositivePnl24h]
        }, 
        [bot.performance24h?.pnl, targetToken?.symbol]
    )
    
    const [roi24hInUsdString, isPositiveRoi24hInUsd] = useMemo(
        () => {
            const isPositiveRoi24hInUsd = new Decimal(roundNumber(bot.performance24h?.roiInUsd || 0)).isPositive()
            const roiInUsd = `${isPositiveRoi24hInUsd ? "+" : "-"}${new Decimal(roundNumber(bot.performance24h?.roiInUsd || 0)).abs().toString()}%`
            return [roiInUsd, isPositiveRoi24hInUsd]
        }, 
        [bot.performance24h?.roiInUsd]
    )
    
    const [pnl24hInUsdString, isPositivePnl24hInUsd] = useMemo(
        () => {
            const isPositivePnl24hInUsd = new Decimal(roundNumber(bot.performance24h?.pnlInUsd || 0)).isPositive()
            const pnlInUsd = `${isPositivePnl24hInUsd ? "+" : "-"}${new Decimal(roundNumber(bot.performance24h?.pnlInUsd || 0)).abs().toString()} USD`
            return [pnlInUsd, isPositivePnl24hInUsd]
        }, 
        [bot.performance24h?.pnlInUsd]
    )
    
    const roiString = bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? roi24hInUsdString : roi24hString
    const isPositiveRoi = bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? isPositiveRoi24hInUsd : isPositiveRoi24h
    const pnlString = bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? pnl24hInUsdString : pnl24hString
    const isPositivePnl = bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? isPositivePnl24hInUsd : isPositivePnl24h
    
    const renderLiquidityStatusChip = () => {
        return (
            <div className="flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-success" />
                <div className="text-sm text-success">
                    In Range
                </div>
            </div>
        )
        return (
            <KaniChip color="danger" variant="flat">
                Out of Range
            </KaniChip>
        )
        return (
            <KaniChip color="warning" variant="flat">
                Idle
            </KaniChip>
        )
    }
    
    const chainMetadata = useMemo(() => getChainMetadata(bot.chainId), [bot.chainId])
    const capitalString = "50,000 USDC" // TODO: Calculate actual capital
    
    if (!targetToken || !quoteToken) {
        return null
    }
    
    const cardProps = {
        bot,
        targetToken,
        quoteToken,
        botName: bot.name,
        isRunning: bot.running,
        roiString,
        isPositiveRoi,
        pnlString,
        isPositivePnl,
        capitalString,
        liquidityStatusChip: renderLiquidityStatusChip(),
        chainIconUrl: chainMetadata?.iconUrl,
        chainName: chainMetadata?.name,
        accountAddress: bot.accountAddress ?? "",
        poolAddress: bot.activePosition?.associatedLiquidityPool?.poolAddress,
        onCardPress: () => router.push(paths().bots().bot(bot.id)),
    }
    
    return displayMode === BotDisplayMode.Grid ? (
        <BotCardGrid {...cardProps} />
    ) : (
        <BotCardList {...cardProps} />
    )
}
