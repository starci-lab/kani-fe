import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryBotV2Swr = () => {
    const { queryBotV2Swr } = use(SwrContext)!
    return queryBotV2Swr
}