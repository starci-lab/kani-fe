import { KaniModal, KaniModalContent, KaniModalHeader } from "../../atomic"
import { useSortByDisclosure } from "@/hooks/singleton"
import React from "react"

export const SortByModal = () => {
    const { isOpen, onOpenChange } = useSortByDisclosure()
    return (
        <KaniModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Sort By" />
            </KaniModalContent>
        </KaniModal>
    )
}