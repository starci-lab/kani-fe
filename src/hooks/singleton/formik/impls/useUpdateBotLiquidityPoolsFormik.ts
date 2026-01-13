import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useUpdateBotLiquidityPoolsFormik = () => {
    const { updateBotLiquidityPoolsFormik } = use(FormikContext)!
    return updateBotLiquidityPoolsFormik
}
