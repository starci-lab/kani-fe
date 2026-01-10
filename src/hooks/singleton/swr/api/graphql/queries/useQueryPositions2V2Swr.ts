import { queryPositions2V2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setPositions, setPositionsPage, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryPositions2V2SwrCore = () => {
    const dispatch = useAppDispatch()
    const { getAccessToken, authenticated } = usePrivy()
    const id = useAppSelector((state) => state.bot.id)
    const page = useAppSelector((state) => state.bot.positionsPage)
    const swr = useSWR(
        authenticated ? ["QUERY_POSITIONS2_V2_SWR", authenticated] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryPositions2V2({
                token: accessToken,
                request: {
                    botId: id,
                    filters: {
                        pageNumber: page || 1,
                        limit: 10,
                    },
                },
            })
            const positions = data.data?.positions2V2
            if (!positions) {
                throw new Error("Positions2 not found")
            }
            if (!positions.data) {
                throw new Error("Positions2 data not found")
            }
            dispatch(setPositions(positions.data.data))
            dispatch(setPositionsPage(positions.data.count))
            return data
        }
    )
    return swr
}

export const useQueryPositions2V2Swr = () => {
    const { queryPositions2V2Swr } = use(SwrContext)!
    return queryPositions2V2Swr
}
