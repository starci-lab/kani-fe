import { KaniTooltip } from "../../atomic"
import { DonutChart } from "../charts"
import { computePercentage } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import Decimal from "decimal.js"
import { PlantIcon } from "@phosphor-icons/react"
import React from "react"

export interface Apr24HDisplayData {
    total: string
    fees: string
    rewards: string
}
export interface Apr24HDisplayProps {
    apr24H: Apr24HDisplayData
    fractionDigits?: number
}

export const Apr24HDisplay = (
    {
        apr24H,
        fractionDigits = 2,
    }: Apr24HDisplayProps,
) => {
    const totalDecimal = new Decimal(apr24H.total)
    const feesDecimal = new Decimal(apr24H.fees)
    const rewardsDecimal = new Decimal(apr24H.rewards)
    const totalPercent = computePercentage({
        numerator: totalDecimal,
        denominator: new Decimal(1),
        fractionDigits,
    }).toString()

    return (
        <div className="flex items-center gap-1 text-success cursor-pointer">
            <PlantIcon className="w-4 h-4" />
            <KaniTooltip
                content={
                    <div>
                        <div className="flex items-center gap-1">
                            <div className="text-sm text-foreground-500">Total APR</div>
                            <div className="text-sm">
                                {computePercentage({ numerator: totalDecimal, denominator: new Decimal(1), fractionDigits }).toString()}%
                            </div>
                        </div>
                        <Spacer y={1} />
                        <DonutChart
                            showTooltip={false}
                            data={[
                                { name: "Fees", value: feesDecimal.toNumber() },
                                { name: "Rewards", value: rewardsDecimal.toNumber() },
                            ]}
                        />
                    </div>
                }
            >
                <div className="text-sm">{`${totalPercent}%`}</div>
            </KaniTooltip>
        </div>
    )
}
