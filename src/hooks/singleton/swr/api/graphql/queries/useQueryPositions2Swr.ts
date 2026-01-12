import { queryPositions2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setPositions, setPositionsPages, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const POSITIONS_2_PAGE_SIZE = 20
export const useQueryPositions2SwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const isDisabled = true
    const id = useAppSelector((state) => state.bot.id)
    const filters = useAppSelector((state) => state.bot.positionsFilters)
    const swr = useSWR(
        isDisabled ? null : (id && accessToken) ? ["QUERY_POSITIONS2_SWR", id, filters] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryPositions2({
                token: accessToken,
                request: {
                    botId: id,
                    filters
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
            dispatch(setPositionsPages({
                currentPage: filters.pageNumber || 1,
                totalPages: Math.ceil(positions.data.count / POSITIONS_2_PAGE_SIZE),
            }))
            return data
        }
    )
    return swr
}

export const useQueryPositions2Swr = () => {
    const { queryPositions2Swr } = use(SwrContext)!
    return queryPositions2Swr
}
