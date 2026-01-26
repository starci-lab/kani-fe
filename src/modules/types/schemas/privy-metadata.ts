import { AbstractSchema } from "./abstract"

export interface PrivyMetadataSchema extends AbstractSchema {
    walletId: string
    signerPublicKey?: string
    walletPublicKey?: string
}
