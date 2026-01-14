import { SwrContext } from "../../../../SwrContext"
import { use } from "react"

export const useBackupBotPrivateKeyV2SwrMutation = () => {
    const { backupBotPrivateKeyV2SwrMutation } = use(SwrContext)!
    return backupBotPrivateKeyV2SwrMutation
}
