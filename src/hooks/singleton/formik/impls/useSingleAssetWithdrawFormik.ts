import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useSingleAssetWithdrawFormik = () => {
    const { singleAssetWithdrawFormik } = use(FormikContext)!
    return singleAssetWithdrawFormik
}
