import { DiscloresureContext } from "../DiscloresureContext"
import { use } from "react"

export const useEnableMFADisclosure = () => {
    const { enableMFA } = use(DiscloresureContext)!
    return enableMFA
}
