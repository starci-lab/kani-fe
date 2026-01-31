import React, { useMemo } from "react"
import { useDepositDisclosure, useQueryPortfolioValueV2Swr } from "@/hooks/singleton"
import { BalanceEvalStatus, ChainId, TokenId, TokenType } from "@/modules/types"
import { KaniAlert } from "../../../../../atomic"
import { Button, Spacer } from "@heroui/react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Decimal from "decimal.js"
import { setDepositModalTokenId } from "@/redux"
import { round } from "@/modules/utils"

export const EvalStatus = () => {
    const queryPortfolioValueV2Swr = useQueryPortfolioValueV2Swr()
    const balanceEvalStatus = useMemo(
        () => queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.status, 
        [queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.status]
    )
    const gasBalanceAmount = useMemo(() => {
        return queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.gasBalanceAmount
    }, [
        queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.gasBalanceAmount 
    ])
    const gasConfig = useAppSelector(
        (state) => state.static.gasConfig
    )
    const bot = useAppSelector(
        (state) => state.bot.bot
    )
    const targetOperationalAmount = useMemo(() => gasConfig?.gasAmountRequired?.[bot?.chainId ?? ChainId.Solana]?.targetOperationalAmount, [gasConfig, bot?.chainId])
    const requiredDepositGasAmount = useMemo(() => round(new Decimal(targetOperationalAmount ?? 0).sub(new Decimal(gasBalanceAmount ?? 0))), [targetOperationalAmount, gasBalanceAmount])
    const tokens = useAppSelector(
        (state) => state.static.tokens
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
    const dispatch = useAppDispatch()
    const depositDisclosure = useDepositDisclosure()
    const balanceConfig = useAppSelector(
        (state) => state.static.balanceConfig
    )
    const minRequiredAmountInUsd = useMemo(() => balanceConfig?.balanceRequired?.[bot?.chainId ?? ChainId.Solana]?.minRequiredAmountInUsd, [balanceConfig, bot?.chainId])
    const renderEvalStatus = () => {
        switch (balanceEvalStatus) {
            case BalanceEvalStatus.InsufficientFunding:
                return <>
                <Spacer y={6} />
                <KaniAlert
                    classNames={{
                        base: "!bg-warning/20"
                    }}
                    color="warning"
                    title="Not Enough Funding"
                    description={
                        <div>
                            <div>Not enough funding to open a new position. Please deposit more {targetToken?.symbol} and/or {quoteToken?.symbol} to reach at least {minRequiredAmountInUsd} USD and try again.</div> 
                            <Spacer y={2} />
                            <Button
                                color="warning"
                                size="sm"
                                variant="flat"
                                onPress={() => {
                                    dispatch(setDepositModalTokenId(targetToken?.displayId ?? TokenId.SolNative))
                                    depositDisclosure.onOpen()
                                }}
                            >
                                Deposit
                            </Button>
                            <div>         
                            </div>
                        </div>
                    }
                />
            </>
            case BalanceEvalStatus.InsufficientGas:
                return (
                <>
                    <Spacer y={6} />
                    <KaniAlert
                        classNames={{
                            base: "!bg-warning/20"
                        }}
                        color="warning"
                        title="Not Enough Gas"
                        description={
                            <div>
                                <div>Not enough gas to open a new position. Please deposit {requiredDepositGasAmount.toString()} {gasToken?.symbol} and try again.</div> 
                                <Spacer y={3} />
                                <Button
                                    color="warning"
                                    size="sm"
                                    variant="flat"
                                    onPress={() => {
                                        dispatch(setDepositModalTokenId(gasToken?.displayId ?? TokenId.SolNative))
                                        depositDisclosure.onOpen()
                                    }}
                                >
                                    Deposit
                                </Button>
                                <div>         
                                </div>
                            </div>
                        }
                    />
                </>
                )
            default:
                return null
        }
    }
    return renderEvalStatus()
}