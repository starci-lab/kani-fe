import { useMemo } from "react"
import { 
    useCreateBotFormik, 
    useQueryDynamicLiquidityPoolInfoSwrMutation 
} from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useSelectPools = () => {
    const formik = useCreateBotFormik()
    // we retrieve the liquidity pools for the selected chain
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    // we retrieve the liquidity pool ids for the selected chain
    const selectedLiquidityPoolIds = useMemo(() => {
        return liquidityPools.filter(
            (liquidityPool) => liquidityPool.chainId === formik.values.chainId)
            .map((liquidityPool) => liquidityPool.displayId)
    }, [liquidityPools, formik.values.chainId])
    const swrMutation = useQueryDynamicLiquidityPoolInfoSwrMutation()
    const { authenticated } = usePrivy()
    useSWR(
        authenticated && selectedLiquidityPoolIds.length > 0 ? 
            [
                "QUERY_DYNAMIC_LIQUIDITY_POOL_INFO_SWR", 
                selectedLiquidityPoolIds, 
                authenticated
            ] 
            : null,
        () => {
            swrMutation.trigger({
                request: {
                    liquidityPoolIds: selectedLiquidityPoolIds,
                },
            })
        }
    )
}