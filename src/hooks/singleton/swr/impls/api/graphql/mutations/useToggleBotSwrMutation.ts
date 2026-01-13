import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useToggleBotSwrMutation = () => {
    const { toggleBotSwrMutation } = use(SwrContext)!
    return toggleBotSwrMutation
}
