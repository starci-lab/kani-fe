import React from "react"
import { ListIcon } from "@phosphor-icons/react"
import { KaniButton } from "@/components/atomic"
import { useMenuModalDisclosure } from "@/hooks/singleton"

export const MobileMenuButton = () => {
    const { onOpen } = useMenuModalDisclosure()
    return (
        <KaniButton variant="light" isIconOnly color="default" onPress={() => {
            onOpen()
        }}>
            <ListIcon className="w-5 h-5" />
        </KaniButton>
    )
}