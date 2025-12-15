import React from "react"
import { setBotTab, useAppDispatch, useAppSelector } from "@/redux"
import { Investment } from "./Investment"
import { PlayIcon, StopIcon } from "@phosphor-icons/react"
import { KaniAlert, KaniButton, KaniDivider, WaveBars } from "@/components"
import { Container } from "@/components"
import { Spacer, Tabs, Tab } from "@heroui/react"
import { BotTab } from "@/redux"
import { Wallet } from "./Wallet"

export const Bot = () => {
    const tabs = [
        {
            key: BotTab.Investment,
            title: "Investment",
        },
        {
            key: BotTab.Wallet,
            title: "Wallet",
        }
    ]
    const bot = useAppSelector((state) => state.bot.bot)
    const tab = useAppSelector((state) => state.bot.tab)
    const dispatch = useAppDispatch()
    const renderTab = () => {
        switch (tab) {
        case BotTab.Investment:
            return <Investment />
        case BotTab.Wallet:
            return <Wallet />
        }
    }
    return (
        <Container>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{bot?.name}</div>
                    <WaveBars />
                </div>
                {bot?.running ? (
                    <KaniButton
                        startContent={<StopIcon />}
                        color="primary"
                        onPress={() => {}}
                    >
            Stop Bot
                    </KaniButton>
                ) : (
                    <KaniButton
                        startContent={<PlayIcon />}
                        color="primary"
                        onPress={() => {}}
                    >
            Run Bot
                    </KaniButton>
                )}
            </div>
            <Spacer y={4} />

            <KaniAlert
                variant="flat"
                color="warning"
                title="Bot Key Backup Required"
                description={
                    <div>
                        <div className="text-xs">Kani is designed to never see your bot&apos;s private key.
                        All signing is performed exclusively inside a Trusted Execution Environment (TEE).
                        We only allow the key to be exported once so you can store it securely.
                        </div>
                    </div>
                }
            />
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
