import React, { useMemo } from "react"
import { BotSchema, TokenType } from "@/modules/types"
import { KaniCard, KaniCardBody, KaniChip, KaniDivider, KaniImage } from "@/components/atomic"
import { cn, Spacer } from "@heroui/react"
import { useAppSelector } from "@/redux"
import { computeDenomination, roundNumber } from "@/modules/utils"
import BN from "bn.js"
import { useRouter } from "next/navigation"
import { paths } from "@/modules"
import Decimal from "decimal.js"
import { TooltipTitle } from "@/components/reuseable"

export interface BotCardProps {
    bot: BotSchema
}
export const BotCard = ({ bot }: BotCardProps) => {
    const router = useRouter()
    const tokens = useAppSelector(
        (state) => state.static.tokens)
    const targetToken = useMemo(
        () => tokens?.find((token) => token.id === bot.targetToken), [tokens, bot.targetToken]
    )
    const quoteToken = useMemo(
        () => tokens?.find((token) => token.id === bot.quoteToken), [tokens, bot.quoteToken]
    )
    const gasToken = useMemo(
        () => tokens?.find((token) => token.chainId === bot.chainId && token.type === TokenType.Native), 
        [tokens, bot.chainId]
    )
    const [roi24hString, isPositiveRoi24h] = useMemo(
        () => {
            const isPositiveRoi24h = new Decimal(roundNumber(bot.roi24h || 0)).isPositive()
            const roi = `${isPositiveRoi24h ? "+" : "-"}${new Decimal(roundNumber(bot.roi24h || 0)).toString()}%`
            return [roi, isPositiveRoi24h]
        }, [bot.roi24h]
    )
    const [pnl24hString, isPositivePnl24h] = useMemo(
        () => {
            const isPositivePnl24h = new Decimal(roundNumber(bot.pnl24h || 0)).isPositive()
            const pnl = `${isPositivePnl24h ? "+" : "-"}${new Decimal(roundNumber(bot.pnl24h || 0)).toString()}%`
            return [pnl, isPositivePnl24h]
        }, [bot.pnl24h]
    )
    return (
        <KaniCard isPressable onPress={() => router.push(paths().bots().bot(bot.id))}>
            <KaniCardBody>
                <div className="flex items-center justify-between gap-4">
                    <div className="font-bold">
                        {bot.name}
                    </div>
                    {
                        bot.running ?(
                            <KaniChip color="primary" size="sm" variant="flat">
                        Active
                            </KaniChip>
                        ) : (
                            <KaniChip color="secondary" size="sm" variant="flat">
                        Inactive
                            </KaniChip>
                        )
                    }
                </div>
                <Spacer y={6} />
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center gap-4">
                        <TooltipTitle
                            classNames={{
                                title: "text-sm text-foreground-500",
                            }}
                            title="ROI"
                            tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                        />
                        <div className={
                            cn(
                                "text-sm", {
                                    "text-success": isPositiveRoi24h,
                                    "text-danger": !isPositiveRoi24h,
                                }
                            )
                        }>
                            {roi24hString}
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <TooltipTitle
                            classNames={{
                                title: "text-sm text-foreground-500",
                            }}
                            title="P&L"
                            tooltipString="The total profit or loss made by the bot, measured in USDC."
                        />
                        <div className={
                            cn(
                                "text-sm", {
                                    "text-success": isPositivePnl24h,
                                    "text-danger": !isPositivePnl24h,
                                }
                            )
                        }>
                            {pnl24hString}
                        </div>
                    </div>
                </div>
                <Spacer y={4} />
                <KaniDivider/>
                <Spacer y={4} />
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-center gap-4">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="Target"
                                tooltipString="The target token of the bot."
                            />
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-right">
                                    {computeDenomination(new BN(bot.snapshotTargetBalanceAmount || "0"), targetToken?.decimals || 8).toString()}
                                </div>
                                <KaniImage src={targetToken?.iconUrl} className="w-5 h-5"/>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="Quote"
                                tooltipString="The quote token of the bot."
                            />
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-right">
                                    {computeDenomination(new BN(bot.snapshotQuoteBalanceAmount || "0"), quoteToken?.decimals || 8).toString()}
                                </div>
                                <KaniImage src={quoteToken?.iconUrl} className="w-5 h-5"/>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="Gas"
                                tooltipString="The gas token of the bot."
                            />
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-right">
                                    {computeDenomination(new BN(bot.snapshotGasBalanceAmount || "0"), gasToken?.decimals || 8).toString()}
                                </div>
                                <KaniImage src={gasToken?.iconUrl} className="w-5 h-5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}