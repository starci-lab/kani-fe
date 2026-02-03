import { AppVersion } from "../enums"
import { AbstractSchema } from "./abstract"
import { AuthenticationFactor } from "../enums"

export interface UserSchema extends AbstractSchema {
    email?: string
    username?: string
    picture?: string
    encryptedTotpSecretPayload?: unknown
    referralCode?: string
    privyUserId?: string
    version: AppVersion
    authenticationFactors?: Array<AuthenticationFactor>
}
