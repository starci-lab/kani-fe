import React, { useMemo } from "react"
import { BotSchema, TokenType } from "@/modules/types"
import { KaniCard, KaniCardBody, KaniChip, KaniDivider, KaniImage } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import { useAppSelector } from "@/redux"
import { computeDenomination } from "@/modules/utils"
import BN from "bn.js"
import { useRouter } from "next/navigation"
import { paths } from "@/modules"

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
    return (
        <KaniCard isPressable onPress={() => router.push(paths().bots().bot(bot.id))}>
            <KaniCardBody>
                <div className="flex items-center justify-between gap-4">
                    <div className="font-bold">
                        {bot.name}
                    </div>
                    <KaniChip color="primary" size="sm" variant="flat">
                        Active
                    </KaniChip>
                </div>
                <Spacer y={6} />
                <div className="flex justify-between items-center gap-4">
                    <div className="text-sm text-foreground-500">ROI</div>
                    <div className="text-sm">
                        123%
                    </div>
                </div>
                <Spacer y={4} />
                <KaniDivider/>
                <Spacer y={4} />
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-center gap-4">
                            <div className="text-sm text-foreground-500">Target</div>
                            <div className="flex items-center gap-2">
                                <KaniImage src={targetToken?.iconUrl} className="w-5 h-5"/>
                                <div className="text-sm w-[50px] text-right">
                                    {computeDenomination(new BN(bot.snapshotTargetBalanceAmount || "0"), targetToken?.decimals || 8).toString()}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-foreground-500">Quote</div>
                            <div className="flex items-center gap-2">
                                <KaniImage src={quoteToken?.iconUrl} className="w-5 h-5"/>
                                <div className="text-sm w-[50px] text-right">
                                    {computeDenomination(new BN(bot.snapshotQuoteBalanceAmount || "0"), quoteToken?.decimals || 8).toString()}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-foreground-500">Gas</div>
                            <div className="flex items-center gap-2">
                                <KaniImage src={gasToken?.iconUrl} className="w-5 h-5"/>
                                <div className="text-sm w-[50px] text-right">
                                    {computeDenomination(new BN(bot.snapshotGasBalanceAmount || "0"), gasToken?.decimals || 8).toString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}