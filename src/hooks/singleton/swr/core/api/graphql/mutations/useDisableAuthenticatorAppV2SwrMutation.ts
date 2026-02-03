import {
    MutationDisableAuthenticatorAppV2Params,
    mutationDisableAuthenticatorAppV2,
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { usePrivy } from "@privy-io/react-auth"

export const useDisableAuthenticatorAppV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const swrMutation = useSWRMutation(
        authenticated ? ["DISABLE_AUTHENTICATOR_APP_V2_SWR_MUTATION", authenticated] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationDisableAuthenticatorAppV2Params
            }
        ) => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationDisableAuthenticatorAppV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}
