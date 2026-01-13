import { DiscloresureContext } from "../DiscloresureContext"
import { use } from "react"

export const useVerifyDisclosure = () => {
    const { verify } = use(DiscloresureContext)!
    return verify
}
