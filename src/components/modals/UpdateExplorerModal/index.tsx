import React, { useEffect } from "react"
import { 
    KaniModal, 
    KaniModalContent, 
    KaniModalHeader, 
    KaniModalBody, 
    KaniButton, 
    KaniModalFooter, 
    KaniImage
} from "../../atomic"
import { useUpdateExplorerDisclosure, useUpdateExplorerFormik } from "@/hooks/singleton"
import { ExplorerId, getExplorerMetadata } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import { getAsset, explorerAssetConfig } from "@/assets"
import { ChainId } from "@/modules/types"

export const UpdateExplorerModal = () => {
    const { isOpen, onOpenChange } = useUpdateExplorerDisclosure()
    const formik = useUpdateExplorerFormik()
    const id = useAppSelector((state) => state.session.liquidityProvisionBot?.id)
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
    // we update the id in the formik state
    // whenever the id changes
    useEffect(() => {
        formik.setFieldValue("id", id)
    }, [id])
    // we retrieve the explorer metadatas
    const explorerMetadatas = Object.values(ExplorerId)
        .map((explorerId) => getExplorerMetadata(explorerId))
        .filter((explorerMetadata) => explorerMetadata.chainId === liquidityProvisionBot?.chainId)
    // we retrieve the explorer asset urls
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Update Explorer" />
                <KaniModalBody>
                    {explorerMetadatas.map((explorerMetadata) => (
                        <div key={explorerMetadata.name} className="bg-content3 rounded-medium p-4">
                            <KaniImage src={
                                getAsset(
                                    explorerAssetConfig()[liquidityProvisionBot?.chainId ?? ChainId.Sui]
                                        ?.[explorerMetadata.explorerId] ?? {}
                                )} />
                            {explorerMetadata.name}
                        </div>
                    ))}
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton 
                        isDisabled={!formik.isValid}
                        isLoading={formik.isSubmitting}
                        fullWidth 
                        color="primary"
                        onPress={
                            async () => {
                                await formik.submitForm()
                            }
                        }>
                        Confirm
                    </KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}