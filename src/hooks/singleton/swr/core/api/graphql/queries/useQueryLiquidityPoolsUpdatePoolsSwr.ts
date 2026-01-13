import { queryLiquidityPools } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"
import { useMemo } from "react"

export const useQueryLiquidityPoolsUpdatePoolsSwrCore = () => {
    const botId = useAppSelector((state) => state.bot.id)
    const bot = useAppSelector((state) => state.bot.bot)
    const updatePoolsFilters = useAppSelector((state) => state.bot.updatePoolsFilters)
    const tokens = useAppSelector((state) => state.static.tokens)
    const targetToken = useMemo(() => tokens.find((token) => token.id === bot?.targetToken), [tokens, bot?.targetToken])
    const quoteToken = useMemo(() => tokens.find((token) => token.id === bot?.quoteToken), [tokens, bot?.quoteToken])
    const { authenticated } = usePrivy()
    const swr = useSWR(
        authenticated && botId && targetToken?.id && quoteToken?.id ? [
            "QUERY_LIQUIDITY_POOLS_UPDATE_POOLS_SWR", 
            botId,
            updatePoolsFilters,
            authenticated,
            targetToken?.id,
            quoteToken?.id
        ] : null, 
        async () => {
            if (!botId || !updatePoolsFilters || !targetToken?.id || !quoteToken?.id) {
                throw new Error("Bot id or update pools filters is required")
            }
            const data = await queryLiquidityPools(
                { 
                    request: { 
                        filters: {
                            dexIds: updatePoolsFilters.dexIds,
                            watchlist: updatePoolsFilters.watchlist,
                            incentivized: updatePoolsFilters.incentivized,
                            sortBy: updatePoolsFilters.sortBy,
                            asc: updatePoolsFilters.asc,
                            pageNumber: updatePoolsFilters.pageNumber,
                            tokenIds: [
                                targetToken.id, 
                                quoteToken.id
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
