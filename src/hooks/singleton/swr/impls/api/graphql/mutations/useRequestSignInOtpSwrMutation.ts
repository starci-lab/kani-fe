import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useRequestSignInOtpSwrMutation = () => {
    const { requestSignInOtpSwrMutation } = use(SwrContext)!
    return requestSignInOtpSwrMutation
}
