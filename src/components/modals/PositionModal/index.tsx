import React from "react"
import { 
    KaniModal, 
    KaniModalHeader, 
    KaniModalContent, 
    KaniModalBody, 
    KaniModalFooter, 
    KaniButton 
} from "@/components"
import { usePositionModalDisclosure } from "@/hooks/singleton"
import { useAppSelector } from "@/redux"

export const PositionModal = () => {
    const { isOpen, onOpenChange } = usePositionModalDisclosure()
    const selectedPosition = useAppSelector((state) => state.bot.selectedPosition)
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Position" />
                <KaniModalBody>
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton variant="flat" fullWidth onPress={onOpenChange}>Close</KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}