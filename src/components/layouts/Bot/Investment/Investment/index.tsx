import { KaniDivider, KaniLink, KaniSkeleton, TooltipTitle } from "@/components"
import { useAppSelector } from "@/redux/hooks"
import { Spacer } from "@heroui/react"
import React, { useMemo } from "react"
import { TokenCard, TokenCardType } from "./TokenCard"
import { ChainId, TokenType } from "@/modules/types"
import { HistoryChart } from "./HistoryChart"
import numeral from "numeral"
import { IntervalTabs } from "./IntervalTabs"
import { useQueryFundingSnapshotV2Swr, useQueryStaticSwr } from "@/hooks/singleton"
import { ArrowClockwiseIcon } from "@phosphor-icons/react"
import { EligibilityStatus } from "./EligibilityStatus"
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
    const queryFundingSnapshotV2Swr = useQueryFundingSnapshotV2Swr()
    const gasConfig = useAppSelector(
        (state) => state.static.gasConfig
    )
    const gasAmountRequired = useMemo(() => gasConfig?.gasAmountRequired?.[bot?.chainId ?? ChainId.Solana], [gasConfig, bot?.chainId])
    const targetOperationalAmount = useMemo(() => gasAmountRequired?.targetOperationalAmount, [gasAmountRequired?.targetOperationalAmount])
    const targetOperationalAmountDecimal = useMemo(() => computeDenomination(new BN(targetOperationalAmount ?? "0"), targetToken?.decimals ?? 9), [targetOperationalAmount, targetToken?.decimals])
    const balanceConfig = useAppSelector(
        (state) => state.static.balanceConfig
    )
    const balanceRequired = useMemo(() => balanceConfig?.balanceRequired?.[bot?.chainId ?? ChainId.Solana], [balanceConfig, bot?.chainId])
    const minRequiredAmountInUsd = useMemo(() => balanceRequired?.minRequiredAmountInUsd, [balanceRequired?.minRequiredAmountInUsd])
    const isLoading = useMemo(() => {
        return queryFundingSnapshotV2Swr.isLoading || !queryFundingSnapshotV2Swr.data || !bot
    }, [queryFundingSnapshotV2Swr.isLoading, queryFundingSnapshotV2Swr.data, bot])
    const staticSwr = useQueryStaticSwr()
    return (
        <div>
            <div className="flex justify-between items-start">
                <div>
                    <TooltipTitle
                        title="Investment"
                    />
                    <Spacer y={1} />
                    <div className="text-3xl font-bold leading-none">
                        {
                            isLoading ? (
                                <KaniSkeleton className="h-[30px] w-[120px] rounded-md"/>
                            ) : (
                                <div className="text-3xl font-bold leading-none">
                                    ${numeral(queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.balanceIncludingGasInUsdc?.toString() || "0").format("0,0.00000")}
                                </div>
                            )}
                    </div>
                </div>
                <IntervalTabs />
            </div>
            <EligibilityStatus />
            <Spacer y={4} />
            <HistoryChart />
            <Spacer y={8} />
            <div className="flex justify-between items-center">
                <TooltipTitle
                    title="Assets" 
                />
                <KaniLink
                    color="primary"
                    className="cursor-pointer"
                    onPress={() => {
                        queryFundingSnapshotV2Swr.mutate()
                    }}
                >
                    <ArrowClockwiseIcon className="w-5 h-5 cursor-pointer" />
                </KaniLink>
            </div>
            <Spacer y={3} />
            <div className="flex gap-2">
                <TokenCard
                    token={targetToken}
                    type={TokenCardType.TargetToken}
                    balanceAmount={queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.targetBalanceAmount?.toString() || "0"}
                    isLoading={isLoading}
                />
                <TokenCard
                    token={quoteToken}
                    type={TokenCardType.QuoteToken}
                    balanceAmount={queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.quoteBalanceAmount?.toString() || "0"}
                    isLoading={isLoading}
                />
                <TokenCard
                    token={gasToken}
                    type={TokenCardType.GasToken}
                    balanceAmount={queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.gasBalanceAmount?.toString() || "0"}
                    isLoading={isLoading}
                />
            </div>
            <Spacer y={4} />
            <div className="flex gap-2">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2 items-center">
                        <TooltipTitle
                            title="Minimum Balance (Excl. Gas)"
                            classNames={{
                                title: "text-xs text-foreground-500",
                                questionMarkIconClassName: "w-3 h-3",
                            }}
                            tooltipString="The minimum trading balance (excluding gas) required for the bot to open and manage positions."
                            showQuestionMark={true}
                        />
                        <div className="text-xs">
                            {
                                staticSwr.isLoading ? (
                                    <KaniSkeleton className="h-[14px] w-[40px] rounded-md"/>
                                ) : (
                                    `${minRequiredAmountInUsd} USD`
                                )
                            }
                        </div>
                    </div>
                    <KaniDivider orientation="vertical" className="h-4"/>
                    <div className="flex gap-2 items-center">
                        <TooltipTitle
                            title="Minimum Gas Balance"
                            classNames={{
                                title: "text-xs text-foreground-500",
                                questionMarkIconClassName: "w-3 h-3",
                            }}
                            showQuestionMark={true}
                            tooltipString="The minimum gas balance required for the bot to execute transactions on the network."
                        />
                        {
                            staticSwr.isLoading ? (
                                <KaniSkeleton className="h-[14px] w-[40px] rounded-md"/>
                            ) : (
                                <div className="text-xs">
                                    {targetOperationalAmountDecimal.toString()} {targetToken?.symbol}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}