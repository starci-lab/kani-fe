import React from "react"
import { 
    KaniModal, 
    KaniModalContent, 
} from "../../atomic"
import { useEnableMFADisclosure } from "@/hooks/singleton"
import { EnableMFAPage, useAppSelector } from "@/redux"
import { ScanQRPage } from "./ScanQRPage"
import { ConfirmTOTPPage } from "./ConfirmTOTPPage"

export const EnableMFAModal = () => {
    const { isOpen, onOpenChange } = useEnableMFADisclosure()

    const page = useAppSelector((state) => state.modals.enableMFAModal.page)    

    const renderPage = () => {
        switch (page) {
        case EnableMFAPage.ScanQR:
            return <ScanQRPage />
        case EnableMFAPage.ConfirmTOTP:
            return <ConfirmTOTPPage />
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