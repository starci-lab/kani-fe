
import { queryTotpSecret } from "@/modules/api"
import { useAppSelector } from "@/redux"
import useSWRMutation from "swr/mutation"

export const useQueryTotpSecretSwrMutationCore = () => {
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const swrMutation = useSWRMutation(
        ["QUERY_TOTP_SECRET_SWR_MUTATION"],
        async () => {
            if (!accessToken) {
                throw new Error("Access token is required")
            }
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