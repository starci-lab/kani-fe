import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useUpdateBotNameFormik = () => {
    const { updateBotNameFormik } = use(FormikContext)!
    return updateBotNameFormik
}
