import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryTransactionsSwr = () => {
    const { queryTransactionsSwr } = use(SwrContext)!
    return queryTransactionsSwr
}
