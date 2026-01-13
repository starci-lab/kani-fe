import { queryLiquidityPools } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryLiquidityPoolsSelectedPoolsSwrCore = () => {
    const liquidityPoolIds = useAppSelector((state) => state.createBot.liquidityPoolIds)
    const { authenticated } = usePrivy()
    const swr = useSWR(
        authenticated && liquidityPoolIds ? [
            "QUERY_LIQUIDITY_POOLS_SELECTED_POOLS_SWR", 
            liquidityPoolIds,
            authenticated,
            liquidityPoolIds
        ] : null, 
        async () => {
            if (!liquidityPoolIds) {
                throw new Error("Liquidity pool ids is required")
            }
            const data = await queryLiquidityPools(
                { 
                    request: { 
                        filters: {
                            ids: liquidityPoolIds,
                        },
                    } 
                }
            )
            if (!data || !data.data) {
                throw new Error("Liquidity pools not found")
            }
            return data.data
        })
    return swr
}
