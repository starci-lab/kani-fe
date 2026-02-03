import { AppVersion } from "../enums"
import { AbstractSchema } from "./abstract"

export interface UserSchema extends AbstractSchema {
    email?: string
    username?: string
    picture?: string
    encryptedTotpSecretPayload?: unknown
    referralCode?: string
    mfaEnabled: boolean
    privyUserId?: string
    version: AppVersion
}
