import { MutationCreateBotParams, mutationCreateBot } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppSelector } from "@/redux"

export const useCreateBotSwrMutationCore = () => {
    const accessToken = useAppSelector((state) => state.session.accessToken)    
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
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationCreateBot({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}

export const useCreateBotSwrMutation = () => {
    const { createBotSwrMutation } = use(SwrContext)!
    return createBotSwrMutation
}