import { usePrivy } from "@privy-io/react-auth"
import { useEffect } from "react"
import { useVerifyPrivyAuthTokenSwrMutation } from "@/hooks/singleton"


export const useAuthentication = () => {
    const { authenticated, getAccessToken } = usePrivy()
    const verifyPrivyAuthTokenSwrMutation = useVerifyPrivyAuthTokenSwrMutation()
    // we register a use effect to verify the privy auth token when the user is authenticated
    useEffect(() => {  
        if (!authenticated) {
            return
        }
        const handleEffect = async () => {
            const accessToken = await getAccessToken()

            if (!accessToken) {
                throw new Error("No access token found")
            }
            await verifyPrivyAuthTokenSwrMutation.trigger({
                token: accessToken,
            })
        }
        handleEffect()
    }, [authenticated])
}