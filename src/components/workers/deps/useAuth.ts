import { usePrivy } from "@privy-io/react-auth"
import { useManageMFASettingsDisclosure } from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import { useEffect } from "react"

export const useAuth = () => {
    const { authenticated } = usePrivy()
    const user = useAppSelector((state) => state.session.user)
    const { onOpen: onOpenManageMFASettingsModal } = useManageMFASettingsDisclosure()
    useEffect(() => {
        if (!authenticated) {
            return
        }
        if (!user) {
            return
        }
        if (user?.authenticationFactors?.length) {
            return
        }
        onOpenManageMFASettingsModal()
    }, [authenticated, user])
}