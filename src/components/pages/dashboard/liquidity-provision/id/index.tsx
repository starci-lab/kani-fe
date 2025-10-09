import React, { useEffect } from "react"
import { useAppDispatch, setDashboardLiquidityProvisionId, useAppSelector } from "@/redux"
import { Container } from "../../../../reuseable"
import { Spacer } from "@heroui/react"
import { Investment } from "./Investment"
import { PoolInfoCard } from "./PoolInfoCard"
import { LiquidityPools } from "./LiquidityPools"
import { PositionRecords } from "./PositionRecords"
import { Wallet } from "./Wallet"

export interface DashboardLiquidityProvisionIdPageProps {
    id: string
}

export const DashboardLiquidityProvisionIdPage = 
    ({ id }: DashboardLiquidityProvisionIdPageProps) => 
    {
        // get the id from the url
        const dispatch = useAppDispatch()
        const liquidityProvisionBot = useAppSelector(
            (state) => state.session.liquidityProvisionBot
        )
        // use effect to set the id in the redux state
        useEffect(() => {
            dispatch(setDashboardLiquidityProvisionId(id))
        }, [id])   
        return (
            <Container>
                <div className="text-2xl font-bold">
                    {liquidityProvisionBot?.name}
                </div>
                <Spacer y={6} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-6 col-span-2">
                        <Investment/>
                        <LiquidityPools/>
                    </div>
                    <div className="flex flex-col gap-6 col-span-1">
                        <Wallet/>
                        <PoolInfoCard />
                        <PositionRecords/>
                    </div>
                </div>
            </Container>
        )
    }