"use client"
import React from "react"
import { setBotTab, useAppDispatch, useAppSelector } from "@/redux"
import { Overview } from "./Overview"
import { ChartLineIcon, GearSixIcon, PlayIcon, SquaresFourIcon, StopIcon, WalletIcon } from "@phosphor-icons/react"
import { KaniBreadcrumb, KaniBreadcrumbItem, KaniButton, KaniDivider } from "../../atomic"
import { WaveBars } from "../../reuseable"
import { Spacer, Tabs, Tab, Skeleton } from "@heroui/react"
import { BotTab } from "@/redux"
import { Portfolio } from "./Portfolio"
import { Activity } from "./Activity"
import { useQueryBotV2Swr, useToggleBotV2SwrMutation } from "@/hooks/singleton"
import { runGraphQLWithToast } from "../../toasts"
import { PrivySecurityAlert } from "./PrivySecurityAlert"
import { Settings } from "./Settings"
import { useRouter } from "next/navigation"
import { paths } from "@/resources/path"

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
    const router = useRouter()
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
            <Spacer y={6}/>
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
                        <KaniButton
                            startContent={<PlayIcon />}
                            color="primary"
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
                aria-label="Bot Tabs"
                classNames={{
                    tabList: "pb-0",
                }}>
                {tabs.map((tab) => (
                    <Tab key={tab.key} title={
                        <div className="flex items-center gap-2">
                            <tab.icon className="w-5 h-5 min-w-5 min-h-5" />
                            {tab.title}
                        </div>
                    } />
                ))}
            </Tabs>
            <KaniDivider/>
            <Spacer y={6} />
            {renderTab()}
        </div>
    )
}
