import { queryPositionsV2 } from "@/modules/api"
import { setPositions, setPositionsPages, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const POSITIONS_V2_PAGE_SIZE = 20
export const useQueryPositionsV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const { getAccessToken, authenticated } = usePrivy()
    const id = useAppSelector((state) => state.bot.id)
    const filters = useAppSelector((state) => state.bot.positionsFilters)
    const swr = useSWR(
        authenticated ? ["QUERY_POSITIONS_V2_SWR", authenticated, filters, id] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryPositionsV2({
                token: accessToken,
                request: {
                    botId: id,
                    filters
                },
            })
            const positions = data.data?.positionsV2
            if (!positions) {
                throw new Error("PositionsV2 not found")
            }
            if (!positions.data) {
                throw new Error("PositionsV2 data not found")
            }
            dispatch(setPositions(positions.data.data))
            dispatch(setPositionsPages({
                currentPage: filters.pageNumber || 1,
                totalPages: Math.ceil(positions.data.count / POSITIONS_V2_PAGE_SIZE),
            }))
            return data
        }
    )
    return swr
}
