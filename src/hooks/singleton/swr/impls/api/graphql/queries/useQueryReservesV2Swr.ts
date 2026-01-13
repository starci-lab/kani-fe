import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryReservesV2Swr = () => {
    const { queryReservesV2Swr } = use(SwrContext)!
    return queryReservesV2Swr
}
