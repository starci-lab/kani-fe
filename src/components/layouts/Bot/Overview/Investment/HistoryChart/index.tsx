import React, { useMemo } from "react"
import { useAppSelector } from "@/redux/hooks"
import { AreaChart } from "@/components/reuseable"
import Decimal from "decimal.js"
import { useQueryHistoryV2Swr } from "@/hooks/singleton"
import { KaniSpinner } from "../../../../../atomic"

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
    const queryHistoryV2Swr = useQueryHistoryV2Swr()
    return (
        <div>
            {
                (queryHistoryV2Swr.isLoading) ?
                    <div className="h-[300px] w-full grid place-items-center">
                        <KaniSpinner />
                    </div>
                    :
                    <AreaChart data={data} />
            }
        </div>
    )
}