import React, { useMemo } from "react"
import { useQueryFundingSnapshotV2Swr } from "@/hooks/singleton"
import { BalanceEligibilityStatus, ChainId, TokenType } from "@/modules/types"
import { KaniAlert } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import { useAppSelector } from "@/redux"
import { computeDenomination } from "@/modules/utils"
import { BN } from "bn.js"

export const EligibilityStatus = () => {
    const queryFundingSnapshotV2Swr = useQueryFundingSnapshotV2Swr()
    const balanceEligibilityStatus = queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.balanceEligibilityStatus
    const bot = useAppSelector((state) => state.bot.bot)
    const tokens = useAppSelector((state) => state.static.tokens)
    const targetToken = useMemo(() => tokens.find((token) => token.id === bot?.targetToken), [tokens, bot?.targetToken])
    const gasConfig = useAppSelector((state) => state.static.gasConfig)
    const gasAmountRequired = useMemo(() => gasConfig?.gasAmountRequired?.[bot?.chainId ?? ChainId.Solana], [gasConfig, bot?.chainId])
    const targetOperationalAmount = useMemo(() => gasAmountRequired?.targetOperationalAmount, [gasAmountRequired?.targetOperationalAmount])
    const targetOperationalAmountDecimal = useMemo(() => computeDenomination(new BN(targetOperationalAmount ?? "0"), targetToken?.decimals ?? 9), [targetOperationalAmount, targetToken?.decimals])
    const balanceConfig = useAppSelector(
        (state) => state.static.balanceConfig
    )
    const gasToken = useMemo(() => tokens.find((token) => token.chainId === bot?.chainId && token.type === TokenType.Native), [tokens, bot?.chainId])
    const balanceRequired = useMemo(() => balanceConfig?.balanceRequired?.[bot?.chainId ?? ChainId.Solana], [balanceConfig, bot?.chainId])
    const minRequiredAmountInUsd = useMemo(() => balanceRequired?.minRequiredAmountInUsd, [balanceRequired?.minRequiredAmountInUsd])
    const renderEligibilityStatus = () => {
        switch (balanceEligibilityStatus) {
            case BalanceEligibilityStatus.Ok:
                return <></>
            case BalanceEligibilityStatus.NotEnoughGas:
                return (<>
                    <Spacer y={4} />
                    <KaniAlert
                        color="warning"
                        title="Not Enough Gas"
                        description={
                            <div>
                                <div>The bot does not have enough gas to open a position.</div>
                                <div>
                                    Required gas: {targetOperationalAmountDecimal.toString()} {targetToken?.symbol}.
                                    Current gas: {queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.gasBalanceAmount?.toString() || "0"} {gasToken?.symbol}.
                                </div>
                            </div>
                        }
                    />
                </>
                )
            case BalanceEligibilityStatus.InsufficientFunds:
                return (<>
                    <Spacer y={4} />
                    <KaniAlert
                        color="warning"
                        title="Insufficient Funds"
                        description={
                            <div>
                                <div>The bot does not have enough funds to open a position.</div>
                                <div>
                                    Required balance (excluding gas): {minRequiredAmountInUsd} USD.
                                    Current balance:{" "}
                                    {queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.balanceExcludingGasInUsdc?.toString() || "0"} USD.
                                </div>
                            </div>
                        }
                    />
                </>
                )
            case BalanceEligibilityStatus.StalePrice:
            case BalanceEligibilityStatus.Error:
                return (<>
                    <Spacer y={4} />
                    <KaniAlert
                        color="danger"
                        title="Error"
                        description="An error occurred while fetching the eligibility status."
                    />
                </>
                )
        }
    }
    return renderEligibilityStatus()
}