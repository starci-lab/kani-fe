import { MutationVerifyPrivyAuthTokenParams, mutationVerifyPrivyAuthToken } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"

export const useVerifyPrivyAuthTokenSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["VERIFY_PRIVY_AUTH_TOKEN_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationVerifyPrivyAuthTokenParams
            }
        ) => {
            const data = await mutationVerifyPrivyAuthToken({
                mutation: arg.mutation,
                token: arg.token,
            })
            return data
        }
    )
    return swrMutation
}

export const useVerifyPrivyAuthTokenSwrMutation = () => {
    const { verifyPrivyAuthTokenMutation } = useContext(SwrContext)!
    return verifyPrivyAuthTokenMutation
}
