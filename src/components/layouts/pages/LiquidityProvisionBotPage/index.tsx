import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux"
import { Investment } from "./Investment"
import { PoolInfoCard } from "./PoolInfoCard"
import { LiquidityPools } from "./LiquidityPools"
import { PositionRecords } from "./PositionRecords"
import { ConfigCard } from "./ConfigCard"
import { PlayIcon, StopIcon } from "@phosphor-icons/react"
import { KaniButton } from "@/components"
import { Container } from "@/components"

export interface LiquidityProvisionBotPageProps {
    id: string
}

export const LiquidityProvisionBotPage = 
    ({ liquidityProvisionBot }: LiquidityProvisionBotPageProps) => 
    {
        return (
            <Container>
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        {liquidityProvisionBot?.name}
                    </div>
                    <KaniButton 
                        startContent={<StopIcon />} 
                        color="primary" 
                        onPress={() => {
                        }}>
                        Stop Bot
                    </KaniButton>
                    <KaniButton 
                        startContent={<PlayIcon />} 
                        color="primary" 
                        onPress={() => {
                        }}>
                    Run Bot
                    </KaniButton>
                </div>
                <Spacer y={6} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-6 col-span-2">
                        <Investment/>
                        <LiquidityPools/>
                    </div>
                    <div className="flex flex-col gap-6 col-span-1">
                        <ConfigCard/>
                        <PoolInfoCard />
                        <PositionRecords/>
                    </div>
                </div>
            </Container>
        )
    }