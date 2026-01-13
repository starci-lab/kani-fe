import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useSignInFormik = () => {
    const { signInFormik } = use(FormikContext)!
    return signInFormik
}
