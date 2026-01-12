import { MutationToggleBotV2Params, mutationToggleBotV2 } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useAppSelector } from "@/redux"

export const useToggleBotV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const botId = useAppSelector((state) => state.bot.bot?.id)
    const swrMutation = useSWRMutation(
        authenticated && botId ? ["TOGGLE_BOT_V2_SWR_MUTATION", authenticated, botId] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationToggleBotV2Params
            }
        ) => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationToggleBotV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}

export const useToggleBotV2SwrMutation = () => {
    const { toggleBotV2SwrMutation } = use(SwrContext)!
    return toggleBotV2SwrMutation
}