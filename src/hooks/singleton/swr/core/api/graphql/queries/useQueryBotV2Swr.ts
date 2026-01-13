
import { queryBotV2 } from "@/modules/api"
import { useAppDispatch, setBot, useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryBotV2SwrCore = () => {
    const dispatch = useAppDispatch()   
    const botId = useAppSelector((state) => state.bot.id)
    const { getAccessToken, authenticated } = usePrivy()
    const swr = useSWR(
        authenticated && botId ? ["QUERY_BOT_V2_SWR", authenticated, botId] : null,
        async () => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            if (!botId) {
                throw new Error("Id is required")
            }
            const data = await queryBotV2({
                token: accessToken,
                request: {
                    id: botId,
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
