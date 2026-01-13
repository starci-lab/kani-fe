import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useCreateBotFormik = () => {
    const { createBotFormik } = use(FormikContext)!
    return createBotFormik
}
