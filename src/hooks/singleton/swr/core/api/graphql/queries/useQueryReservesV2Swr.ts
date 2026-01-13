
import { queryReservesV2 } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryReservesV2SwrCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const bot = useAppSelector((state) => state.bot.bot)
    const swr = useSWR(
        authenticated && bot && bot.id && bot.activePosition && bot.activePosition.id ? ["QUERY_RESERVES_V2_SWR", authenticated, bot.id, bot.activePosition.id] : null,
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
            const data = await queryReservesV2({
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