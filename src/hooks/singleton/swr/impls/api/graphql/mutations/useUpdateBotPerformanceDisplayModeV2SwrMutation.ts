import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useUpdateBotPerformanceDisplayModeV2SwrMutation = () => {
    const { updateBotPerformanceDisplayModeV2SwrMutation } = use(SwrContext)!
    return updateBotPerformanceDisplayModeV2SwrMutation
}
