import { queryReserves } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryReservesSwrCore = () => {
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const bot = useAppSelector((state) => state.bot.bot)
    const swr = useSWR(
        bot && bot.activePosition && accessToken ? ["QUERY_RESERVES_SWR", bot.activePosition.id] : null,
        async () => {
            if (!bot || !bot.activePosition) {
                throw new Error("Active position is required")
            }
            const data = await queryReserves({
                token: accessToken,
                request: {
                    botId: bot?.id ?? "",
                    activePositionId: bot.activePosition.id,
                },
            })
            return data
        }
    )
    return swr
}

export const useQueryReservesSwr = () => {
    const { queryReservesSwr } = use(SwrContext)!
    return queryReservesSwr
}
