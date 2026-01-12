"use client"
import React from "react"
import { setBotTab, useAppDispatch, useAppSelector } from "@/redux"
import { Investment } from "./Investment"
import { PlayIcon, StopIcon } from "@phosphor-icons/react"
import { KaniButton, KaniDivider, WaveBars } from "@/components"
import { Container } from "@/components"
import { Spacer, Tabs, Tab, Skeleton } from "@heroui/react"
import { BotTab } from "@/redux"
import { Wallet } from "./Wallet"
import { Activity } from "./Activity"
import { useQueryBotV2Swr, useToggleBotV2SwrMutation } from "@/hooks/singleton"
import { runGraphQLWithToast } from "@/components/toasts"
import { BotAlert } from "./BotAlert"

export const Bot = () => {
    const tabs = [
        {
            key: BotTab.Investment,
            title: "Investment",
        },
        {
            key: BotTab.Wallet,
            title: "Wallet",
        },
        {
            key: BotTab.Activity,
            title: "Activity",
        }   
    ]
    const bot = useAppSelector((state) => state.bot.bot)
    const tab = useAppSelector((state) => state.bot.tab)
    const dispatch = useAppDispatch()
    const toggleBotV2SwrMutation = useToggleBotV2SwrMutation()
    const queryBotV2Swr = useQueryBotV2Swr()
    const renderTab = () => {
        switch (tab) {
        case BotTab.Investment:
            return <Investment />
        case BotTab.Wallet:
            return <Wallet />
        case BotTab.Activity:
            return <Activity />
        }
    }
    return (
        <Container>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {
                        queryBotV2Swr.isLoading ? (
                            <Skeleton className="w-24 h-8 rounded-md" />
                        ) : (
                            <div className="text-2xl font-bold">{bot?.name}</div>
                        )}
                    {
                        bot?.running && (
                            <WaveBars />
                        )
                    }
                </div>
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
            <Spacer y={6} />
            <BotAlert />
            <Spacer y={6} />
            <Tabs 
                variant="underlined" 
                selectedKey={tab}
                onSelectionChange={(value) => {
                    dispatch(setBotTab(value as BotTab))
                }}
                aria-label="Bot Tabs"
                classNames={{
                    tabList: "pb-0",
                }}>
                {tabs.map((tab) => (
                    <Tab key={tab.key} title={tab.title} />
                ))}
            </Tabs>
            <KaniDivider/>
            <Spacer y={6} />
            {renderTab()}
        </Container>
    )
}
