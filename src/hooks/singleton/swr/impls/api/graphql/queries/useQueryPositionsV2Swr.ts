import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryPositionsV2Swr = () => {
    const { queryPositionsV2Swr } = use(SwrContext)!
    return queryPositionsV2Swr
}
