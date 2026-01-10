import { queryBots2V2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setBots, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryBots2V2SwrCore = () => {
    const dispatch = useAppDispatch()
    const pageNumber = useAppSelector((state) => state.bot.pageNumber)
    const isDisabled = false
    const { getAccessToken, authenticated } = usePrivy()
    const swr = useSWR(
        isDisabled ? null : (authenticated ? ["QUERY_BOTS2_V2_SWR", authenticated] : null),
        async () => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryBots2V2({
                token: accessToken,
                request: {
                    filters: {
                        pageNumber: pageNumber || 1,
                        limit: 10,
                    },
                },
            })
            const bots = data.data?.bots2V2
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

export const useQueryBots2V2Swr = () => {
    const { queryBots2V2Swr } = use(SwrContext)!
    return queryBots2V2Swr
}
