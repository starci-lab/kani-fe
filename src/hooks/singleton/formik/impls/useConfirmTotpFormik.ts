import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useConfirmTotpFormik = () => {
    const { confirmTotpFormik } = use(FormikContext)!
    return confirmTotpFormik
}
