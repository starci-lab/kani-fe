import { queryPositionsV2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setPositions, setPositionsCursor, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const POSITIONS_V2_PAGE_SIZE = 20
export const useQueryPositionsV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const id = useAppSelector((state) => state.bot.id)
    const cursor = useAppSelector((state) => state.bot.positionsCursor)
    const swr = useSWR(
        // deprecated
        null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryPositionsV2({
                token: accessToken,
                request: {
                    botId: id,
                    filters: {
                        timestampAscending: false,
                        cursor: cursor || "",
                        limit: 10,
                    },
                },
            })
            const positions = data.data?.positionsV2
            if (!positions) {
                throw new Error("Positions not found")
            }
            if (!positions.data) {
                throw new Error("Positions data not found")
            }
            dispatch(setPositionsCursor(positions.data.cursor))
            dispatch(setPositions(positions.data.data))
            return data
        }
    )
    return swr
}

export const useQueryPositionsV2Swr = () => {
    const { queryPositionsV2Swr } = use(SwrContext)!
    return queryPositionsV2Swr
}
