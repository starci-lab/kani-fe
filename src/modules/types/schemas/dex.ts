import { ChainId } from "../blockchain"
import { DexId } from "../enums"
import { AbstractSchema } from "./abstract"

export interface DexSchema extends AbstractSchema {
    displayId: DexId
    name: string
    description?: string
    website?: string
    iconUrl?: string
    chainIds?: Array<ChainId>
}
