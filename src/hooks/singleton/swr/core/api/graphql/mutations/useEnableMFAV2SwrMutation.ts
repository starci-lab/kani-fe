import { MutationEnableMFAV2Params, mutationEnableMFAV2 } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { usePrivy } from "@privy-io/react-auth"

export const useEnableMFAV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const swrMutation = useSWRMutation(
        authenticated ? ["ENABLE_MFA_V2_SWR_MUTATION", authenticated] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationEnableMFAV2Params
            }
        ) => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationEnableMFAV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}
