import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useCreateBotV2SwrMutation = () => {
    const { createBotV2SwrMutation } = use(SwrContext)!
    return createBotV2SwrMutation
}
