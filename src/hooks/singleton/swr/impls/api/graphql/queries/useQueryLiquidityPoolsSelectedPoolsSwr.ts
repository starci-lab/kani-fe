import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryLiquidityPoolsSelectedPoolsSwr = () => {
    const { queryLiquidityPoolsSelectedPoolsSwr } = use(SwrContext)!
    return queryLiquidityPoolsSelectedPoolsSwr
}
