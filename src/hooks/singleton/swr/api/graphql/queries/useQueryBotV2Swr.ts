import { queryBotV2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppDispatch, setBot, useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryBotV2SwrCore = () => {
    const dispatch = useAppDispatch()   
    const id = useAppSelector((state) => state.bot.id)
    const { getAccessToken, authenticated } = usePrivy()
    const swr = useSWR(
        authenticated ? ["QUERY_BOT_V2_SWR", authenticated] : null,
        async () => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryBotV2({
                token: accessToken,
                request: {
                    id,
                },
            })
            const bot = data.data?.botV2
            if (!bot) {
                throw new Error("BotV2 not found")
            }
            if (!bot.data) {
                throw new Error("BotV2 data not found")
            }
            dispatch(setBot(bot.data))
            return data
        }
    )
    return swr
}

export const useQueryBotV2Swr = () => {
    const { queryBotV2Swr } = use(SwrContext)!
    return queryBotV2Swr
}
