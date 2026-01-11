import { queryFundingSnapshotV2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryFundingSnapshotV2SwrCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const bot = useAppSelector((state) => state.bot.bot)
    const swr = useSWR(
        authenticated ? ["QUERY_FUNDING_SNAPSHOT_V2_SWR", authenticated] : null,
        async () => {
            if (!bot || !bot.id) {
                throw new Error("Bot id is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryFundingSnapshotV2({
                token: accessToken,
                request: {
                    botId: bot.id,
                },
            })
            return data
        }
    )
    return swr
}

export const useQueryFundingSnapshotV2Swr = () => {
    const { queryFundingSnapshotV2Swr } = use(SwrContext)!
    return queryFundingSnapshotV2Swr
}
