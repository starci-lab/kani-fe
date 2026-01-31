import React, { useMemo } from "react"
import { KaniTab, KaniTabs } from "../../../../../atomic"
import { ChartUnit } from "@/modules/types"
import { setBotChartConfigChartUnit, useAppDispatch, useAppSelector } from "@/redux"
import { useUpdateBotChartConfigV2SwrMutation } from "@/hooks/singleton"

export interface ChartUnitTab {
    key: ChartUnit
    text: string
}

export const ChartUnitTabs = () => {
    const bot = useAppSelector(
        (state) => state.bot.bot
    )
    const tokens = useAppSelector(
        (state) => state.static.tokens
    )
    const targetToken = useMemo(() => tokens.find(
        (token) => token.id === bot?.targetToken
    ), [
        tokens, bot?.targetToken
    ])
    const unitTabs: Array<ChartUnitTab> = [
        {
            key: ChartUnit.Usd,
            text: "USD",
        },
        {
            key: ChartUnit.Target,
            text: targetToken?.symbol ?? "",
        },
    ]
    const updateBotChartConfigV2SwrMutation = useUpdateBotChartConfigV2SwrMutation()
    const dispatch = useAppDispatch()
    return ( 
        <div className="md:w-fit w-full">
            <KaniTabs 
                className="w-full"
                classNames={{
                    tabList: "w-full"
                }}
                size="sm" 
                color="primary" 
                onSelectionChange={
                    async (key) => {
                        if (!bot?.id) {
                            return
                        }
                        const chartUnit = key as ChartUnit
                        dispatch(setBotChartConfigChartUnit(chartUnit))
                        await updateBotChartConfigV2SwrMutation.trigger({
                            request: {
                                id: bot.id,
                                chartUnit,
                            },
                        })
                    }} selectedKey={bot?.chartConfig?.chartUnit ?? ChartUnit.Usd}>
                {
                    unitTabs.map((unitTab) => (
                        <KaniTab key={unitTab.key} title={unitTab.text} />
                    ))
                }
            </KaniTabs>
        </div>
    )
}