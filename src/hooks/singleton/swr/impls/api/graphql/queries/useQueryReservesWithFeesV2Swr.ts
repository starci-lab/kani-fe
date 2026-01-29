import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryReservesWithFeesV2Swr = () => {
    const { queryReservesWithFeesV2Swr } = use(SwrContext)!
    return queryReservesWithFeesV2Swr
}
