import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useUpdateBotLiquidityPoolsV2SwrMutation = () => {
    const { updateBotLiquidityPoolsV2SwrMutation } = use(SwrContext)!
    return updateBotLiquidityPoolsV2SwrMutation
}
