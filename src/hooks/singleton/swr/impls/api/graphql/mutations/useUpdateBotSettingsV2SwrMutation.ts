import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useUpdateBotSettingsV2SwrMutation = () => {
    const { updateBotSettingsV2SwrMutation } = use(SwrContext)!
    return updateBotSettingsV2SwrMutation
}
