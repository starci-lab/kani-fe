import React from "react"
import { KaniCard, KaniCardBody, KaniChip } from "@/components/atomic"
import { cn, Spacer } from "@heroui/react"
import { RangeTier } from "@/modules/types"
import { StrategyVisual } from "./StrategyVisual"
import { TooltipTitle } from "../TooltipTitle"

export interface StrategyCardProps {
    rangeTier: RangeTier
    onPress: () => void
    isSelected: boolean
}
export const StrategyCard = ({ rangeTier, onPress, isSelected }: StrategyCardProps) => {
    const map = {
        [RangeTier.Narrow]: {
            title: "Narrow",
            description: "High capital efficiency with the highest fee potential, but the position can go out of range quickly. Best for volatile tokens, meme coins, or pools with high incentives."
        },
        [RangeTier.Mid]: {
            title: "Mid",
            description: "Balanced strategy between fee generation and stability. Suitable for most trading pairs with moderate volatility.",
        },
        [RangeTier.Wide]: {
            title: "Wide",
            description: "Lower fee efficiency but significantly reduces the chance of going out of range. Ideal for long-term liquidity and volatile markets.",
        },
    }
    return (
        <KaniCard 
            shadow="none" 
            disableRipple
            className={
                cn( 
                    "cursor-pointer",
                    "bg-default/40",
                    {
                        "ring-2 ring-primary": isSelected
                    }
                )
            } isPressable={!isSelected} onPress={onPress}>
            <KaniCardBody>
                <div className="grid place-items-center mt-3">
                    <StrategyVisual rangeTier={rangeTier} />
                </div>
                <Spacer y={3} />
                <div className="flex items-center gap-2">
                    <TooltipTitle title={map[rangeTier].title} classNames={{ title: "text-sm" }} />
                    {
                        isSelected && (
                            <KaniChip 
                                size="sm"
                                variant="flat" 
                                color="primary" 
                                classNames={{
                                    base: "px-2 py-0 h-5",
                                    content: "p-0"
                                }}>
                                Selected
                            </KaniChip>
                        )
                    }
                </div>
                <Spacer y={1.5} />
                <div className="text-xs text-foreground-500">
                    {map[rangeTier].description}
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}