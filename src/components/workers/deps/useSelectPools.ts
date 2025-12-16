import { 
    useQueryDynamicLiquidityPoolInfoSwrMutation 
} from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useSelectPools = () => {
    const swrMutation = useQueryDynamicLiquidityPoolInfoSwrMutation()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    useSWR(
        accessToken ? 
            [
                "QUERY_DYNAMIC_LIQUIDITY_POOL_INFO_SWR", 
                accessToken
            ] 
            : null,
        async () => {
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            await swrMutation.trigger({
                request: {
                    liquidityPoolIds: liquidityPools.map((liquidityPool) => liquidityPool.displayId),
                }
            })
        }
    )
}