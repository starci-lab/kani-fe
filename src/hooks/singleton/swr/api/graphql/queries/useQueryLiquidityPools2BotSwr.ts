import { queryLiquidityPools2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryLiquidityPools2BotSwrCore = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const swr = useSWR(bot?.id ? ["QUERY_LIQUIDITY_POOLS2_BOT_SWR", bot.id] : null, 
        async () => {
            const data = await queryLiquidityPools2(
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

export const useQueryLiquidityPools2BotSwr = () => {
    const { queryLiquidityPools2BotSwr } = use(SwrContext)!
    return queryLiquidityPools2BotSwr
}