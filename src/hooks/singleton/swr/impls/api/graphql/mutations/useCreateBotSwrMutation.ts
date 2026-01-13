import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useCreateBotSwrMutation = () => {
    const { createBotSwrMutation } = use(SwrContext)!
    return createBotSwrMutation
}
