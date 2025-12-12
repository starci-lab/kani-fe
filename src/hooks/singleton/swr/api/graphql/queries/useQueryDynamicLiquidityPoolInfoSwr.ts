import { queryDynamicLiquidityPoolsInfo, QueryDynamicLiquidityPoolsInfoParams } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { usePrivy } from "@privy-io/react-auth"
import useSWRMutation from "swr/mutation"
import { setDynamicLiquidityPoolInfos } from "@/redux/slices"
import { useAppDispatch } from "@/redux"

export const useQueryDynamicLiquidityPoolInfoSwrMutationCore = () => {
    const { getAccessToken } = usePrivy()
    const dispatch = useAppDispatch()
    const swrMutation = 
    useSWRMutation(["QUERY_DYNAMIC_LIQUIDITY_POOL_INFO_SWR"], 
        async (_, { arg }: { arg: QueryDynamicLiquidityPoolsInfoParams }) => {
            const token = await getAccessToken()
            if (!token) {
                throw new Error("No access token found")
            }
            const data = await queryDynamicLiquidityPoolsInfo({ token, ...arg })
            if (!data || !data.data) {
                throw new Error("Dynamic liquidity pools info not found")
            }
            dispatch(setDynamicLiquidityPoolInfos(data.data.dynamicLiquidityPoolsInfo.data || []))
            return data.data
        })
    return swrMutation
}

export const useQueryDynamicLiquidityPoolInfoSwrMutation = () => {
    const { queryDynamicLiquidityPoolInfoMutation } = useContext(SwrContext)!
    return queryDynamicLiquidityPoolInfoMutation
}