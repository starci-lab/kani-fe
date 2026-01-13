import { queryLiquidityPools } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryLiquidityPoolsSelectPoolsSwrCore = () => {
    const selectPoolsFilters = useAppSelector((state) => state.createBot.selectPoolsFilters)
    const targetTokenId = useAppSelector((state) => state.createBot.targetTokenId)
    const quoteTokenId = useAppSelector((state) => state.createBot.quoteTokenId)
    const { authenticated } = usePrivy()
    const swr = useSWR(
        authenticated && targetTokenId && quoteTokenId ? [
            "QUERY_LIQUIDITY_POOLS_SELECT_POOLS_SWR", 
            selectPoolsFilters,
            authenticated,
            targetTokenId,
            quoteTokenId
        ] : null, 
        async () => {
            if (!targetTokenId || !quoteTokenId || !selectPoolsFilters) {
                throw new Error("Target token id or quote token id or select pools filters is required")
            }
            const data = await queryLiquidityPools(
                { 
                    request: { 
                        filters: {
                            dexIds: selectPoolsFilters.dexIds,
                            watchlist: selectPoolsFilters.watchlist,
                            incentivized: selectPoolsFilters.incentivized,
                            sortBy: selectPoolsFilters.sortBy,
                            asc: selectPoolsFilters.asc,
                            pageNumber: selectPoolsFilters.pageNumber,
                            tokenIds: [
                                targetTokenId,
                                quoteTokenId,
                            ],
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
