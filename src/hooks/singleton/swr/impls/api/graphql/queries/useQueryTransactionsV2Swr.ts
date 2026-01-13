import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryTransactionsV2Swr = () => {
    const { queryTransactionsV2Swr } = use(SwrContext)!
    return queryTransactionsV2Swr
}
