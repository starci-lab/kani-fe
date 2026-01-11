import { queryLiquidityPools2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryLiquidityPools2ActivePositionSwrCore = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const swr = useSWR(
        bot?.activePosition?.id ? [
            "QUERY_LIQUIDITY_POOLS2_ACTIVE_POSITION_SWR", 
            bot.activePosition.liquidityPool
        ] : null, 
        async () => {
            if (!bot || !bot.activePosition) {
                throw new Error("Bot or active position is required")
            }
            const data = await queryLiquidityPools2(
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

export const useQueryLiquidityPools2ActivePositionSwr = () => {
    const { queryLiquidityPools2ActivePositionSwr } = use(SwrContext)!
    return queryLiquidityPools2ActivePositionSwr
}