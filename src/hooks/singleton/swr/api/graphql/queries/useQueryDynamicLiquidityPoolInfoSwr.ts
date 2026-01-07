import { queryDynamicLiquidityPoolsInfo } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setDynamicLiquidityPoolInfos } from "@/redux/slices"
import { useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryDynamicLiquidityPoolInfoSwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const liquidityPoolIds = useAppSelector((state) => state.static.liquidityPools.map((liquidityPool) => liquidityPool.displayId))
    const swr = useSWR(liquidityPoolIds ? ["QUERY_DYNAMIC_LIQUIDITY_POOL_INFO_SWR", liquidityPoolIds] : null, 
        async () => {
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryDynamicLiquidityPoolsInfo(
                { 
                    token: accessToken, 
                    request: { liquidityPoolIds } 
                }
            )
            if (!data || !data.data) {
                throw new Error("Dynamic liquidity pools info not found")
            }
            dispatch(setDynamicLiquidityPoolInfos(data.data.dynamicLiquidityPoolsInfo.data || []))
            return data.data
        })
    return swr
}

export const useQueryDynamicLiquidityPoolInfoSwr = () => {
    const { queryDynamicLiquidityPoolInfoSwr } = use(SwrContext)!
    return queryDynamicLiquidityPoolInfoSwr
}