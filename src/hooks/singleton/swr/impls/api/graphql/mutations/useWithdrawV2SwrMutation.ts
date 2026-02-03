import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useWithdrawV2SwrMutation = () => {
    const { withdrawV2SwrMutation } = use(SwrContext)!
    return withdrawV2SwrMutation
}
