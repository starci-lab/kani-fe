import { queryHistoryV2, QueryHistoryV2Request, ChartInterval } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppDispatch, useAppSelector, setHistoryResponse } from "@/redux"
import useSWR from "swr"
import { dayjs } from "@/modules/utils"
import ms from "ms"
import { intervalConfigMap } from "./useQueryHistorySwr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryHistoryV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const { getAccessToken, authenticated } = usePrivy()
    const botId = useAppSelector((state) => state.bot.id)
    const chartInterval = useAppSelector((state) => state.bot.chartInterval)
    const chartUnit = useAppSelector((state) => state.bot.chartUnit)
    const swr = useSWR(
        authenticated ? ["QUERY_HISTORY_V2_SWR", authenticated] : null,
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

export const useQueryHistoryV2Swr = () => {
    const { queryHistoryV2Swr } = use(SwrContext)!
    return queryHistoryV2Swr
}
