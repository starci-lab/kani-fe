import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryLiquidityPoolsUpdatePoolsSwr = () => {
    const { queryLiquidityPoolsUpdatePoolsSwr } = use(SwrContext)!
    return queryLiquidityPoolsUpdatePoolsSwr
}
