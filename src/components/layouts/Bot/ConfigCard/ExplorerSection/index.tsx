import React from "react"
import { KaniImage, KaniLink, TooltipTitle } from "@/components"
import { Spacer } from "@heroui/react"
import { useAppSelector } from "@/redux"
import { ExplorerId, getExplorerMetadata } from "@/modules/blockchain"
import { ChainId } from "@/modules/types"
import { explorerAssetConfig, getAsset } from "@/assets"
import { GearSixIcon } from "@phosphor-icons/react"
import { useUpdateExplorerDisclosure } from "@/hooks/singleton"

export const ExplorerSection = () => {
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
    const { onOpen } = useUpdateExplorerDisclosure()
    // we retrieve the explorer metadata
    const explorerMetadata = getExplorerMetadata(liquidityProvisionBot?.explorerId ?? ExplorerId.SuiVision)
    // we retrieve the explorer asset url
    const explorerAssetUrl = getAsset(
        explorerAssetConfig()[liquidityProvisionBot?.chainId ?? ChainId.Sui]?.[liquidityProvisionBot?.explorerId ?? ExplorerId.SuiVision] ?? {}
    )
    return (
        <div>
            <TooltipTitle
                title="Explorer"
                tooltipString="The preferred explorer."
            />
            <Spacer y={4} />
            <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-2">  
                    <KaniImage src={explorerAssetUrl} className="w-5 h-5" />
                    <div className="text-sm">
                        {explorerMetadata.name}
                    </div>
                </div>
                <KaniLink color="secondary" as="button" onPress={onOpen}>
                    <GearSixIcon className="w-5 h-5"/>
                </KaniLink>
            </div>
        </div>
    )
}