import { KaniCard, KaniCardBody, TooltipTitle } from "@/components"
import { useAppSelector } from "@/redux/hooks"
import { Spacer } from "@heroui/react"
import React, { useMemo } from "react"
import { TokenCard, TokenCardType } from "./TokenCard"
import { TokenType } from "@/modules/types"
import Decimal from "decimal.js"
import { computeDenomination } from "@/modules/utils"
import BN from "bn.js"
import { HistoryChart } from "./HistoryChart"
import numeral from "numeral"
import { IntervalTabs } from "./IntervalTabs"

export const Investment = () => {
    const tokens = useAppSelector(
        (state) => state.static.tokens
    )
    const bot = useAppSelector(
        (state) => state.bot.bot
    )
    const targetToken = useMemo(() => tokens.find(
        (token) => token.id === bot?.targetToken
    ), [tokens, bot?.targetToken])
    const quoteToken = useMemo(() => tokens.find(
        (token) => token.id === bot?.quoteToken
    ), [tokens, bot?.quoteToken])
    const gasToken = useMemo(() => tokens.find(
        (token) => token.chainId === bot?.chainId
        && token.type === TokenType.Native
    ), [tokens, bot?.chainId])
    const tokenPrices = useAppSelector((state) => state.socket.tokenPrices)
    const targetTokenAmount = useMemo(() => {
        if (!bot?.snapshotTargetBalanceAmount || !targetToken) {
            return new Decimal(0)
        }
        const amount = computeDenomination(new BN(bot.snapshotTargetBalanceAmount), targetToken?.decimals)
        return amount.mul(tokenPrices[targetToken.displayId] || 0)
    }, [
        tokenPrices,
        targetToken, 
        bot?.snapshotTargetBalanceAmount
    ])

    const quoteTokenAmount = useMemo(() => {
        if (!bot?.snapshotQuoteBalanceAmount || !quoteToken) {
            return new Decimal(0)
        }
        const amount = computeDenomination(new BN(bot.snapshotQuoteBalanceAmount), quoteToken?.decimals)
        return amount.mul(tokenPrices[quoteToken.displayId] || 0)
    }, [tokenPrices, quoteToken, bot?.snapshotQuoteBalanceAmount])

    const gasTokenAmount = useMemo(() => {
        if (!bot?.snapshotGasBalanceAmount || !gasToken) {
            return new Decimal(0)
        }
        const amount = computeDenomination(new BN(bot.snapshotGasBalanceAmount), gasToken?.decimals)
        return amount.mul(tokenPrices[gasToken.displayId] || 0)
    }, [tokenPrices, gasToken, bot?.snapshotGasBalanceAmount])
    const totalInvestment = useMemo(() => {
        return targetTokenAmount.add(quoteTokenAmount).add(gasTokenAmount)
    }, [targetTokenAmount, quoteTokenAmount, gasTokenAmount])
    
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex justify-between items-start">
                    <div>
                        <TooltipTitle
                            title="Investment"
                            tooltipString="The investment of the bot." />
                        <Spacer y={3} />
                        <div className="text-3xl font-bold leading-none">
                    ${numeral(totalInvestment.toString()).format("0,0.00000")}
                        </div>
                    </div>
                    <IntervalTabs />
                </div>
                <Spacer y={4} />
                <HistoryChart />
                <Spacer y={4} />
                <TooltipTitle
                    title="Assets"
                    tooltipString="The assets of the bot." />
                <Spacer y={4} />
                <div className="flex gap-2">
                    <TokenCard
                        token={targetToken}
                        type={TokenCardType.TargetToken}
                        balanceAmount={bot?.snapshotTargetBalanceAmount?.toString() || "0"}
                    />
                    <TokenCard
                        token={quoteToken}
                        type={TokenCardType.QuoteToken}
                        balanceAmount={bot?.snapshotQuoteBalanceAmount?.toString() || "0"}
                    />
                    <TokenCard
                        token={gasToken}
                        type={TokenCardType.GasToken}
                        balanceAmount={bot?.snapshotGasBalanceAmount?.toString() || "0"}
                    />
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}