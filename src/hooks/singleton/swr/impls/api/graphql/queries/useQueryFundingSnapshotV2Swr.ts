import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryFundingSnapshotV2Swr = () => {
    const { queryFundingSnapshotV2Swr } = use(SwrContext)!
    return queryFundingSnapshotV2Swr
}
