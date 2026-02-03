import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useDisableAuthenticatorAppFormik = () => {
    const { disableAuthenticatorAppFormik } = use(FormikContext)!
    return disableAuthenticatorAppFormik
}
