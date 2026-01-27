import { 
    MutationUpdateBotPerformanceDisplayModeV2Params, 
    mutationUpdateBotPerformanceDisplayModeV2 
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { usePrivy } from "@privy-io/react-auth"
import { useAppDispatch } from "@/redux"
import { updateBotPerformanceDisplayMode } from "@/redux"

export const useUpdateBotPerformanceDisplayModeV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const dispatch = useAppDispatch()
    const swrMutation = useSWRMutation(
        authenticated ? ["UPDATE_BOT_PERFORMANCE_DISPLAY_MODE_V2_SWR_MUTATION", authenticated] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationUpdateBotPerformanceDisplayModeV2Params
            }
        ) => {
            if (!arg.request) {
                throw new Error("Argument is required")
            }
            dispatch(updateBotPerformanceDisplayMode({
                id: arg.request.id,
                performanceDisplayMode: arg.request.performanceDisplayMode,
            }))
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationUpdateBotPerformanceDisplayModeV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}
