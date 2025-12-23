import { 
    mutationBackupBotPrivateKey,
    GraphQLHeadersKey
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { useAppSelector } from "@/redux"
import { use } from "react"
import { SwrContext } from "../../../SwrContext"

export const useBackupBotPrivateKeySwrMutationCore = () => {
    const accessToken = useAppSelector(state => state.session.accessToken)
    const botId = useAppSelector(state => state.bot.id)
    const swrMutation = useSWRMutation(
        ["BACKUP_BOT_PRIVATE_KEY_SWR_MUTATION"],
        async (_, { arg }: { arg: UseBackupBotPrivateKeySwrMutationParams }) => {
            const { emailOtp, totp } = arg
            if (!accessToken || !botId) {
                throw new Error("Access token is required")
            }
            const data = await mutationBackupBotPrivateKey({
                token: accessToken,
                request: {
                    botId,
                },
                headers: {
                    [GraphQLHeadersKey.EmailOTP]: emailOtp,
                    [GraphQLHeadersKey.TOTP]: totp,
                },
            })
            return data
        }
    )
    return swrMutation
}

interface UseBackupBotPrivateKeySwrMutationParams {
    emailOtp: string
    totp: string
}

export const useBackupBotPrivateKeySwrMutation = () => {
    const { backupBotPrivateKeySwrMutation } = use(SwrContext)!
    return backupBotPrivateKeySwrMutation
}