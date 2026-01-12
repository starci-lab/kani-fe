import { MutationUpdateBotSettingsV2Params, mutationUpdateBotSettingsV2 } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useAppSelector } from "@/redux"

export const useUpdateBotSettingsV2SwrMutationCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const botId = useAppSelector((state) => state.bot.bot?.id)
    const swrMutation = useSWRMutation(
        authenticated && botId ? ["UPDATE_BOT_SETTINGS_V2_SWR_MUTATION", authenticated, botId] : null,
        async (
            _,
            {
                arg,
            }: {
                arg: MutationUpdateBotSettingsV2Params
            }
        ) => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationUpdateBotSettingsV2({
                request: arg.request,
                token: accessToken,
            })
            return data
        }
    )
    return swrMutation
}

export const useUpdateBotSettingsV2SwrMutation = () => {
    const { updateBotSettingsV2SwrMutation } = use(SwrContext)!
    return updateBotSettingsV2SwrMutation
}