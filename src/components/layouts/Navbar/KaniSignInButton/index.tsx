import React from "react"
import { KaniButton } from "@/components/atomic"
import { usePrivy, useLogin } from "@privy-io/react-auth"

export const KaniSignInButton = () => {
    const { isModalOpen } = usePrivy()
    const { login } = useLogin()
    return (
        <KaniButton 
            isLoading={isModalOpen}
            color="primary"
            onPress={() => login()}
        >
            Sign In
        </KaniButton>
    )
}