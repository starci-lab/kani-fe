import { queryPortfolioValueV2 } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryPortfolioValueV2SwrCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const botId = useAppSelector((state) => state.bot.id)
    const swr = useSWR(
        authenticated && botId ? ["QUERY_PORTFOLIO_VALUE_V2_SWR", authenticated, botId] : null,
        async () => {
            if (!botId) {
                throw new Error("Bot id is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryPortfolioValueV2({
                token: accessToken,
                request: {
                    botId,
                },
            })
            return data
        }
    )
    return swr
}