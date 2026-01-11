import { KaniButton, KaniLink, KaniModal, KaniModalBody, KaniModalContent, KaniModalFooter, KaniModalHeader } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import React from "react"
import { useUpdatePoolsDisclosure } from "@/hooks/singleton"

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
                                color="secondary"
                            >
                                <FadersIcon/>
                            </KaniLink>
                        }
                        placeholder="Search for a pool"
                        className="w-full"
                    />
                    <Spacer y={4} />
                    {!filteredLiquidityPools.length ? <PoolNotFound /> : <PoolsScrollShadow/>}
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton variant="flat" fullWidth onPress={onOpenChange}>Close</KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>    
    )
}