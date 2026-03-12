import { KaniCard, KaniCardBody, KaniChip } from "@/components/atomic"
import { BotViolateIndicatorSchema, IndicatorName } from "@/modules/types"
import React from "react"
import { DeepPartial } from "@apollo/client/utilities"
import { Spacer } from "@heroui/react"
import { ViolateIndicatorChip } from "./ViolateIndicatorChip"
import { TooltipTitle } from "../TooltipTitle"
import { computePercentage } from "@/modules/utils"
import Decimal from "decimal.js"

export interface ViolateIndicatorProps {
    violateIndicator: DeepPartial<BotViolateIndicatorSchema>
}
export const ViolateIndicator = ({ violateIndicator }: ViolateIndicatorProps) => {
    const map = {
        [IndicatorName.Pct]: {
            name: "PCT",
            renderValue: (value: number) => `${
                computePercentage(
                    { 
                        numerator: new Decimal(value), 
                        denominator: new Decimal(1) 
                    }
                ).toString()}%`,
        },
        [IndicatorName.R2]: {
            name: "R2",
            renderValue: (value: number) => `${value}`,
        },
    } as const
    if (!violateIndicator.type) {
        return null
    }
    return (
        <KaniCard shadow="none" disableRipple className="bg-default/40" isPressable={true}>
            <KaniCardBody>
                <ViolateIndicatorChip type={violateIndicator.type} />
                <Spacer y={1.5} />
                <div className="text-sm">{violateIndicator.name}</div>
                <Spacer y={4} />
                <div>
                    <TooltipTitle 
                        title="Trigger Thresholds" 
                        classNames={{ title: "text-xs text-foreground-500", questionMarkIconClassName: "w-4 h-4" }} 
                    />
                    <Spacer y={1.5} />
                    <div className="text-sm flex flex-wrap gap-2">
                        {
                            violateIndicator.triggerThresholds?.indicators?.map(
                                (indicator) => (
                                    <KaniChip size="sm" key={indicator?.name} 
                                        variant="flat"
                                        endContent={<div className="text-xs mx-1">{
                                            map[indicator?.name ?? IndicatorName.Pct].renderValue(indicator?.value ?? 0)
                                        }</div>
                                        }
                                    >
                                        {map[indicator?.name ?? IndicatorName.Pct].name}
                                    </KaniChip>
                                ))
                        }
                    </div>
                </div>
                <Spacer y={3} />
                <div>
                    <TooltipTitle 
                        title="Reentry Thresholds" 
                        classNames={{ title: "text-xs text-foreground-500", questionMarkIconClassName: "w-4 h-4" }} 
                    />
                </div>
                <Spacer y={1.5} />
                <div className="text-sm flex flex-wrap gap-2">
                    {
                        violateIndicator.triggerThresholds?.indicators?.map(
                            (indicator) => (
                                <KaniChip size="sm" key={indicator?.name} 
                                    variant="flat"
                                    endContent={<div className="text-xs mx-1">{
                                        map[indicator?.name ?? IndicatorName.Pct].renderValue(indicator?.value ?? 0)
                                    }</div>}
                                >
                                    {map[indicator?.name ?? IndicatorName.Pct].name}
                                </KaniChip>
                            ))
                    }
                </div>
            </KaniCardBody>
        </KaniCard>
    )}