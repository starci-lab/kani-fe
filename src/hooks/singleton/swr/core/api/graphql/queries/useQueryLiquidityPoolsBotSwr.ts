import { queryLiquidityPools } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryLiquidityPoolsBotSwrCore = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const swr = useSWR(
        bot?.id ? [
            "QUERY_LIQUIDITY_POOLS_BOT_SWR", bot.id
        ] : null, 
        async () => {
            const data = await queryLiquidityPools(
                { 
                    request: { 
                        filters: {
                            ids: bot?.liquidityPools.map((liquidityPool) => liquidityPool),
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
