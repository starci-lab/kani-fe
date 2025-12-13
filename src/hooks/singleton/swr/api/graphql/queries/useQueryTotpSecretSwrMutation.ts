import { queryTotpSecret } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { useAppSelector } from "@/redux"
import useSWRMutation from "swr/mutation"

export const useQueryTotpSecretSwrMutationCore = () => {
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const swrMutation = useSWRMutation(
        "QUERY_TOTP_SECRET_SWR_MUTATION",
        async () => {
            const data = await queryTotpSecret({
                token: accessToken,
            })
            const totpSecret = data.data?.totpSecret
            if (!totpSecret) {
                throw new Error("Totp secret not found")
            }
            return data
        }
    )
    return swrMutation
}

export const useQueryTotpSecretSwrMutation = () => {
    const { queryTotpSecretMutation } = useContext(SwrContext)!
    return queryTotpSecretMutation
}
