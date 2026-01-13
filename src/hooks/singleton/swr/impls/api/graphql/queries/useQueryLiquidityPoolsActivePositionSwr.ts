import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryLiquidityPoolsActivePositionSwr = () => {
    const { queryLiquidityPoolsActivePositionSwr } = use(SwrContext)!
    return queryLiquidityPoolsActivePositionSwr
}
