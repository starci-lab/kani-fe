import {
    KaniDrawer,
    KaniDrawerBody,
    KaniDrawerContent,
    KaniDrawerHeader,
} from "../../atomic"
import React from "react"
import { useAdvancedConfigurationDisclosure } from "@/hooks/singleton"
import { Spacer } from "@heroui/react"
import { Strategy } from "./Strategy"
import { ViolateIndicators } from "./ViolateIndicators"

export const AdvancedConfigurationDrawer = () => {
    const { isOpen, onOpenChange } = useAdvancedConfigurationDisclosure()
    return (
        <KaniDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniDrawerContent>
                <KaniDrawerHeader>
                    Advanced Configuration
                </KaniDrawerHeader>
                <KaniDrawerBody className="overflow-y-auto">
                    <Strategy />
                    <Spacer y={6} />
                    <ViolateIndicators />
                </KaniDrawerBody>
            </KaniDrawerContent>
        </KaniDrawer>
    )
}
