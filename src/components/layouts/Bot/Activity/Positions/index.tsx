import { TooltipTitle } from "@/components/reuseable"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import React from "react"
import { PositionCard } from "./PositionCard"
import { EmptyContent } from "../../../../reuseable"
import { useQueryPositionsV2Swr } from "@/hooks/singleton"
import { LoadingContent } from "./LoadingContent"

export const Positions = () => {
    const queryPositionsV2Swr = useQueryPositionsV2Swr()
    const positions = useAppSelector((state) => state.bot.positions)

    const renderContent = () => {
        if (queryPositionsV2Swr.isLoading) {
            return <LoadingContent />
        }
        const _positions = positions || []
        if (_positions.length > 0) {
            return (
                <div className="flex flex-col gap-3">
                    {
                        _positions.map((position) => (
                            <PositionCard key={position.id} position={position} />
                        ))
                    }
                </div>
            )
        }
        return <EmptyContent description="We couldn&apos;t find any positions." />
    }
    return (
        <div>
            <TooltipTitle
                title="Positions"
                tooltipString="The transactions of the bot."
            />
            <Spacer y={3} />
            <div className="min-h-[250px] grid place-items-center">
                {renderContent()}
            </div>
        </div>
    )
}