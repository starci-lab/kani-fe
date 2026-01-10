import { MutationCreateBotV2Params, mutationCreateBotV2 } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { usePrivy } from "@privy-io/react-auth"

export const useCreateBotV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const swrMutation = useSWRMutation(
        authenticated ? ["CREATE_BOT_V2_SWR_MUTATION", authenticated] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationCreateBotV2Params
            }
        ) => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationCreateBotV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}

export const useCreateBotV2SwrMutation = () => {
    const { createBotV2SwrMutation } = use(SwrContext)!
    return createBotV2SwrMutation
}