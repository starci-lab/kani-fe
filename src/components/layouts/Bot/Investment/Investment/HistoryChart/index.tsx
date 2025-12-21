import React, { useMemo } from "react"
import { useAppSelector } from "@/redux/hooks"
import { AreaChart } from "@/components/reuseable"

export const HistoryChart = () => {
    const historyResponse = useAppSelector(
        (state) => state.bot.historyResponse
    )
    const data = useMemo(() => {
        return historyResponse?.series
            ?.map((item) => ({
                name: item.timestamp,
                value: item.value.targetValue,
            })) || []
    }, [historyResponse])
    return (
        <div>
            <AreaChart data={data} />
        </div>
    )
}