import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryTotpSecretV2SwrMutation = () => {
    const { queryTotpSecretV2SwrMutation } = use(SwrContext)!
    return queryTotpSecretV2SwrMutation
}
