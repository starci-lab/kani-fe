import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useEnableMFAFormik = () => {
    const { enableMFAFormik } = use(FormikContext)!
    return enableMFAFormik
}
