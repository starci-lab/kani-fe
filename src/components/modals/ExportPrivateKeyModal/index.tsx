"use client "
import React from "react"
import {
    KaniModal,
    KaniModalContent,
    KaniModalHeader,
    KaniModalBody,
    KaniButton,
    KaniModalFooter,
    KaniSnippet,
    KaniAlert,
} from "../../atomic"
import { useExportPrivateKeyModalDisclosure } from "@/hooks/singleton/discloresure"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"

export const ExportPrivateKeyModal = () => {
    const { isOpen, onOpenChange } = useExportPrivateKeyModalDisclosure()
    const exportPrivateKey = useAppSelector((state) => state.modals.exportPrivateKey.privateKey)
    return (
        <KaniModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Export Private Key" />
                <KaniModalBody>
                    <KaniAlert color="danger" title="Don't share your private key with anyone" description=
                        "This private key grants full access to your wallet and all held assets." />
                    <Spacer y={4}/>
                    <div className="bg-content2 rounded-medium p-4 gap-2 flex items-center">
                        <div className="line-clamp-3 break-all text-sm">{exportPrivateKey ?? ""}</div>
                        <KaniSnippet value={exportPrivateKey ?? ""}/>
                    </div>
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton variant="flat" fullWidth onPress={onOpenChange}>Close</KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}