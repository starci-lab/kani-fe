import { MutationUpdateBotLiquidityPoolsV2Params, mutationUpdateBotLiquidityPoolsV2 } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { usePrivy } from "@privy-io/react-auth"
import { useAppSelector } from "@/redux"

export const useUpdateBotLiquidityPoolsV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const botId = useAppSelector((state) => state.bot.bot?.id)
    const swrMutation = useSWRMutation(
        authenticated && botId ? ["UPDATE_BOT_LIQUIDITY_POOLS_V2_SWR_MUTATION", authenticated, botId] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationUpdateBotLiquidityPoolsV2Params
            }
        ) => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationUpdateBotLiquidityPoolsV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}
