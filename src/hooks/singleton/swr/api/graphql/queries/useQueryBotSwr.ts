import { queryBot } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppDispatch, setBot, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryBotSwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const id = useAppSelector((state) => state.bot.id)
    const isDisabled = true
    const swr = useSWR(
        isDisabled ? null : (id && accessToken) ? ["QUERY_BOT_SWR", id] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryBot({
                token: accessToken,
                request: {
                    id,
                },
            })
            const bot = data.data?.bot
            if (!bot) {
                throw new Error("Bot not found")
            }
            if (!bot.data) {
                throw new Error("Bot data not found")
            }
            dispatch(setBot(bot.data))
            return data
        }
    )
    return swr
}

export const useQueryBotSwr = () => {
    const { queryBotSwr } = use(SwrContext)!
    return queryBotSwr
}
