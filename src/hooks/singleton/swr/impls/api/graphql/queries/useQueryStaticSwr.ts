import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryStaticSwr = () => {
    const { queryStaticSwr } = use(SwrContext)!
    return queryStaticSwr
}
