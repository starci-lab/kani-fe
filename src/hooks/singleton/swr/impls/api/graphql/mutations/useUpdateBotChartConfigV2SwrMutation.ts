import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useUpdateBotChartConfigV2SwrMutation = () => {
    const { updateBotChartConfigV2SwrMutation } = use(SwrContext)!
    return updateBotChartConfigV2SwrMutation
}

