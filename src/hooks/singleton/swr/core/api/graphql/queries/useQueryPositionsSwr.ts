import { queryPositions } from "@/modules/api"
import { setPositions, setPositionsPages, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const POSITIONS_PAGE_SIZE = 20
export const useQueryPositionsSwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const isDisabled = true
    const id = useAppSelector((state) => state.bot.id)
    const filters = useAppSelector((state) => state.bot.positionsFilters)
    const swr = useSWR(
        isDisabled ? null : (id && accessToken) ? ["QUERY_POSITIONS_SWR", id, filters] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryPositions({
                token: accessToken,
                request: {
                    botId: id,
                    filters
                },
            })
            const positions = data.data?.positions
            if (!positions) {
                throw new Error("Positions not found")
            }
            if (!positions.data) {
                throw new Error("Positions data not found")
            }
            dispatch(setPositions(positions.data.data))
            dispatch(setPositionsPages({
                currentPage: filters.pageNumber || 1,
                totalPages: Math.ceil(positions.data.count / POSITIONS_PAGE_SIZE),
            }))
            return data
        }
    )
    return swr
}
