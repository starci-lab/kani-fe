import React, { useMemo } from "react"
import { useAppSelector } from "@/redux/hooks"
import { AreaChart } from "@/components/reuseable"
import Decimal from "decimal.js"

export const HistoryChart = () => {
    const historyResponse = useAppSelector(
        (state) => state.bot.historyResponse
    )
    const data = useMemo(() => {
        return historyResponse?.series
            ?.map((item) => ({
                name: item.timestamp,
                value: new Decimal(item.value).toDecimalPlaces(5).toNumber(),
            })) || []
    }, [historyResponse])
    return (
        <div>
            <AreaChart data={data} />
        </div>
    )
}