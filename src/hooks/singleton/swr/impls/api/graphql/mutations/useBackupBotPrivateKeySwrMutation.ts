import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useBackupBotPrivateKeySwrMutation = () => {
    const { backupBotPrivateKeySwrMutation } = use(SwrContext)!
    return backupBotPrivateKeySwrMutation
}
