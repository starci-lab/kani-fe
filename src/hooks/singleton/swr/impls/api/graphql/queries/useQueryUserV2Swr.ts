import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryUserV2Swr = () => {
    const { queryUserV2Swr } = use(SwrContext)!
    return queryUserV2Swr
}
