import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useEnableMFASwrMutation = () => {
    const { enableMFASwrMutation } = use(SwrContext)!
    return enableMFASwrMutation
}
