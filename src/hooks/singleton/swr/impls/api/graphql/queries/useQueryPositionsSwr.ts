import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useQueryPositionsSwr = () => {
    const { queryPositionsSwr } = use(SwrContext)!
    return queryPositionsSwr
}
