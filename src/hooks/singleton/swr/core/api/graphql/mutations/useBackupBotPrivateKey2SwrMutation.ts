import { 
    mutationBackupBotPrivateKeyV2   ,
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { useAppSelector } from "@/redux"
import { usePrivy } from "@privy-io/react-auth"

export const useBackupBotPrivateKeyV2SwrMutationCore = () => {
    const botId = useAppSelector(state => state.bot.id)
    const { getAccessToken, authenticated } = usePrivy()
    const swrMutation = useSWRMutation(
        authenticated && botId ? ["BACKUP_BOT_PRIVATE_KEY_V2_SWR_MUTATION", authenticated, botId] : null,
        async () => {
            const accessToken = await getAccessToken()
            if (!accessToken || !botId) {
                throw new Error("Access token is required")
            }
            const data = await mutationBackupBotPrivateKeyV2({
                token: accessToken,
                request: {
                    botId,
                },
            })
            return data
        }
    )
    return swrMutation
}
