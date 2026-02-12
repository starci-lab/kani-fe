"use client"
import React, { useMemo } from "react"
import { setBotTab, useAppDispatch, useAppSelector } from "@/redux"
import { Overview } from "./Overview"
import { ChartLineIcon, GearSixIcon, PlayIcon, SquaresFourIcon, StopIcon, WalletIcon } from "@phosphor-icons/react"
import { KaniBreadcrumb, KaniBreadcrumbItem, KaniButton, KaniDivider, KaniTooltip } from "../../atomic"
import { WaveBars } from "../../reuseable"
import { Spacer, Tabs, Tab, Skeleton } from "@heroui/react"
import { BotTab } from "@/redux"
import { Portfolio } from "./Portfolio"
import { Activity } from "./Activity"
import { useQueryBotV2Swr, useQueryPortfolioValueV2Swr, useToggleBotV2SwrMutation } from "@/hooks/singleton"
import { runGraphQLWithToast } from "@/modules/toast"
import { PrivySecurityAlert } from "./PrivySecurityAlert"
import { Settings } from "./Settings"
import { useRouter } from "next/navigation"
import { paths } from "@/resources/path"
import { BalanceEvalStatus, ChainId, TokenType } from "@/modules/types"
import { round } from "@/modules/utils"
import Decimal from "decimal.js"

export const Bot = () => {
    const tabs = [
        {
            key: BotTab.Overview,
            title: "Overview",
            icon: SquaresFourIcon
        },
        {
            key: BotTab.Portfolio,
            title: "Portfolio",
            icon: WalletIcon
        },
        {
            key: BotTab.Activity,
            title: "Activity",
            icon: ChartLineIcon
        },
        {
            key: BotTab.Settings,
            title: "Settings",
            icon: GearSixIcon
        },
    ]
    const bot = useAppSelector((state) => state.bot.bot)
    const tab = useAppSelector((state) => state.bot.tab)
    const dispatch = useAppDispatch()
    const toggleBotV2SwrMutation = useToggleBotV2SwrMutation()
    const queryBotV2Swr = useQueryBotV2Swr()
    const renderTab = () => {
        switch (tab) {
            case BotTab.Overview:
                return <Overview />
            case BotTab.Portfolio:
                return <Portfolio />
            case BotTab.Activity:
                return <Activity />
            case BotTab.Settings:
                return <Settings />
        }
    }
    const queryPortfolioValueV2Swr = useQueryPortfolioValueV2Swr()
    const isRunBotDisabled = useMemo(() => {
        return queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.status !== BalanceEvalStatus.Ok
    }, [queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.status])
    const router = useRouter()
    const tokens = useAppSelector(
        (state) => state.static.tokens
    )
    const targetToken = useMemo(() => {
        return tokens.find(
            (token) => token.id === bot?.targetToken
        )
    }, [tokens, bot?.targetToken])
    const quoteToken = useMemo(() => {
        return tokens.find(
            (token) => token.id === bot?.quoteToken
        )
    }, [tokens, bot?.quoteToken])
    const gasToken = useMemo(() => {
        return tokens.find(
            (token) => token.chainId === bot?.chainId
                && token.type === TokenType.Native
        )
    }, [tokens, bot?.chainId])
    const gasConfig = useAppSelector(
        (state) => state.static.gasConfig
    )
    const targetOperationalAmount = useMemo(() => gasConfig?.gasAmountRequired?.[bot?.chainId ?? ChainId.Solana]?.targetOperationalAmount, [gasConfig, bot?.chainId])
    const gasBalanceAmount = useMemo(() => queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.gasBalanceAmount, [queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.gasBalanceAmount])
    const requiredDepositGasAmount = useMemo(() => {
        return round(new Decimal(targetOperationalAmount ?? 0).sub(new Decimal(gasBalanceAmount ?? 0)))
    }, [targetOperationalAmount, gasBalanceAmount])
    const balanceConfig = useAppSelector(
        (state) => state.static.balanceConfig
    )
    const minRequiredAmountInUsd = useMemo(() => balanceConfig?.balanceRequired?.[bot?.chainId ?? ChainId.Solana]?.minRequiredAmountInUsd, [balanceConfig, bot?.chainId])
    const renderRunBotButton = () => {
        const button = (
            <KaniButton
                startContent={<PlayIcon />}
                color="primary"
                isDisabled={isRunBotDisabled}
                onPress={
                    async () => {
                        await runGraphQLWithToast(
                            async () => {
                                const response = await toggleBotV2SwrMutation.trigger({
                                    request: {
                                        id: bot?.id ?? "",
                                        running: true,
                                    },
                                })
                                if (!response.data?.toggleBotV2) {
                                    throw new Error("Failed to toggle bot")
                                }
                                // refetch bot
                                await queryBotV2Swr.mutate()
                                return response.data.toggleBotV2
                            }, {
                            showSuccessToast: true,
                            showErrorToast: true,
                        })
                    }}
            >
                Run Bot
            </KaniButton>
        )
        if (isRunBotDisabled) {
            return (
                <KaniTooltip
                    content={
                        (() => {
                            const status = queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.status
                            switch (status) {
                                case BalanceEvalStatus.InsufficientFunding:
                                    return (
                                        <div>Not enough funding to open a new position. Please deposit more {targetToken?.symbol} and/or {quoteToken?.symbol} to reach at least {minRequiredAmountInUsd} USD and try again.</div>
                                    )
                                case BalanceEvalStatus.InsufficientGas:
                                    return (
                                        <div>
                                            Not enough gas to open a new position. Please deposit {requiredDepositGasAmount.toString()} {gasToken?.symbol} and try again.
                                        </div>
                                    )
                                default:
                                    return null
                            }
                        })()
                    }
                >
                    <span className="inline-block">
                        {button}
                    </span>
                </KaniTooltip>
            )
        }
        return button
    }

    return (
        <div>
            <KaniBreadcrumb>
                <KaniBreadcrumbItem onPress={
                    () => router.push(
                        paths().bots().base()
                    )
                }>Bots</KaniBreadcrumbItem>
                <KaniBreadcrumbItem>{bot?.name}</KaniBreadcrumbItem>
            </KaniBreadcrumb>
            <Spacer y={6} />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {
                        queryBotV2Swr.isLoading ? (
                            <Skeleton className="w-24 h-8 rounded-md" />
                        ) : (
                            <div className="text-2xl font-bold leading-none">{bot?.name}</div>
                        )}
                    {
                        bot?.running && (
                            <WaveBars />
                        )
                    }
                </div>
                <div className="flex items-center gap-2">
                    {bot?.running ? (
                        <KaniButton
                            startContent={<StopIcon />}
                            color="primary"
                            onPress={
                                async () => {
                                    await runGraphQLWithToast(
                                        async () => {
                                            const response = await toggleBotV2SwrMutation.trigger({
                                                request: {
                                                    id: bot?.id ?? "",
                                                    running: false,
                                                },
                                            })
                                            if (!response.data?.toggleBotV2) {
                                                throw new Error("Failed to toggle bot v2")
                                            }
                                            // refetch bot
                                            await queryBotV2Swr.mutate()
                                            return response.data.toggleBotV2
                                        }, {
                                        showSuccessToast: true,
                                        showErrorToast: true,
                                    }
                                    )
                                }
                            }
                        >
                            Stop Bot
                        </KaniButton>
                    ) : (
                        <>
                            {renderRunBotButton()}
                        </>
                    )}
                </div>
            </div>
            <Spacer y={6} />
            <PrivySecurityAlert />
            <Spacer y={6} />
            <Tabs
                variant="underlined"
                color="primary"
                selectedKey={tab}
                onSelectionChange={(value) => {
                    const _value = value as BotTab
                    const path = paths().bots().bot(bot?.id ?? "", { tab: _value })
                    router.push(path)
                    dispatch(setBotTab(_value))
                }}
            >
                {tabs.map((tab) => (
                    <Tab key={tab.key} title={
                        <div className="flex items-center gap-2">
                            <tab.icon className="w-5 h-5 min-w-5 min-h-5 sm:block hidden" />
                            {tab.title}
                        </div>
                    } />
                ))}
            </Tabs>
            <KaniDivider />
            <Spacer y={6} />
            {renderTab()}
        </div >
    )
}
