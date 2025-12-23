import { queryDynamicLiquidityPoolsInfo, QueryDynamicLiquidityPoolsInfoParams } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import useSWRMutation from "swr/mutation"
import { setDynamicLiquidityPoolInfos } from "@/redux/slices"
import { useAppDispatch, useAppSelector } from "@/redux"

export const useQueryDynamicLiquidityPoolInfoSwrMutationCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const swrMutation = 
    useSWRMutation(["QUERY_DYNAMIC_LIQUIDITY_POOL_INFO_SWR"], 
        async (_, { arg }: { arg: QueryDynamicLiquidityPoolsInfoParams }) => {
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryDynamicLiquidityPoolsInfo({ token: accessToken, ...arg })
            if (!data || !data.data) {
                throw new Error("Dynamic liquidity pools info not found")
            }
            dispatch(setDynamicLiquidityPoolInfos(data.data.dynamicLiquidityPoolsInfo.data || []))
            return data.data
        })
    return swrMutation
}

export const useQueryDynamicLiquidityPoolInfoSwrMutation = () => {
    const { queryDynamicLiquidityPoolInfoSwrMutation } = use(SwrContext)!
    return queryDynamicLiquidityPoolInfoSwrMutation
}