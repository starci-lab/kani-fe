import { 
    MutationUpdateBotPositionsPerformanceDisplayModeV2Params, 
    mutationUpdateBotPositionsPerformanceDisplayModeV2 
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { usePrivy } from "@privy-io/react-auth"

export const useUpdateBotPositionsPerformanceDisplayModeV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const swrMutation = useSWRMutation(
        authenticated ? ["UPDATE_BOT_POSITIONS_PERFORMANCE_DISPLAY_MODE_V2_SWR_MUTATION", authenticated] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationUpdateBotPositionsPerformanceDisplayModeV2Params
            }
        ) => {
            if (!arg.request) {
                throw new Error("Argument is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationUpdateBotPositionsPerformanceDisplayModeV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}
