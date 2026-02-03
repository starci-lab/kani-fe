import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useVerifyAuthenticatorAppFormik = () => {
    const { verifyAuthenticatorAppFormik } = use(FormikContext)!
    return verifyAuthenticatorAppFormik
}
