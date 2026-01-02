import React, { useEffect, useRef } from "react"
import { 
    KaniModal, 
    KaniModalContent, 
} from "../../atomic"
import { useEnableMFAModalDisclosure, useQueryTotpSecretSwrMutation } from "@/hooks/singleton"
import { EnableMFAPage, useAppSelector } from "@/redux"
import { ScanQRPage } from "./ScanQRPage"
import { InputTOTPPage } from "./InputTOTPPage"

export const EnableMFAModal = () => {
    const { isOpen, onOpen, onOpenChange } = useEnableMFAModalDisclosure()
    const user = useAppSelector((state) => state.session.user)
    const queryTotpSecretMutation = useQueryTotpSecretSwrMutation()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    // this is used to prevent the mutation from being triggered multiple times
    const renderedRef = useRef<boolean>(false)
    // this is used to trigger the mutation when the user is logged in
    useEffect(() => {
        if (!user || user.mfaEnabled || renderedRef.current || !accessToken) {
            return
        }
        const handleEffect = async () => {
            await queryTotpSecretMutation.trigger()
            renderedRef.current = true
        }
        handleEffect()
    }, [user, accessToken])

    useEffect(() => {
        if (!user) {
            return
        }
        if (!user.mfaEnabled) {
            onOpen()
        }
    }, [user])

    const page = useAppSelector((state) => state.modals.enableMFAModal.page)    

    const renderPage = () => {
        switch (page) {
        case EnableMFAPage.ScanQR:
            return <ScanQRPage />
        case EnableMFAPage.InputTOTP:
            return <InputTOTPPage />
        }
    }

    return (
        <KaniModal 
            size="sm" 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
        >
            <KaniModalContent>
                {renderPage()}
            </KaniModalContent>
        </KaniModal>
    )
}