import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useUpdateBotPositionsPerformanceDisplayModeV2SwrMutation = () => {
    const { updateBotPositionsPerformanceDisplayModeV2SwrMutation } = use(SwrContext)!
    return updateBotPositionsPerformanceDisplayModeV2SwrMutation
}
