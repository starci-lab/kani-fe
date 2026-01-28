import { queryHistoryV2, QueryHistoryV2Request, ChartInterval } from "@/modules/api"
import { useAppDispatch, useAppSelector, setHistoryResponse } from "@/redux"
import useSWR from "swr"
import { dayjs } from "@/modules/dayjs"
import ms from "ms"
import { usePrivy } from "@privy-io/react-auth"

export interface IntervalConfig {
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

export const useQueryHistoryV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const { getAccessToken, authenticated } = usePrivy()
    const botId = useAppSelector((state) => state.bot.id)
    const chartInterval = useAppSelector((state) => state.bot.chartInterval)
    const chartUnit = useAppSelector((state) => state.bot.chartUnit)
    const swr = useSWR(
        authenticated && botId ? ["QUERY_HISTORY_V2_SWR", authenticated, botId] : null,
        async () => {
            if (!botId) {
                throw new Error("Id is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const now = dayjs().utc()
            const request: QueryHistoryV2Request = {
                botId,
                filters: {
                    from: now.subtract(ms(intervalConfigMap[chartInterval ?? ChartInterval.OneHour].time), "millisecond").toDate().toISOString(),
                    interval: chartInterval,
                    to: now.toDate().toISOString(),
                    unit: chartUnit,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                },
            }
            const data = await queryHistoryV2({
                token: accessToken,
                request,
            })
            const historyV2 = data.data?.historyV2
            if (!historyV2) {
                throw new Error("HistoryV2 not found")
            }
            if (!historyV2.data) {
                throw new Error("HistoryV2 data not found")
            }
            dispatch(setHistoryResponse(historyV2.data))
            return data
        }
    )
    return swr
}