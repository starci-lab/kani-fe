import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useEnableAuthenticatorAppV2SwrMutation = () => {
    const { enableAuthenticatorAppV2SwrMutation } = use(SwrContext)!
    return enableAuthenticatorAppV2SwrMutation
}
