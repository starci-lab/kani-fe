import { ExplorerId } from "@/modules/blockchain"
import { ChainId } from "@/modules/types"
import { ExplorerAssetConfig } from "./types"

export const explorerAssetConfig = (): Partial<Record<ChainId, Partial<Record<ExplorerId, ExplorerAssetConfig>>>> => ({
    [ChainId.Sui]: {
        [ExplorerId.SuiVision]: {
            png: "/icons/explorers/suivision.png",
        },
        [ExplorerId.SuiScan]: {
            png: "/icons/explorers/suiscan.png",
        },
    },
})