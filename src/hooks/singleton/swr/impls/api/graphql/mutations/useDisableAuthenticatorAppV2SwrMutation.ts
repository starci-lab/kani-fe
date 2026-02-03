import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useDisableAuthenticatorAppV2SwrMutation = () => {
    const { disableAuthenticatorAppV2SwrMutation } = use(SwrContext)!
    return disableAuthenticatorAppV2SwrMutation
}
