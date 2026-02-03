import { queryTotpSecretV2 } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryTotpSecretV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const swrMutation = useSWRMutation(
        authenticated ? ["QUERY_TOTP_SECRET_V2_SWR_MUTATION", authenticated] : null,
        async () => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryTotpSecretV2({
                token: accessToken,
            })
            const totpSecret = data.data?.totpSecretV2
            if (!totpSecret) {
                throw new Error("Totp secret V2 not found")
            }
            return data
        }
    )
    return swrMutation
}
