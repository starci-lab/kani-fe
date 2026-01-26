import { AbstractSchema } from "./abstract"

export interface SessionSchema extends AbstractSchema {
    sessionId: string
    user: string
    expiresAt: Date
}
