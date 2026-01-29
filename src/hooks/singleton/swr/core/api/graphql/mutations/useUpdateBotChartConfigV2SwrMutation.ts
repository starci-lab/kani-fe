import {
    MutationUpdateBotChartConfigV2Params,
    mutationUpdateBotChartConfigV2,
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { usePrivy } from "@privy-io/react-auth"

export const useUpdateBotChartConfigV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const swrMutation = useSWRMutation(
        authenticated
            ? ["UPDATE_BOT_CHART_CONFIG_V2_SWR_MUTATION", authenticated]
            : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationUpdateBotChartConfigV2Params
            }
        ) => {
            if (!arg.request) {
                throw new Error("Argument is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationUpdateBotChartConfigV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}

