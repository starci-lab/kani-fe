import { queryHistoryV2, QueryHistoryV2Request } from "@/modules/api"
import { useAppDispatch, useAppSelector, setHistoryResponse } from "@/redux"
import useSWR from "swr"
import { dayjs } from "@/modules/dayjs"
import ms from "ms"
import { usePrivy } from "@privy-io/react-auth"
import { ChartInterval, ChartUnit } from "@/modules/types"

export interface IntervalConfig {
    time: ms.StringValue
}

export const intervalConfigMap: Record<ChartInterval, IntervalConfig> = {
    [ChartInterval.FifteenMinutes]: {
        time: "1 day",          // 96 points
    },
    [ChartInterval.ThirtyMinutes]: {
        time: "3 day",          // 48 points
    },
    [ChartInterval.OneHour]: {
        time: "7 days",          // 7 * 24 = 168 points
    },
    [ChartInterval.TwoHours]: {
        time: "14 days",          // 12 points
    },
    [ChartInterval.FourHours]: {
        time: "1M",          // 30 points
    },
    [ChartInterval.Day]: {
        time: "3M",         // 90 points
    },
}

export const useQueryHistoryV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const { getAccessToken, authenticated } = usePrivy()
    const botId = useAppSelector((state) => state.bot.id)
    const chartInterval = useAppSelector((state) => state.bot.bot?.chartConfig?.chartInterval ?? ChartInterval.OneHour)
    const chartUnit = useAppSelector((state) => state.bot.bot?.chartConfig?.chartUnit ?? ChartUnit.Target)
    const swr = useSWR(
        (authenticated && botId) ? [
            "QUERY_HISTORY_V2_SWR", 
            authenticated, 
            botId, 
            chartInterval, 
            chartUnit
        ] : null,
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