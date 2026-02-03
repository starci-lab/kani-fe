import { FormikContext } from "../FormikContext"
import { use } from "react"

export const useUpdateBotWithdrawalAddressFormik = () => {
    const { updateBotWithdrawalAddressFormik } = use(FormikContext)!
    return updateBotWithdrawalAddressFormik
}
