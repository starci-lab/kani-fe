import React from "react"
import { 
    KaniModal, 
    KaniModalHeader, 
    KaniModalContent, 
    KaniModalBody, 
    KaniModalFooter, 
    KaniButton,
    KaniLink
} from "../../atomic"
import { useManageMFASettingsDisclosure, useRequireMFADisclosure } from "@/hooks/singleton"

export const RequireMFAModal = () => {
    const { isOpen, onOpenChange, onClose } = useRequireMFADisclosure()
    const { onOpen: onOpenManageMFASettingsModal } = useManageMFASettingsDisclosure()
    return (
        <KaniModal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="MFA Required For This Action" />
                <KaniModalBody>
                    <div className="text-sm text-center">
                        You need to enable MFA to perform this action. <KaniLink href="https://kani.com/learn-more" underline="hover" className="text-primary text-sm">Learn more</KaniLink>
                    </div>
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton color="primary" fullWidth onPress={
                        () => {
                            onOpenManageMFASettingsModal()
                            onClose()
                        }
                    }>Manage MFA Settings</KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}