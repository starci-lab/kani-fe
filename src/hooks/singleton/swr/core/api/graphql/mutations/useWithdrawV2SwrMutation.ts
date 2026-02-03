import {
    MutationWithdrawV2Params,
    mutationWithdrawV2,
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { usePrivy } from "@privy-io/react-auth"

export const useWithdrawV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const swrMutation = useSWRMutation(
        authenticated ? ["WITHDRAW_V2_SWR_MUTATION", authenticated] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationWithdrawV2Params
            }
        ) => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationWithdrawV2({
                request: arg.request,
                token: accessToken,
                headers: arg.headers,
            })
            return data
        }
    )
    return swrMutation
}
