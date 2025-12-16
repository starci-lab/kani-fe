import {
    KaniCard,
    KaniCardBody,
} from "@/components/atomic"
import { TooltipTitle } from "@/components/reuseable"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import React from "react"
import { PositionCard } from "./PositionCard"

export const Positions = () => {
    const positions = useAppSelector((state) => state.bot.positions)
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle
                    title="Positions"
                    tooltipString="The transactions of the bot."
                />
                <Spacer y={4} />
                <div className="flex flex-col gap-3">
                    {(positions || []).map((position) => (
                        <PositionCard key={position.id} position={position} />
                    ))}
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}