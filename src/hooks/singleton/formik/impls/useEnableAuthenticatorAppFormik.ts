import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useEnableAuthenticatorAppFormik = () => {
    const { enableAuthenticatorAppFormik } = use(FormikContext)!
    return enableAuthenticatorAppFormik
}
