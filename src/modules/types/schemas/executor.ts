import { AssignedBotSchema } from "./assigned-bot"
import { AbstractSchema } from "./abstract"

export interface ExecutorSchema extends AbstractSchema {
    assignedBots: Array<AssignedBotSchema>
    botCount: number
    lastRefreshedAt: Date
    refreshCount: number
    version: string
}
