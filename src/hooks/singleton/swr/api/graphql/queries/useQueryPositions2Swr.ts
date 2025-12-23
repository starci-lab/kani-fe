import { queryPositions2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { setPositions, setPositionsPage, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryPositions2SwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const id = useAppSelector((state) => state.bot.id)
    const page = useAppSelector((state) => state.bot.positionsPage)
    const swr = useSWR(
        (id && accessToken) ? ["QUERY_POSITIONS2_SWR", id, page] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryPositions2({
                token: accessToken,
                request: {
                    botId: id,
                    filters: {
                        pageNumber: page || 1,
                        limit: 10,
                    },
                },
            })
            const positions = data.data?.positions2
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

export const useQueryPositions2Swr = () => {
    const { queryPositions2Swr } = useContext(SwrContext)!
    return queryPositions2Swr
}
