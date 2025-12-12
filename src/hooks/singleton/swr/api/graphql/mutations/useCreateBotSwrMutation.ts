import { MutationCreateBotParams, mutationCreateBot } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { usePrivy } from "@privy-io/react-auth"

export const useCreateBotSwrMutationCore = () => {
    const { getAccessToken } = usePrivy()
    const swrMutation = useSWRMutation(
        ["CREATE_BOT_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationCreateBotParams
            }
        ) => {
            const token = await getAccessToken()
            if (!token) {
                throw new Error("No access token found")
            }
            const data = await mutationCreateBot({
                request: arg.request,
                token,
            })
            return data
        }
    )
    return swrMutation
}

export const useCreateBotSwrMutation = () => {
    const { createBotMutation } = useContext(SwrContext)!
    return createBotMutation
}