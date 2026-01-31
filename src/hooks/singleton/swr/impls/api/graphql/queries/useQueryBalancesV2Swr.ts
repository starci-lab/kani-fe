import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryBalancesV2Swr = () => {
    const { queryBalancesV2Swr } = use(SwrContext)!
    return queryBalancesV2Swr
}
