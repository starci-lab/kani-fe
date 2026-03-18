import React from "react"
import { BotViolateIndicatorSchema, BotViolateIndicatorType, IndicatorName, Operation } from "@/modules/types"
import { TooltipTitle } from "@/components/reuseable"
import { KaniCard, KaniCardBody, KaniChip } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import { useAppSelector } from "@/redux/hooks"
import { LineChart } from "@/components/reuseable"
import { IndicatorStatus } from "@/redux"
import {
    ClockIcon,
    EqualsIcon,
    GreaterThanIcon,
    LessThanOrEqualIcon,
    LessThanIcon,
    GreaterThanOrEqualIcon,
    NotEqualsIcon
} from "@phosphor-icons/react"
import { computePercentage, round } from "@/modules/utils"
import Decimal from "decimal.js"

/**
 * Indicator card props.
 */
export interface IndicatorCardProps {
    indicator: BotViolateIndicatorSchema
}

/**
 * Indicator card component.
 */
export const IndicatorCard = (
    { indicator }: IndicatorCardProps
) => {
    const indicators = useAppSelector((state) => state.socket.indicators)
    const indicatorResult = indicators.find((indicatorResult) => indicatorResult.id === indicator.id)
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
    const renderStatusChip = (status: IndicatorStatus) => {
        switch (status) {
        case IndicatorStatus.Trigger:
            return (
                <KaniChip size="sm" variant="flat" color="danger">
                        Trigger
                </KaniChip>
            )
        case IndicatorStatus.Reentry:
            return (
                <KaniChip size="sm" variant="flat" color="success">
                        Reentry
                </KaniChip>
            )
        case IndicatorStatus.NoAction:
            return (
                <KaniChip size="sm" variant="flat" color="secondary">
                        No Action
                </KaniChip>
            )
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
        const renderValues = indicator.reentryThresholds?.indicators?.map((_indicator) => {
            const triggerIndicator = indicator.triggerThresholds?.indicators?.find((_triggerIndicator) => _triggerIndicator.name === _indicator.name)
            const disp = indicatorDisplay.indicator[_indicator.name as IndicatorName]
            return {
                name: _indicator.name,
                value: (indicatorResult?.metadata as Record<IndicatorName, number>)?.[_indicator.name],
                reentry: <div className="text-xs text-success flex items-center">
                    {indicatorDisplay.opIcon[_indicator.op]}
                    {disp?.renderValue(_indicator.value) ?? "N/A"}
                </div>,
                trigger: triggerIndicator ? (() => {
                    const triggerDisp = indicatorDisplay.indicator[triggerIndicator.name as IndicatorName]
                    return <div className="text-xs text-danger flex items-center">
                        {indicatorDisplay.opIcon[triggerIndicator.op]}
                        {triggerDisp?.renderValue(triggerIndicator.value) ?? "N/A"}
                    </div>
                })() : "N/A",
            }
        }) ?? []
        return (
            <div className="flex flex-col gap-2">
                {renderValues.map((value) => (
                    <div key={value.name} className="grid grid-cols-[60px_40px_1fr_1fr] items-center gap-2">
                        <div className="text-xs text-start"><TooltipTitle
                            title={indicatorDisplay.indicator[value.name as IndicatorName]?.label ?? "N/A"}
                            classNames={{ title: "text-xs text-foreground-500" }}
                            tooltipString={indicatorDisplay.indicator[value.name as IndicatorName]?.tooltip ?? "N/A"}
                        /></div>
                        <div className="text-xs text-end">{indicatorDisplay.indicator[value.name as IndicatorName]?.renderValue(value.value) ?? "N/A"}</div>
                        <div className="text-xs text-success flex justify-start">Reentry {value.reentry}</div>
                        <div className="text-xs text-danger flex justify-start">Trigger {value.trigger}</div>
                    </div>
                ))}
            </div>
        )
    }
    if (!indicatorResult) {
        return null
    }
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        {renderTypeChip(indicator.type)}
                        <KaniChip size="sm" variant="flat" color="default" startContent={<ClockIcon className="w-4 h-4" />}>
                            {indicator.timeWindowMs / 1000}s
                        </KaniChip>
                    </div>
                    {renderStatusChip(indicatorResult?.status)}
                </div>
                <Spacer y={3} />
                <LineChart
                    height={150}
                    data={
                        indicatorResult?.records.map((record) => ({
                            label: record.time,
                            value: record.value,
                        })) ?? []}
                    addRegressionLine={
                        indicator.type === BotViolateIndicatorType.PriceRegression
                    }
                />
                <Spacer y={3} />
                <div className="flex-1 max-w-full overflow-hidden">
                    <TooltipTitle
                        title={indicator.name}
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