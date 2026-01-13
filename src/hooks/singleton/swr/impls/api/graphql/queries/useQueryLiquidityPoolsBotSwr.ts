import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryLiquidityPoolsBotSwr = () => {
    const { queryLiquidityPoolsBotSwr } = use(SwrContext)!
    return queryLiquidityPoolsBotSwr
}
