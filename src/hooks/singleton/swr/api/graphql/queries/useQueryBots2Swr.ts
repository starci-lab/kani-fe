import { queryBots2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { setBots, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryBots2SwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const pageNumber = useAppSelector((state) => state.bot.pageNumber)
    const swr = useSWR(
        (accessToken) ? ["QUERY_BOTS2_SWR", pageNumber] : null,
        async () => {
            const data = await queryBots2({
                token: accessToken,
                request: {
                    filters: {
                        pageNumber: pageNumber || 1,
                        limit: 10,
                    },
                },
            })
            const bots = data.data?.bots2
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

export const useQueryBots2Swr = () => {
    const { queryBots2Swr } = useContext(SwrContext)!
    return queryBots2Swr
}
