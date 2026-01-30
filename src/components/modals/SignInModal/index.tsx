import React from "react"
import {
    KaniModal,
    KaniModalContent,
} from "../../atomic"
import { useSignInDisclosure } from "@/hooks/singleton"
import { InputEmailPage } from "./InputEmailPage"
import { InputOTPPage } from "./InputOTPPage"
import { SignInPage } from "@/redux/slices/modals"
import { useAppSelector } from "@/redux"
export const SignInModal = () => {
    const { isOpen, onOpenChange } = useSignInDisclosure()
    const page = useAppSelector((state) => state.modals.signIn.page)
    const renderPage = () => {
        switch (page) {
        case SignInPage.InputEmail:
            return <InputEmailPage />
        case SignInPage.InputOTP:
            return <InputOTPPage />
        }
    }
    return <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <KaniModalContent>
            {renderPage()}
        </KaniModalContent>
    </KaniModal>
}