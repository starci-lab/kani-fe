import { KaniButton, KaniInput, KaniModal, KaniModalBody, KaniModalContent, KaniModalFooter, KaniModalHeader, KaniLink } from "@/components/atomic"
import React from "react"
import { useUpdatePoolsDisclosure } from "@/hooks/singleton"
import { FunnelIcon } from "@phosphor-icons/react"
import { Spacer } from "@heroui/react"

export const UpdatePoolsModal = () => {
    const { isOpen, onOpenChange } = useUpdatePoolsDisclosure()
    return (
        <KaniModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Select Pools" />
                <KaniModalBody>
                    <KaniInput
                        endContent={
                            <KaniLink
                                as="button"
                                color="primary"
                            >
                                <FunnelIcon className="w-5 h-5 cursor-pointer"/>
                            </KaniLink>
                        }
                        placeholder="Search for a pool"
                        className="w-full"
                    />
                    <Spacer y={4} />
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton variant="flat" fullWidth onPress={onOpenChange}>Close</KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>    
    )
}