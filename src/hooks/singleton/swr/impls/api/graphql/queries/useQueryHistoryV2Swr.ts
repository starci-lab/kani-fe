import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryHistoryV2Swr = () => {
    const { queryHistoryV2Swr } = use(SwrContext)!
    return queryHistoryV2Swr
}
