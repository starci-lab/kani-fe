import { DexId } from "./enums"
import { AbstractSchema } from "./abstract"
import { ChainId } from "../blockchain"

export interface DexSchema extends AbstractSchema {
    /** Unique identifier of the DEX (mapped from DexId enum) */
    displayId: DexId

    /** The official name of the DEX (e.g. Cetus, Turbos, Uniswap) */
    name: string

    /** A short description of the DEX (optional) */
    description?: string

    /** The official website URL of the DEX (optional) */
    website?: string

    /** The icon URL of the DEX, used for displaying logos in the UI (optional) */
    iconUrl?: string

    /** The chain IDs of the DEX */
    chainIds: Array<ChainId>
}