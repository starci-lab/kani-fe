export interface UserSchema {
    id: string
    username: string
    email: string
    temporaryTotpToken?: string
}