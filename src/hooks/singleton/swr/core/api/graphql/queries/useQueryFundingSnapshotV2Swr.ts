import { queryFundingSnapshotV2 } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryFundingSnapshotV2SwrCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const botId = useAppSelector((state) => state.bot.id)
    const swr = useSWR(
        authenticated && botId ? ["QUERY_FUNDING_SNAPSHOT_V2_SWR", authenticated, botId] : null,
        async () => {
            if (!botId) {
                throw new Error("Bot id is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryFundingSnapshotV2({
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