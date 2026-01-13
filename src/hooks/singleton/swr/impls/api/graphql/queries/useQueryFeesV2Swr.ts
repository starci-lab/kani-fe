import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryFeesV2Swr = () => {
    const { queryFeesV2Swr } = use(SwrContext)!
    return queryFeesV2Swr
}
