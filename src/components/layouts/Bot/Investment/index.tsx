import { AreaChart, KaniCard, KaniCardBody, TooltipTitle } from "@/components"
import { useAppSelector } from "@/redux/hooks"
import { Spacer } from "@heroui/react"
import React, { useMemo } from "react"
import { TokenCard, TokenCardType } from "./TokenCard"
import { TokenType } from "@/modules/types"
import Decimal from "decimal.js"
import { computeDenomination } from "@/modules/utils"
import BN from "bn.js"

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
        targetToken, 
        bot?.snapshotTargetBalanceAmount
    ])

    const quoteTokenAmount = useMemo(() => {
        if (!bot?.snapshotQuoteBalanceAmount || !quoteToken) {
            return new Decimal(0)
        }
        const amount = computeDenomination(new BN(bot.snapshotQuoteBalanceAmount), quoteToken?.decimals)
        return amount.mul(tokenPrices[quoteToken.displayId] || 0)
    }, [quoteToken, bot?.snapshotQuoteBalanceAmount])

    const gasTokenAmount = useMemo(() => {
        if (!bot?.snapshotGasBalanceAmount || !gasToken) {
            return new Decimal(0)
        }
        const amount = computeDenomination(new BN(bot.snapshotGasBalanceAmount), gasToken?.decimals)
        return amount.mul(tokenPrices[gasToken.displayId] || 0)
    }, [gasToken, bot?.snapshotGasBalanceAmount])

    const totalInvestment = useMemo(() => {
        return targetTokenAmount.add(quoteTokenAmount).add(gasTokenAmount)
    }, [targetTokenAmount, quoteTokenAmount, gasTokenAmount])
    
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle
                    title="Investment"
                    tooltipString="The investment of the bot." />
                <div className="text-2xl font-bold">
                    ${totalInvestment.toString()}
                </div>
                <Spacer y={4} />
                <AreaChart />
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