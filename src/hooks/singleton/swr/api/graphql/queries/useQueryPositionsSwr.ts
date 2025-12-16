import { queryPositions } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { setPositions, setPositionsCursor, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryPositionsSwrCore = () => {
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
            const data = await queryPositions({
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
            const positions = data.data?.positions
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

export const useQueryPositionsSwr = () => {
    const { queryPositions } = useContext(SwrContext)!
    return queryPositions
}
