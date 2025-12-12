import { useSelectPoolsDisclosure } from "@/hooks/singleton"
import { 
    KaniModal, 
    KaniModalContent, 
    KaniModalHeader, 
    KaniModalBody, 
    KaniButton, 
    KaniModalFooter, 
    KaniInput,
    KaniLink
} from "@/components/atomic"
import React from "react"
import { FadersIcon } from "@phosphor-icons/react"
import { useAppSelector } from "@/redux"
import { PoolNotFound } from "./PoolNotFound"
import { Spacer } from "@heroui/react"
import { PoolsScrollShadow } from "./PoolsScrollShadow"

export const SelectPoolsModal = () => {
    const { isOpen, onOpenChange } = useSelectPoolsDisclosure()
    const liquidityPools = useAppSelector(state => state.static.liquidityPools)
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
                    {!liquidityPools.length ? <PoolNotFound /> : <PoolsScrollShadow/>}
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton variant="flat" fullWidth onPress={onOpenChange}>Close</KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}