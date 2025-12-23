import { ChartInterval, queryHistory, QueryHistoryRequest } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppDispatch, useAppSelector, setHistoryResponse } from "@/redux"
import useSWR from "swr"
import { dayjs } from "@/modules/utils"
import ms from "ms"

interface IntervalConfig {
    time: ms.StringValue
    interval: number
}
export const intervalConfigMap: Record<ChartInterval, IntervalConfig> = {
    [ChartInterval.FifteenMinutes]: {
        time: "1 day",          // 96 points
        interval: 8,      // show 12 ticks (every 2 hours)
    },
    [ChartInterval.ThirtyMinutes]: {
        time: "1 day",          // 48 points
        interval: 4,      // show 12 ticks (every 2 hours)
    },
    [ChartInterval.OneHour]: {
        time: "7 day",          // 7 * 24 = 168 points
        interval: 23,      // show every day
    },
    [ChartInterval.TwoHours]: {
        time: "1 day",          // 12 points
        interval: 1,      // show 12 ticks (every 2 hours)
    },
    [ChartInterval.FourHours]: {
        time: "2 days",          // 12 points
        interval: 1,      // show 12 ticks (every 2 hours)
    },
    [ChartInterval.Day]: {
        time: "14 days",         // 14 points
        interval: 1,      // show ~14 ticks (every 2 hours)
    },
}

export const useQueryHistorySwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const botId = useAppSelector((state) => state.bot.id)
    const chartInterval = useAppSelector((state) => state.bot.chartInterval)
    const chartUnit = useAppSelector((state) => state.bot.chartUnit)
    const swr = useSWR(
        (botId && accessToken) ? ["QUERY_HISTORY_SWR", botId] : null,
        async () => {
            if (!botId) {
                throw new Error("Id is required")
            }
            const now = dayjs().utc()
            const request: QueryHistoryRequest = {
                botId,
                filters: {
                    from: now.subtract(ms(intervalConfigMap[chartInterval ?? ChartInterval.OneHour].time), "millisecond").toDate().toISOString(),
                    interval: chartInterval,
                    to: now.toDate().toISOString(),
                    unit: chartUnit,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                },
            }
            const data = await queryHistory({
                token: accessToken,
                request,
            })
            const history = data.data?.history
            if (!history) {
                throw new Error("History not found")
            }
            if (!history.data) {
                throw new Error("History data not found")
            }
            dispatch(setHistoryResponse(history.data))
            return data
        }
    )
    return swr
}

export const useQueryHistorySwr = () => {
    const { queryHistorySwr } = use(SwrContext)!
    return queryHistorySwr
}
