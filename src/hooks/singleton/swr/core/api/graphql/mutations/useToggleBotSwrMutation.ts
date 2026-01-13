import { MutationToggleBotParams, mutationToggleBot } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { useAppSelector } from "@/redux"

export const useToggleBotSwrMutationCore = () => {
    const accessToken = useAppSelector((state) => state.session.accessToken)    
    const swrMutation = useSWRMutation(
        ["TOGGLE_BOT_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationToggleBotParams
            }
        ) => {
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationToggleBot({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}
