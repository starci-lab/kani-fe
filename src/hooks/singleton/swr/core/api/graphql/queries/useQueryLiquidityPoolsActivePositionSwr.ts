import { queryLiquidityPools } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryLiquidityPoolsActivePositionSwrCore = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const { authenticated } = usePrivy()
    const swr = useSWR(
        authenticated && bot && bot.id && bot?.activePosition?.id ? [
            "QUERY_LIQUIDITY_POOLS_ACTIVE_POSITION_SWR", 
            bot.id,
            bot.activePosition.id,
            authenticated
        ] : null, 
        async () => {
            if (!bot || !bot.id || !bot.activePosition) {
                throw new Error("Bot id or active position is required")
            }
            const data = await queryLiquidityPools(
                { 
                    request: { 
                        filters: {
                            ids: [bot.activePosition.liquidityPool],
                        },
                    } 
                }
            )
            if (!data || !data.data) {
                throw new Error("Liquidity pool not found")
            }
            return data.data
        })
    return swr
}
