import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useVerifyFormik = () => {
    const { verifyFormik } = use(FormikContext)!
    return verifyFormik
}
