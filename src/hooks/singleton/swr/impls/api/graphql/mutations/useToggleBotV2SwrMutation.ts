import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useToggleBotV2SwrMutation = () => {
    const { toggleBotV2SwrMutation } = use(SwrContext)!
    return toggleBotV2SwrMutation
}
