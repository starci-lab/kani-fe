import { queryFeesV2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryFeesV2SwrCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const bot = useAppSelector((state) => state.bot.bot)
    const swr = useSWR(
        authenticated ? ["QUERY_FEES_V2_SWR", authenticated] : null,
        async () => {
            if (!bot || !bot.id) {
                throw new Error("Bot id is required")
            }
            if (!bot.activePosition) {
                throw new Error("Active position is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryFeesV2({
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

export const useQueryFeesV2Swr = () => {
    const { queryFeesV2Swr } = use(SwrContext)!
    return queryFeesV2Swr
}
