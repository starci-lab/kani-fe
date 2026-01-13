import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryBotsV2Swr = () => {
    const { queryBotsV2Swr } = use(SwrContext)!
    return queryBotsV2Swr
}
