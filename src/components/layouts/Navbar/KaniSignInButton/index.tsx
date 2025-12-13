import React from "react"
import { KaniButton } from "@/components/atomic"
import { useSignInDisclosure } from "@/hooks/singleton"

export const KaniSignInButton = () => {
    const { onOpen } = useSignInDisclosure()
    return (
        <KaniButton 
            color="primary"
            onPress={
                () => onOpen()
            }
        >
            Sign In
        </KaniButton>
    )
}