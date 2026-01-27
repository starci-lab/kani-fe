import { queryBotsV2 } from "@/modules/api"
import { setBots, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryBotsV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const pageNumber = useAppSelector((state) => state.bot.pageNumber)
    const { getAccessToken, authenticated } = usePrivy()
    const swr = useSWR(
        authenticated ? ["QUERY_BOTS_V2_SWR", authenticated] : null,
        async () => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryBotsV2(
                {
                    token: accessToken,
                    request: {
                        filters: {
                            pageNumber,
                        },
                        associate: {
                            activePosition: {
                                liquidityPool: true,
                                position: true,
                            },
                        },
                    },
                }
            )
            const bots = data.data?.botsV2
            if (!bots) {
                throw new Error("Bots not found")
            }
            if (!bots.data) {
                throw new Error("Bots data not found")
            }
            dispatch(setBots(bots.data.data))
            return data
        }
    )
    return swr
}