import { FormikContext } from "../FormikContext"
import { use } from "react"

export const usePercentageWithdrawFormik = () => {
    const { percentageWithdrawFormik } = use(FormikContext)!
    return percentageWithdrawFormik
}
