import React from "react"
import { KaniModal, KaniModalContent, KaniModalHeader, KaniModalBody, KaniCard, KaniCardBody } from "../../atomic"
import { useMFAVerificationDisclosure, useVerifyAuthenticatorAppFormik } from "@/hooks/singleton"
import { CaretRightIcon, PasswordIcon } from "@phosphor-icons/react"
import { Spacer } from "@heroui/react"
import { setMFAVerificationModalPage, MFAVerificationPage } from "@/redux"
import { useAppDispatch, useAppSelector } from "@/redux"
import { AuthenticatorAppPage } from "./AuthenticatorAppPage"
import { AuthenticationFactor } from "@/modules/types"

/** Modal: user completes one of the verification methods they have enrolled in. */
export const MFAVerificationModal = () => {
    const { isOpen, onOpenChange, onClose } = useMFAVerificationDisclosure()
    const page = useAppSelector((state) => state.modals.mfaVerification.page)
    const user = useAppSelector((state) => state.session.user)
    const dispatch = useAppDispatch()
    const formik = useVerifyAuthenticatorAppFormik()
    const renderPage = () => {
        switch (page) {
        case MFAVerificationPage.Base:
            return <>
                <KaniModalHeader
                    title="MFA Verification"
                    description={
                        <div>
                            Complete one of the verification methods you have to continue.
                        </div>
                    }
                />
                <KaniModalBody>
                    {user?.authenticationFactors?.includes(AuthenticationFactor.TOTP) && (
                        <>
                            <KaniCard
                                shadow="none"
                                isPressable
                                onPress={() => dispatch(setMFAVerificationModalPage(MFAVerificationPage.AuthenticatorApp))}
                                className="h-fit bg-content2"
                            >
                                <KaniCardBody>
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <PasswordIcon className="w-5 h-5" />
                                                    <div className="text-sm">Authenticator App</div>
                                                </div>
                                            </div>
                                            <Spacer y={2} />
                                            <div className="text-xs text-foreground-500 text-left">
                                                Available
                                            </div>
                                        </div>
                                        <CaretRightIcon />
                                    </div>
                                </KaniCardBody>
                            </KaniCard>
                            <Spacer y={3} />
                        </>
                    )}
                </KaniModalBody>
            </>
        case MFAVerificationPage.AuthenticatorApp:
            return <AuthenticatorAppPage />
        }
    }
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}         
        onClose={() => {
            formik.resetForm()
            onClose()
        }}
        >
            <KaniModalContent>
                {renderPage()}
            </KaniModalContent>
        </KaniModal>
    )
}

export const VerifyModal = MFAVerificationModal