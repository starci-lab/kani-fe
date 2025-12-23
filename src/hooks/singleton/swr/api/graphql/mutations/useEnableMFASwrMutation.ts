import { MutationEnableMFAParams, mutationEnableMFA } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"

export const useEnableMFASwrMutationCore = () => {
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const swrMutation = useSWRMutation(
        ["ENABLE_MFA_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationEnableMFAParams
            }
        ) => {
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationEnableMFA({
                headers: arg.headers,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}

export const useEnableMFASwrMutation = () => {
    const { enableMFASwrMutation } = use(SwrContext)!
    return enableMFASwrMutation
}