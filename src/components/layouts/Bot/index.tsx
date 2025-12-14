import React from "react"
import { useAppSelector } from "@/redux"
import { Investment } from "./Investment"
import { PoolInfoCard } from "./PoolInfoCard"
import { LiquidityPools } from "./LiquidityPools"
import { PositionRecords } from "./PositionRecords"
import { ConfigCard } from "./ConfigCard"
import { PlayIcon, StopIcon } from "@phosphor-icons/react"
import { KaniAlert, KaniButton, WaveBars } from "@/components"
import { Container } from "@/components"
import { Spacer } from "@heroui/react"

export const Bot = () => {
    const bot = useAppSelector((state) => state.bot.bot)
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
                title="Bot Key Setup Required"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-6 col-span-2">
                    <Investment />
                    <LiquidityPools />
                </div>
                <div className="flex flex-col gap-6 col-span-1">
                    <ConfigCard />
                    <PoolInfoCard />
                    <PositionRecords />
                </div>
            </div>
        </Container>
    )
}
