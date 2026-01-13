import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryTotpSecretSwrMutation = () => {
    const { queryTotpSecretSwrMutation } = use(SwrContext)!
    return queryTotpSecretSwrMutation
}