import React from "react"
import { KaniButton } from "@/components/atomic"
import { useLogin, usePrivy } from "@privy-io/react-auth"

export const KaniSignInButton = () => {
    const { ready, authenticated } = usePrivy()
    const { login } = useLogin()
    return <KaniButton 
        isDisabled={
            !ready || authenticated
        } 
        color="primary" 
        onPress={() => login()}>
        Sign In
    </KaniButton>
}