import { queryFees } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryFeesSwrCore = () => {
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const id = useAppSelector((state) => state.bot.id)
    const swr = useSWR(
        id && accessToken ? ["QUERY_FEES_SWR", id] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryFees({
                token: accessToken,
                request: {
                    id,
                },
            })
            console.log("data", data)
            return data
        }
    )
    return swr
}

export const useQueryFeesSwr = () => {
    const { queryFeesSwr } = use(SwrContext)!
    return queryFeesSwr
}
