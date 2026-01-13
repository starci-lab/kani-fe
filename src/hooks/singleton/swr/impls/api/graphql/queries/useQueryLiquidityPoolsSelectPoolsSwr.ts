import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryLiquidityPoolsSelectPoolsSwr = () => {
    const { queryLiquidityPoolsSelectPoolsSwr } = use(SwrContext)!
    return queryLiquidityPoolsSelectPoolsSwr
}
