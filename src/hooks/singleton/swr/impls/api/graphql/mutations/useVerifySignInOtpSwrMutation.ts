import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useVerifySignInOtpSwrMutation = () => {
    const { verifySignInOtpSwrMutation } = use(SwrContext)!
    return verifySignInOtpSwrMutation
}
