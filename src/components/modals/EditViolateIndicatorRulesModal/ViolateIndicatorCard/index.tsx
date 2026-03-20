import React from "react"
import { BotViolateIndicatorSchema, BotViolateIndicatorType, IndicatorName, Operation } from "@/modules/types"
import { TooltipTitle } from "@/components/reuseable"
import { KaniCard, KaniCardBody, KaniChip, KaniLink } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import {
    ClockIcon,
    EqualsIcon,
    GreaterThanIcon,
    LessThanOrEqualIcon,
    LessThanIcon,
    GreaterThanOrEqualIcon,
    NotEqualsIcon,
    FadersIcon
} from "@phosphor-icons/react"
import { computePercentage, round } from "@/modules/utils"
import Decimal from "decimal.js"
import { DeepPartial } from "@apollo/client/utilities"

/**
 * Indicator card props.
 */
export interface ViolateIndicatorCardProps {
    violateIndicator: DeepPartial<BotViolateIndicatorSchema>
}

/**
 * Indicator card component.
 */
export const ViolateIndicatorCard = (
    { violateIndicator }: ViolateIndicatorCardProps
) => {
    const renderTypeChip = (type: BotViolateIndicatorType) => {
        switch (type) {
        case BotViolateIndicatorType.PricePct:
            return (
                <KaniChip size="sm" variant="flat" color="default">
                        Price Percentage
                </KaniChip>
            )
        case BotViolateIndicatorType.PriceRegression:
            return (
                <KaniChip size="sm" variant="flat" color="default">
                        Price Regression
                </KaniChip>
            )
        case BotViolateIndicatorType.VolumeSpike:
            return (
                <KaniChip size="sm" variant="flat" color="default">
                        Volume Spike
                </KaniChip>
            )
        default:
            return null
        }
    }
    const renderThresholds = () => {
        const indicatorDisplay = {
            opIcon: {
                [Operation.Gte]: <GreaterThanOrEqualIcon className="w-3 h-3" />,
                [Operation.Lt]: <LessThanIcon className="w-3 h-3" />,
                [Operation.Lte]: <LessThanOrEqualIcon className="w-3 h-3" />,
                [Operation.Gt]: <GreaterThanIcon className="w-3 h-3" />,
                [Operation.Eq]: <EqualsIcon className="w-3 h-3" />,
                [Operation.Ne]: <NotEqualsIcon className="w-3 h-3" />,
            } as const satisfies Record<Operation, React.ReactNode>,
            indicator: {
                [IndicatorName.Pct]: {
                    label: "Percentage",
                    tooltip: "Percentage of the value compared to the previous value",
                    renderValue: (value: number) =>
                        computePercentage({ numerator: new Decimal(value), denominator: new Decimal(1), fractionDigits: 2 }).toString() + "%",
                },
                [IndicatorName.R2]: {
                    label: "R-Squared",
                    tooltip: "R-Squared of the linear regression of the value",
                    renderValue: (value: number) => round(new Decimal(value), 2).toString(),
                },
            } as const satisfies Record<IndicatorName, { label: string; tooltip: string; renderValue: (value: number) => string }>,
        }
        const renderValues = (violateIndicator.reentryThresholds?.indicators ?? []).map((entry) => {
            const name = entry?.name
            const reentryOp = entry?.op
            const reentryValue = entry?.value
            if (!name || reentryOp === undefined || reentryValue === undefined) {
                return null
            }
            const triggerIndicator = violateIndicator.triggerThresholds?.indicators?.find(
                (indicator) => indicator?.name === name
            )
            const disp = indicatorDisplay.indicator[name as IndicatorName]
            return {
                name,
                reentry: <div className="text-xs text-success flex items-center">
                    {indicatorDisplay.opIcon[reentryOp]}
                    {disp?.renderValue(reentryValue) ?? "N/A"}
                </div>,
                trigger: (() => {
                    if (!triggerIndicator || triggerIndicator.name === undefined || triggerIndicator.op === undefined || triggerIndicator.value === undefined) {
                        return "N/A"
                    }
                    const triggerDisp = indicatorDisplay.indicator[triggerIndicator.name as IndicatorName]
                    return <div className="text-xs text-danger flex items-center">
                        {indicatorDisplay.opIcon[triggerIndicator.op]}
                        {triggerDisp?.renderValue(triggerIndicator.value) ?? "N/A"}
                    </div>
                })(),
            }
        }).filter((row): row is NonNullable<typeof row> => row !== null)
        return (
            <div className="flex flex-col gap-2">
                {renderValues.map((value) => (
                    <div key={value.name} className="grid grid-cols-[100px_1fr_1fr] items-center gap-2">
                        <div className="text-xs text-start"><TooltipTitle
                            title={indicatorDisplay.indicator[value.name as IndicatorName]?.label ?? "N/A"}
                            classNames={{ title: "text-xs text-foreground-500" }}
                            tooltipString={indicatorDisplay.indicator[value.name as IndicatorName]?.tooltip ?? "N/A"}
                        /></div>
                        <div className="text-xs text-success flex justify-start">Reentry {value.reentry}</div>
                        <div className="text-xs text-danger flex justify-start">Trigger {value.trigger}</div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <KaniCard shadow="none" disableRipple className="bg-default/40">
            <KaniCardBody>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        {violateIndicator.type ? renderTypeChip(violateIndicator.type) : null}
                        <KaniChip size="sm" variant="flat" color="default" startContent={<ClockIcon className="w-4 h-4" />}>
                            {(violateIndicator.timeWindowMs ?? 0) / 1000}s
                        </KaniChip>
                    </div>
                    <KaniLink>
                        <FadersIcon className="w-5 h-5" />
                    </KaniLink>
                </div>
                <Spacer y={3} />
                <div className="flex-1 max-w-full overflow-hidden">
                    <TooltipTitle
                        title={violateIndicator.name ?? ""}
                        classNames={
                            {
                                title: "text-sm truncate",
                            }
                        }
                    />
                </div>
                <Spacer y={3} />
                {renderThresholds()}
            </KaniCardBody>
        </KaniCard>
    )
}