import { queryFees } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryFeesSwrCore = () => {
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const bot = useAppSelector((state) => state.bot.bot)
    const isDisabled = true
    const swr = useSWR(
        isDisabled ? null : (bot && bot.activePosition && accessToken ? ["QUERY_FEES_SWR", bot.activePosition.id] : null),
        async () => {
            if (!bot || !bot.activePosition) {
                throw new Error("Active position is required")
            }
            const data = await queryFees({
                token: accessToken,
                request: {
                    botId: bot.id,
                    activePositionId: bot.activePosition.id,
                },
            })
            return data
        }
    )
    return swr
}

export const useQueryFeesSwr = () => {
    const { queryFeesSwr } = use(SwrContext)!
    return queryFeesSwr
}
