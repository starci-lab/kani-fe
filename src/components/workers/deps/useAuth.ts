import { usePrivy } from "@privy-io/react-auth"
import { useEnableMFADisclosure } from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import { useEffect } from "react"

export const useAuth = () => {
    const { authenticated } = usePrivy()
    const user = useAppSelector((state) => state.session.user)
    const { onOpen: onOpenEnableMFAModal } = useEnableMFADisclosure()
    useEffect(() => {
        if (!authenticated) {
            return
        }
        if (!user || user?.mfaEnabled) {
            return
        }
        onOpenEnableMFAModal()
    }, [authenticated, user])
}