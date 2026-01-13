import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useRequestSend2FactorOtpSwrMutation = () => {
    const { requestSend2FactorOtpSwrMutation } = use(SwrContext)!
    return requestSend2FactorOtpSwrMutation
}
