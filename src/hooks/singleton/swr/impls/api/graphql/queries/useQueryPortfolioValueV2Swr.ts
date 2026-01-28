import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryPortfolioValueV2Swr = () => {
    const { queryPortfolioValueV2Swr } = use(SwrContext)!
    return queryPortfolioValueV2Swr
}
