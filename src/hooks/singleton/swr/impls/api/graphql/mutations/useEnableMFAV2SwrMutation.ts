import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useEnableMFAV2SwrMutation = () => {
    const { enableMFAV2SwrMutation } = use(SwrContext)!
    return enableMFAV2SwrMutation
}
